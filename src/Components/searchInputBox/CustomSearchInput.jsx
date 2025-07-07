import React from 'react'
import { CiSearch } from "react-icons/ci";
import "./CustomSearchInput.css"

export default function CustomSearchInput({bgColor=" #f4f4f7"}) {
  return (
    <div className="custom_search_con" style={{backgroundColor:bgColor}}>
       <input  type="text" style={{bgColor:bgColor}}/>
       <button style={{backgroundColor:bgColor}}><CiSearch size={20} className='icon'  /></button>
    </div>
  )
}
