import React from "react";
import styles from "./DailyDelivery.module.css";
import CustomSearchInput from "../../Components/searchInputBox/CustomSearchInput";

export default function MdContent3Pl () {
    return (

    <div className={styles.MdCard}>
          <CustomSearchInput bgColor={"white"}  />
          <div className={styles.mdCardContent}>
            <div className={styles.nameValue}> One Ghana Delivery</div>
            <div className={styles.numberValue}>+223 50 4744 733</div>
            </div>
            <div className={styles.mdCardContent}>
            <div className={styles.nameValue}> Rusell Delivey</div>
            <div className={styles.numberValue}>+223 50 4744 733</div>
            </div>
            <div className={styles.mdCardContent}>
            <div className={styles.nameValue}> Xpress Delivery</div>
            <div className={styles.numberValue}>+223 50 4744 733</div>
            </div>
    </div>
    );
}