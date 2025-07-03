import React from 'react'
import warning from "../../../Assets/input_icons/warning.png"
export default function DeleteRoleModal({setDeleteModel}) {
  return (
    <div className='delete-model-container'>

      <div>
      <img src={warning} alt="waring" />


      </div>

      <div>
        <div className='modal-title'>
          Warning: Delete Role
        </div>

        <div className='modal-sub-title'>You are about to permanently delete this role.</div>

        <div className='danger-info'>Do you want to proceed?</div>
      </div>

      <div className=' model-btn'>
        <button className='btn-cancel' onClick={()=>setDeleteModel(false)}>Cancel</button>
        <button className='btn-create'>Delete</button>
      </div>
    </div>
  )
}
