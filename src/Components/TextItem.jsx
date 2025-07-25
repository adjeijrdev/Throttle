import React from "react";


export default function TextItem({title, value}) {
  return (
    <div>
      <label htmlFor={value} className="label-text-style">
       {title}
      </label>
      <div  className="text-input-st">
        {value}
      </div>
      {/* <input
        type="text"
        id={name}
        name={name}
        className="text-input-st"
        placeholder={title}
        {...register()}
      /> */}
    </div>
  );
}

