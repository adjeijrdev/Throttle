import truck from "../../Assets/icons/truck.png";
import moto from "../../Assets/icons/Rider.png";
import styles from "./changeOrder.module.css";
import { forwardRef, useState } from "react";

const ChangeOrderStatusModal = forwardRef(({setShowOrderCompletedOTPModal,closeSelfHandler,setShowFailedModal,setShowRejectedModal}, ref) => {
  return (
 
  <div className={styles.modalContainer} ref={ref}>
      <p className={styles.modalTitle}>Change status to</p>
      <button  onClick={()=>{ closeSelfHandler(false);setShowOrderCompletedOTPModal(true)}}>
        <span>
          <img src={moto} />
        </span>
        Delivered
      </button>
      <button onClick={()=>{ closeSelfHandler(false) ;setShowRejectedModal(true)}}>
        <span>
          <img src={truck} />
        </span>
        Rejected
      </button>
       <button onClick={()=>{ closeSelfHandler(false);setShowFailedModal(true)}}>
        <span>
          <img src={moto} />
        </span>
        Failed
      </button>
    </div>
   
  
  );
});


export default ChangeOrderStatusModal;