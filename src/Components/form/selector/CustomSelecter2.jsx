import React from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';
export default function CustomSelector2({
  options,
  selectedValue,
  setSelectedValue,
  placeholder,
  height="50px",
  width="500px"
}) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: width,
      height: height,
      borderRadius: "8px",
      border: "0.1px solid #003627",

      //   borderColor: state.isFocused ? "#17654F" : "#fff",
    //   borderColor: "#17654F",
      boxShadow: "none",
      fontSize: "16px",
      fontWeight: "400",
      transitionTimingFunction: "ease-in-out",
      transitionDuration: "250ms",
      transitionProperty: "all",
      outline: state.isFocused && "0px solid red",
      backgroundColor: "white",
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
      // borderRadius: "8px",
      height: "50px",
      // border: "1px solid #003627",
      // padding: "10px",
      marginBottom: "2px",
      transitionTimingFunction: "ease-in-out",
      transitionDuration: "300ms",
      transitionProperty: "all",
      cursor:"pointer",
      
    

      "&:hover": {
        backgroundColor: "#17654F",
        borderColor: "#333",
        color:"white",
        
      },
      backgroundColor: state.isSelected
        ? "#17654F"
        : state.isFocused
        ? "#EAF5F2"
        : "#fff",
      color: state.isSelected ? "white" : "#333",

      // padding: 10,

      display: "flex",
      alignItems: "center",
      fontSize:"16px",
      fontWeight:"400",
      lineHeight:"22px"
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      width: "480px",
      borderRadius: "8px",
      // padding: "14px",
      top: "50px",
      paddingTop:"10px",
      filter: "drop-shadow(1px 1px 3px #17654F)",
      transitionTimingFunction: "ease-in-out",
      transitionDuration: "250ms",
      transitionProperty: "all",
    }),
  };

  return (
    <Select
      styles={customStyles}
      value={selectedValue}
      onChange={setSelectedValue}
      options={options}
      isSearchable={true}
      placeholder={placeholder}
      className="selector-1"
      classNamePrefix="selector-text-elements-1"
      
    />
  );
}
