import React from 'react'
import { CiSearch } from "react-icons/ci";
import "./CustomSearchInput.css"

export default function CustomSearchInput() {
  return (
    <div className="custom_search_con">
       <input  type="text" />
       <button><CiSearch size={20} className='icon'/></button>
    </div>
  )
}
