import truck from "../../Assets/icons/truck.png";
import moto from "../../Assets/icons/Rider.png";
import styles from "./assignModal.module.css";
import { forwardRef, useState } from "react";

const AssignModal = forwardRef(
  ({ handleShowRiders, handleShow3PLTable }, ref) => {
    return (
      <div className={styles.fullPage}>
        <div className={styles.modalContainer} ref={ref}>
          <p className={styles.modalTitle}>Assign to</p>
          <button onClick={() => handleShowRiders()}>
            <span>
              <img src={moto} />
            </span>
            Rider
          </button>
          <button onClick={() => handleShow3PLTable()}>
            <span>
              <img src={truck} />
            </span>
            Third-party Logistics
          </button>
        </div>
      </div>
    );
  }
);

export default AssignModal;
