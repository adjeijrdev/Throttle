import React from "react";
import Select from "react-select";

export default function CustomSelector({
  options,
  selectedValue,
  setSelectedValue,
  placeholder,
}) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "402px",
      height: "50px",
      borderRadius: "14px",
      border: "0.1px solid #003627",

      //   borderColor: state.isFocused ? "#17654F" : "#fff",
      borderColor: "#17654F",
      boxShadow: "none",
      fontSize: "16px",
      fontWeight: "400",
      transitionTimingFunction: "ease-in-out",
      transitionDuration: "250ms",
      transitionProperty: "all",
      outline: state.isFocused && "0px solid red",
      backgroundColor: "#CCE1DB",
      color: "black",
      cursor:"pointer",

      stroke: "none",
      "&:hover": {
        backgroundColor: "#B2CFC7",
        borderColor: "#17654F",
      },
    }),
    indicatorsContainer: (base) => ({
      ...base,
      borderLeft: " red ",
      paddingLeft: "5px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#fff",
      padding: "8px", 
      "&:hover": {
        color: "#666", 
      },
      borderLeft: "1px solid #17654F",
      // If you want to completely replace the icon:
      svg: {
        fill: "#17654F",
        stroke: "#17654F",
        width: "20px",
        height: "20px",
      },
    }),
    option: (base, state) => ({
      ...base,
      borderRadius: "14px",
      height: "50px",
      border: "1px solid #003627",
      padding: "14px",
      marginBottom: "8px",
      transitionTimingFunction: "ease-in-out",
      transitionDuration: "250ms",
      transitionProperty: "all",
      cursor:"pointer",

      "&:hover": {
        backgroundColor: "#EAF5F2",
        borderColor: "#333",
      },
      backgroundColor: state.isSelected
        ? "#EAF5F2"
        : state.isFocused
        ? "#EAF5F2"
        : "#fff",
      color: state.isSelected ? "#fff" : "#333",

      padding: 10,

      display: "flex",
      alignItems: "center",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      width: "402px",
      borderRadius: "16px",
      padding: "24px",
      top: "50px",
      filter: "drop-shadow(1px 1px 3px #17654F)",
      transitionTimingFunction: "ease-in-out",
      transitionDuration: "250ms",
      transitionProperty: "all",
    }),
  };

  return (
    <Select
      styles={customStyles}
      defaultValue={selectedValue}
      onChange={(e) => setSelectedValue(e.target.value)}
      options={options}
      isSearchable={true}
      placeholder={placeholder}
      className="selector-1"
      classNamePrefix="selector-text-elements-1"
    />
  );
}
