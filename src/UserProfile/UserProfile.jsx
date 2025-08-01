import style from "./UserProfile.module.css";
import CustomDatePicker from "../Components/datePicker/CustomDatePicker";

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
            </div>
          </div>

          <div className={style["dp-side-button"]}>
            <p>
              <span>
                <img src={edit} alt="edit" />
              </span>
              Edit Profile
            </p>
          </div>
        </div>
        <h1 className={style["section-header"]}>Personal Information</h1>
        <hr />
        {/* INPUT AREA */}
        <div className={style["inputs-area"]}>
          <div className={style["form-grid"]}>
            <div className={style["form-group"]}>
              <label>
                Username
              </label>
              <input
                type="text"
                placeholder="username"
              />
            </div>
            <div className={style["form-group"]}>
              <label>
                Gender
              </label>
              <input
                type="text"
                placeholder="gender"
              />
            </div>
            <div className={style["form-group"]}>
              <label>
                ID Type
              </label>
              <input
                type="text"
                placeholder="id type"
              />
            </div>
          </div>
          <div className={style["form-grid"]}>
            <div className={style["form-group"]}>
              <label>
                Date Joined
              </label>
              <input
                type="text"
                placeholder="Date Joined"
              />
            </div>
            <div className={style["form-group"]}>
              <label>
                Date of Birth
              </label>
              <input
                type="text"
                placeholder="Date of Birth"
              />
            </div>
            <div className={style["form-group"]}>
              <label>
                ID Number
              </label>
              <input
                type="text"
                placeholder="address"
              />
            </div>
          </div>
        </div>
        <h1 className={style["section-header"]}>Contact Details</h1>
        <hr />
        <div className={style["inputs-area"]}> 
          <div className={style["form-grid"]}>
            <div className={style["form-group"]}>
              <label>
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="mobile number"
              />
            </div>
            <div className={style["form-group"]}>
              <label>
                Region
              </label>
              <input
                type="text"
                placeholder="Region"
              />
            </div>
            <div className={style["form-group"]}>
              <label>
                Emergency Contact Name
              </label>
              <input
                type="text"
                placeholder="Emergency Contact Name"
              />
            </div>
          </div>
          <div className={style["form-grid"]}>
            <div className={style["form-group"]}>
              <label>
                Additional Mobile Number(Optional)
              </label>
              <input
                type="text"
                placeholder="number"
              />
            </div>
            <div className={style["form-group"]}>
              <label>
                Residential Address
              </label>
              <input
                type="text"
                placeholder="address"
              />
            </div>
            <div className={style["form-group"]}>
              <label>
                Emergency Contact Number
              </label>
              <input
                type="text"
                placeholder="number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
