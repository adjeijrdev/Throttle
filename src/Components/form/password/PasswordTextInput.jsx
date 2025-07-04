import React, { useState } from "react";
import "./PasswordTextInput.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordTextInput({ title, name, isRequired }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <label htmlFor={name} className="label-text-style">
        {title}
        {isRequired && <span className="required-field">*</span>}
      </label>
      <br />
      <div className="text-input-container2">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          className="pass-text-input"
          placeholder={name}
        />

        <button
          type="button"
          onClick={toggleVisibility}
          className="toggle-btn2"
          aria-label="Toggle Password"
        >
          {showPassword ? <FaEye  className="icon"/> : <FaEyeSlash className="icons" />}
        </button>
      </div>
    </div>
  );
}
