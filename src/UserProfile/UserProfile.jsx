import style from "./UserProfile.module.css"


//internal imports
import Dp from "../Assets/Models/dp.webp";
export default function UserProfile() {
  return (
    <div className={style["body"]}>
      <div className={style["top-row"]} >
        <div className={style["text"]}>
          <h1>Profile</h1>
        </div>
        <div className={style["buttons"]}>
          <button className={style["white"]} >Change Password</button>
          <button className={style["green"]}>Logout</button>
        </div>
      </div>
      <div className={style["bottom-row"]} > 
        <div className={style["display-picture-area"]}>
          <div className={style["dp"]}>
            <div className={style["img"]}>
              <img src={Dp} alt="DP" />
            </div>
            <div className={style["names-and-credentials"]}>
                <h2>John Doe</h2>
              <div className={style["credentials"]}>
                <h3>JohnDoe@gmail.com</h3>
                <p>Manager</p>
              </div>
            </div>
          </div>
          
          <div className={style["dp-side-button"]}>
            <button>Edit Profile </button>
          </div>
        </div>
        </div>

        <div className={ style["inputs-area"]}> inputs </div>
      </div>
    // </div>
  )
}
