import React from "react";
import "./TextInput.css"

export default function TextInput({title, name, isRequired}) {
  return (
    <div>
      <label htmlFor={name} className="label-text-style">
       {title}{isRequired &&  <span className="required-field">*</span>} 
      </label>
      <br />
      <input
        type="text"
        id={name}
        name={name}
        className="text-input-st"
        placeholder={title}
      />
    </div>
  );
}
