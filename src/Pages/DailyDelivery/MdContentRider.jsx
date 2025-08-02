import React from "react";
import styles from "./DailyDelivery.module.css";
import CustomSearchInput from "../../Components/searchInputBox/CustomSearchInput";

export default function MdContentRider () {
    return (

    <div className={styles.MdCard}>
          <CustomSearchInput bgColor={"white"}  />
          <div className={styles.mdCardContent}>
            <div className={styles.nameValue}> Cameron Williams</div>
            <div className={styles.numberValue}>+223 50 4744 733</div>
            </div>
            <div className={styles.mdCardContent}>
            <div className={styles.nameValue}> Sean Paul</div>
            <div className={styles.numberValue}>+223 50 4744 733</div>
            </div>
            <div className={styles.mdCardContent}>
            <div className={styles.nameValue}> Patrick Gardiner</div>
            <div className={styles.numberValue}>+223 50 4744 733</div>
            </div>
    </div>
    );
}
