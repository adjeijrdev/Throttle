import style from "./UserProfile.module.css";

import edit from "../Assets/icons/edit.png";
import camera from "../Assets/icons/camera.png";
import badge from "../Assets/icons/carbon_badge.png";

//internal imports
import Dp from "../Assets/Models/dp.webp";
export default function UserProfile() {
  return (
    <div className={style["body"]}>
      <div className={style["top-row"]}>
        <div className={style["text"]}>
          <h1>Profile</h1>
        </div>
        <div className={style["buttons"]}>
          <button className={style["white"]}>Change Password</button>
          <button className={style["green"]}>Logout</button>
        </div>
      </div>
      <div className={style["bottom-row"]}>
        <div className={style["display-picture-area"]}>
          <div className={style["dp"]}>
            <div className={style["img"]}>
              <img src={Dp} alt="DP" />
            </div>
            <div className={style["gray-circle"]}>
              <img src={camera} alt="camera" />
              {/* <input type="file" accept="image/*" placeholder="" /> */}
            </div>
            <div className={style["names-and-credentials"]}>
              <div className={style["text"]}>
                <h2>Justice Williamson</h2>
                <h3>justicewilliamson@gmail.com</h3>
                <div className={style["credential"]}>
                  <p>Administrator</p>
                  <img src={badge} alt="badge" />
                </div>
              </div>
              {/* <div className={style["credentials"]}>
                *********
              </div> */}
            </div>
          </div>

          <div className={style["dp-side-button"]}>
            <p>
              <span>
                <img src={edit} alt="edit" />
              </span>{" "}
              Edit Profile{" "}
            </p>
          </div>
        </div>
        <h1>Personal Information</h1>
        <hr />
        <div className={style["inputs-area"]}> inputs </div>
        <h1>Contact Details</h1>
        <hr />
        <div className={style["inputs-area"]}> inputs </div>
      </div>
    </div>
    // </div>
  );
}
