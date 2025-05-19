import React from 'react';
import SuccessStyle from "./SuccessfulModal.module.css";

import check from "../../Assets/icons/Successful.png";

export default function SuccessModal() {
  return (
    <div className={ SuccessStyle["modal-background"]}>
      <div className={ SuccessStyle["main-card"]}> 
        <img src={check} alt="success check" />
        <div className="text">
          <h3>Successfully registered</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos aut velit odit ipsam asperiores, accusamus quam suscipit quis tenetur voluptatem, impedit maxime rem laboriosam itaque nesciunt quidem exercitationem, iste dolore.</p>
        </div>
        <div className={SuccessStyle.button}>
          <button>Done</button>
        </div>
      </div>
    </div>
  )
}
