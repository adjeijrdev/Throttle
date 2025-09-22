import React from "react";
import "./TextInput.css"

export default function TextInput({title, name, isRequired,register, placeholder="",type=""}) {
  return (
    <div>
      <label htmlFor={name} className="label-text-style">
       {title}{isRequired &&  <span className="required-field">*</span>} 
      </label>
      <br />
      <input
        type={(type?.length >0) ? type:"text"}
        id={name}
        name={name}
        className="text-input-st"
        placeholder={placeholder.length <1 ?  title :placeholder }
        {...register()}
      />
    </div>
  );
}
