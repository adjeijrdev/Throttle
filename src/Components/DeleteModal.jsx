import React from 'react'
import warning from "../Assets/input_icons/warning.png"
import { BeatLoader } from "react-spinners";


export default function DeleteModal({setDeleteModel,handleDelete, item, itemName,isDeleting}) {
  return (
    <div className='delete-model-container'>

      <div>
      <img src={warning} alt="waring" />
      </div>

      <div>
        <div className='modal-title'>
          Warning: Delete <span style={{textTransform:"capitalize"}}>{item}</span>
        </div>

        <div className='modal-sub-title'>You are about to permanently delete this <span style={{textTransform:"capitalize"}}>{itemName}</span>.</div>

        <div className='danger-info'>Do you want to proceed?</div>
      </div>

      <div className=' model-btn'>
        <button className='btn-cancel' onClick={()=>setDeleteModel(false)}>Cancel</button>
        <button className='btn-create' onClick={()=>handleDelete()}>
            {isDeleting ? <BeatLoader color="white" /> : "Delete"}
        </button>
      </div>
    </div>
  )
}
