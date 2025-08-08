import styles from "./deliveredOTP.module.css";
import { BeatLoader } from "react-spinners";
import orderAsignIcon from "../../Assets/icons/OrderAssign.png";
import { forwardRef, useState } from "react";



const DeliveredOTPModal = forwardRef(({}, ref) => {
  return (
    <div className={styles.modalContainer} ref={ref}>
      <p className={styles.modalTitle}>Change status to</p>

      <div className={styles.otpBoxContainer}>
        <input type="text" placeholder="-" />
        <input type="text" placeholder="-" />
        <input type="text" placeholder="-" />
        <input type="text" placeholder="-" />
        <input type="text" placeholder="-" />
        <input type="text" placeholder="-" />
      </div>

      <button
        className={styles.btn}
        // onClick={() => setChangeOrderStatusModal(true)}
      >
        {false ? (
          <BeatLoader color="white" />
        ) : (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img src={orderAsignIcon} /> Completed
          </span>
        )}
      </button>
    </div>
  );
});

export default DeliveredOTPModal;
