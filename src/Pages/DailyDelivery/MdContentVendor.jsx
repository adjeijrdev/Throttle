import React from "react";
import styles from "./DailyDelivery.module.css";
import CustomSearchInput from "../../Components/searchInputBox/CustomSearchInput";

export default function MdContentVendor () {
    return (

    <div className={styles.MdCard}>
          <CustomSearchInput bgColor={"white"}  />
          <div className={styles.mdCardContent}>
            <div className={styles.nameValue}> Ishtari Ghana LTD</div>
            <div className={styles.numberValue}>+223 50 4744 733</div>
            </div>
            <div className={styles.mdCardContent}>
            <div className={styles.nameValue}> Starbucks</div>
            <div className={styles.numberValue}>+223 50 4744 733</div>
            </div>
            <div className={styles.mdCardContent}>
            <div className={styles.nameValue}> General Electric</div>
            <div className={styles.numberValue}>+223 50 4744 733</div>
            </div>
    </div>
    );
}

