import React, { useState,useEffect } from 'react';
import { AdTopBar } from '../Components/AdTopBar';
import { AdRightBar } from '../Components/AdRightBar';
import '../CSS/Admin.css';
import { AdLeftBar } from '../Components/AdLeftBar';

export const Admin = () => {
  const resetInputs = {
    id:null,
    type: "text",
    placeHolder: "",
    label: "",
    isRequired: false,
    max: "",
    min: "", 
    choices: [{
      content:"",
      id:""
    }]
  };

  const [savedInputList,setSavedInputList]=useState([]); // array pour les champs enregistré 
  const [inputList, setInputList] = useState([]);// tableau pour stocker les champs en cours de creation
  const [inputFeild, setInputField] = useState(resetInputs);//un objet contient les infomations du champ 
  const [existingInput,setExistingInput]=useState(null);


  const addNewInput = () => {
    if (!inputFeild.type || !inputFeild.label) {
        console.log("You should fill in the type and label");
        return;
    }

    // Check for duplicate label in both inputList and savedInputList
    const isDuplicate = [...inputList, ...savedInputList].some(input => input.label === inputFeild.label);
    if (isDuplicate) {
        console.log("Duplicate label found! Please use a unique label.");
        return;
    }

    if (existingInput !== null) {
        // Update existing input
        setInputList(prev =>
            prev.map(input =>
                input.id === existingInput ? { ...inputFeild, id: existingInput } : input
            )
        );
        setExistingInput(null); // Reset editing mode
    } else {
        // Add new input with a unique ID
        setInputList(prev => [...prev, { ...inputFeild, id: Date.now() }]);
    }

    setInputField(resetInputs); // Reset input field
};

  

  const saveInput = () => {
    if (inputList.length === 0) return; // Prevent empty saves

    setSavedInputList(prev => {
        let updatedList = [...prev];

        if (existingInput !== null) {
            // Update existing input in savedInputList
            updatedList = updatedList.map(input =>
                input.id === existingInput ? { ...inputFeild, id: existingInput } : input
            );
            setExistingInput(null); // Reset editing mode
        } else {
            // Add new inputs from inputList (ensuring they have an ID)
            const newInputs = inputList.map(input => ({ ...input, id: input.id || Date.now() }));
            updatedList = [...updatedList, ...newInputs];
        }

        return updatedList;
    });

    setInputList([]); // Clear inputList
};

  
  useEffect(() => {
    console.log("Updated savedInputList:", savedInputList);
  }, [savedInputList]);

  const handleCancel = () => {
    setInputField(resetInputs);
  };
   
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setInputField(prevState => {
      const updatedField = { ...prevState, [name]: value };
  
      const updatedList = inputList.map(input =>
        input.id === prevState.id ? updatedField : input // Use id for comparison
      );
  
      setInputList(updatedList);
      return updatedField;
    });
  };
  console.log(inputList)
  
   
 // Select an input when clicked (updates the right bar)
 const selectInput = (id) => {
      const selectedInput = inputList.find((input) => input.id === id);
      if (selectedInput) {
        setInputField({ ...selectedInput });
        setExistingInput(id);  // Store the selected ID instead of index
      };
  };


  const selectSavedInput = (id) => {
    const selectedInput = savedInputList.find((input) => input.id === id);
    
    if (selectedInput) {
      setInputList(prev => {
        const exists = prev.some(input => input.id === id);
        return exists ? prev : [...prev, { ...selectedInput }];
      });
  
      setInputField(prev => ({ ...prev, ...selectedInput })); // Merge existing values
      setExistingInput(id);
    }
  };
  


  
  return (
    <>
      <div className='admin-container'>
        <AdLeftBar savedInputList={savedInputList} selectSavedInput={selectSavedInput} />

        <div className="middle-admin-page">
          <div className='center top-bar-container'>
            <AdTopBar saveInput={saveInput}  />
          </div>

          <div className="inputs-displayer">
            <div className="inputs-displayer-content">
              {inputList.map((input, index) => (
                <div key={index}>
                  <label>{input.label || "label"}</label>
                  <input type={input.type || "text"} readOnly placeholder={input.placeHolder || "place holder"} onClick={()=>selectInput(input.id)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <AdRightBar
          inputList={inputList}
          setInputList={setInputList}
          inputFeild={inputFeild}
          setInputField={setInputField}
          addNewInput={addNewInput}
          handleChange={handleChange}
          handleCancel={handleCancel}
        />
      </div>
    </>
  );
};
{/*

  const deleteInput = (index) => {
    setInputList(inputList.filter((_, i) => i !== index));
  };

  
  

  // Handle input changes in the right bar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputField(prevState => {
      const updatedField = { ...prevState, [name]: value };

      const updatedList = inputList.map(input =>
        input.label === prevState.label ? updatedField : input
      );

      setInputList(updatedList);
      return updatedField;
    });
  };

  // Save input and clear the middle panel
  const saveInput = () => {
    if (!inputFeild.type || !inputFeild.label) {
      console.log("You should fill the type and label");
      return;
    }
  
    if (editingIndex !== null) {
      // If editing an existing input, update it
      const updatedList = [...inputList];
      updatedList[editingIndex] = inputFeild; // Replace the old input with the updated one
      setInputList(updatedList);
      setEditingIndex(null); // Reset editing index
    } else {
      // If creating a new input, add it to the list
      setInputList(prev => [...prev, inputFeild]);
    }
  
    // Clear the input field
    setInputField({
      type: "text",
      placeHolder: "",
      label: "",
      isRequired: false,
      max: "",
      min: ""
    });
  };
  

  // Cancel input editing
 

  
  const saveAndClearInputs = () => {
    if (inputList.length === 0) return;
  
    setSavedInputs(prev => [...prev, ...inputList]); // Move inputs to left bar
    setInputList([]); // Clear middle panel
  };
  const handleSelectInput = (selectedInput) => {
    setInputField({ ...selectedInput }); // Ensure a new object reference
  };
  
  
  


};

 */}