import React, { useState,useEffect } from 'react';
import { AdTopBar } from '../Components/AdTopBar';
import { AdRightBar } from '../Components/AdRightBar';
import '../CSS/Admin.css';
import { AdLeftBar } from '../Components/AdLeftBar';

export const Admin = () => {
  const resetInputs = {
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

  const addNewInput = () => {
    if (!inputFeild.type || !inputFeild.label) {
      console.log("You should fill in the type and label");
      return;
    }
    setInputList(prev => [...prev, { ...inputFeild }]);  // Add new input
    setInputField(resetInputs);  // Reset input field
  };

  const saveInput = () => {
    if (inputList.length === 0) return; // Prevent empty saves
  
    setSavedInputList(prev => [...prev, ...inputList]); // Move inputs to savedList
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
    setInputField(prev => ({ ...prev, [name]: value }));
  };
   
  
  
  return (
    <>
      <div className='admin-container'>
        <AdLeftBar savedInputList={savedInputList} />

        <div className="middle-admin-page">
          <div className='center top-bar-container'>
            <AdTopBar saveInput={saveInput}  />
          </div>

          <div className="inputs-displayer">
            <div className="inputs-displayer-content">
              {inputList.map((input, index) => (
                <div key={index}>
                  <label>{input.label || "label"}</label>
                  <input type={input.type || "text"} readOnly placeholder={input.placeHolder || "place holder"} />
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
