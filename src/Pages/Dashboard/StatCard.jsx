import React from "react";
import styles from "./StatCard.module.css";
import staticon from "../../Assets/icons/staticon.png";
import { FaArrowUpLong } from "react-icons/fa6";
import { useId } from "react";

const StatCard = ({
  title,
  value,
  img,
  change,
  bgColor = "#ffffff",
  bordercolor = "1px solid gray",
}) => {

  return (
    <>
      <div
        className={styles.card}
        style={{
          backgroundColor: bgColor,
          border: bordercolor,
            "--hover-color": bgColor, 
        }}
      >
        <div 
        // className={styles.card_con_b}
        >
          <div className={styles.info}>
            <div className={styles.iconWrapper}>
              {img && <img src={img} className={styles.icon} alt="stat icon" />}
            </div>
            <div className={styles.infotext}>
              <span className={styles.title}>{title}</span>

              <span className={styles.value}>{value}</span>
            </div>
          </div>

          {/* <div className={styles.infochange}>
            <FaArrowUpLong size={16} color="#43A047" />
            <span style={{ color: "#43A047", fontSize: "10px" }}>5% </span>

            <span className={styles.change}> {change}</span>
          </div> */}
        </div>
      </div>
    </>
  );
};

StatCard.defaultProps = {
  img: staticon,
};

export default StatCard;
