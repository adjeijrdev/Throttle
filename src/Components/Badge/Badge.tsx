import styles from "./badge.module.css";
import imgIcon from "../../Assets/icons/img.png";
import badgeIcon from "../../Assets/icons/carbon_badge.png";
export default function Badge({title, subTitle, profileImg}) {
  return (
    <div className={styles.container}>
      <div className={styles.imgCircle}>
        <img alt="logo" src={profileImg? profileImg: imgIcon}/>
      </div>
      <div>
        <div className={styles.textContainer}>
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
        </div>
        <div>
          <span className={styles.badgeContainer}>
            <span>
            Appproved

            </span>
            <img alt="badge" src={badgeIcon}  width={16} height={16}/>
          </span>
        </div>
      </div>
    </div>
  );
}
