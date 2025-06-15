import React, { useState, useRef, useEffect } from "react";
import "./DropDownInput.css";

const DropDownInput = ({ options = [], placeholder = "Select option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setSearch(option);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="throttle-select-wrapper" ref={dropdownRef}>
      <input
        type="text"
        value={search}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setSearch(e.target.value)}
        className="throttle-input"
      />
      

      < div className={`throttle-dropdown ${isOpen ? "show" : ""}`}>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, i) => (
            <div
              key={i}
              className={`throttle-item ${
                option === selected ? "selected" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))
        ) : (
          <div className="throttle-item disabled">No results</div>
        )}
      </div>
    </div>
  );
};

export default DropDownInput;
