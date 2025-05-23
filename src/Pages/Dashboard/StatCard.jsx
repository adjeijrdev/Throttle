import React from 'react';
import styles from './StatCard.module.css';
import { FiUsers } from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, change, bgColor = '#ffffff' }) => {
  return (
    <div className={styles.card}  
     style={{backgroundColor: bgColor}}>
      <div className={styles.iconWrapper}>
        {Icon && <Icon className={styles.icon} />}
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value}</p>
        {change && <p className={styles.change}>{change}</p>}
      </div>
    </div>
  );
};

StatCard.defaultProps = {
  icon: FiUsers,
};

export default StatCard;
