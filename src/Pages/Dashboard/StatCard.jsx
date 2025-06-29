import React from 'react';
import styles from './StatCard.module.css';
import staticon from '../../Assets/icons/staticon.png' ;

const StatCard = ({ title, value, img, change, bgColor = '#ffffff', bordercolor = '1px solid gray' }) => {
  return (
    <div className={styles.card} style={{ backgroundColor: bgColor, border: bordercolor }}>
      <div className={styles.iconWrapper}>
        {img && <img src={img} className={styles.icon} alt="stat icon" />}
      </div>
      <div className={styles.info}>
        <div className={styles.infotext}>
          <p className={styles.title}>{title}</p>
          <br />
          <p className={styles.value}>{value}</p>
        </div>
        <div className={styles.infochange}>
          {change && <p className={styles.change}>{change}</p>}
        </div>
      </div>
    </div>
  );
};

StatCard.defaultProps = {
  img: staticon,
};

export default StatCard;
