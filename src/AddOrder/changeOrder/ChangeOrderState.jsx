import truck from "../../Assets/icons/truck.png";
import moto from "../../Assets/icons/Rider.png";
import styles from "./changeOrder.module.css";
import { forwardRef, useState } from "react";

const ChangeOrderStatusModal = forwardRef(({}, ref) => {
  return (
 
  <div className={styles.modalContainer} ref={ref}>
      <p className={styles.modalTitle}>Change status to</p>
      <button >
        <span>
          <img src={moto} />
        </span>
        Delivered
      </button>
      <button >
        <span>
          <img src={truck} />
        </span>
        Rejected
      </button>
       <button >
        <span>
          <img src={moto} />
        </span>
        Failed
      </button>
    </div>
   
  
  );
});


export default ChangeOrderStatusModal;