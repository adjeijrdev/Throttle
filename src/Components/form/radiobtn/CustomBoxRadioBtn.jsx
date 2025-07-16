import React,{useState} from "react";
import "./CustomBoxRadioBtn.css";


export default function CustomBoxRadioBtn({ value, name, id, label,register }) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    // <div className={` radio-container ${isInputFocused && "radio-container-active"}`}>
    //   <input
    //     type="radio"
    //     value={value}
    //     onFocus={() => setIsInputFocused(true)}
    //     onBlur={() => setIsInputFocused(false)}
        
    //     name={name}
    //     id={id}
    //     className="radio-circle"
    //   />
    //   <label htmlFor={id}>{label}</label>
    // </div>
    <label className={` radio-container ${isInputFocused && "radio-container-active"}`} htmlFor={id}>
       <input
        type="radio"
        value={value}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        name={name}
        id={id}
        className="radio-circle"
        {...register()}

      />

      {label}
    </label>
  );
}
