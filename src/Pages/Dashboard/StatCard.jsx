import React from 'react';
import styles from './StatCard.module.css';
import { FiUsers } from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, change, bgColor = '#ffffff',bordercolor ='1px solid gray'}) => {
  return (
    <div className={styles.card}  style={{backgroundColor: bgColor, border: bordercolor}}>
      <div className={styles.iconWrapper}>
        {Icon && <Icon className={styles.icon} />}
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
  icon: FiUsers,
};

export default StatCard;
