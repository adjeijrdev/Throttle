import { useEffect, useState } from "react";
import style from "./UserProfileInput.module.css";

// importing custom components
import CustomSelector2 from "../../Components/form/selector/CustomSelecter2";
import PhoneNumberInput from "../../Components/Phone/PhoneNumberInput";
import CustomDatePicker from "../../Components/datePicker/CustomDatePicker";

// importing lists of items
import { Regions } from "../../items/Ghana-regional-list";
import { Gender } from "../../items/Gender";
import { IdLists } from "../../items/IdLists";

export default function UserProfileEditInput({ onClose }) {
  const [ mobileNumber, setMobileNumber  ] = useState("");
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleCardClick = (e) => e.stopPropagation();

  return (
    <div className={style["modal-background"]} onClick={onClose}>
      <div className={style["white-box"]} onClick={handleCardClick}>
        <div className={style["close"]} onClick={onClose}>
          <p>x</p>
        </div>
        <h1 className={style["section-header"]}>Personal Information</h1>
        <hr />
        <div className={style["inputs-area"]}>
          <div className={style["form-grid"]}>
            <div className={style["form-group"]}>
              <label>Username</label>
              <input type="text" placeholder="username" />
            </div>
            <div className={style["form-group"]}>
              <label>Gender</label>
              <CustomSelector2
                width="38rem"
                height="2.9rem"
                sideBarHeight="20px"
                options={Gender}
                // selectedValue={field.value}
                // setSelectedValue={field.onChange}
              />
            </div>
            <div className={style["form-group"]}>
              <label>ID Type</label>
              <CustomSelector2
                width="38rem"
                height="2.9rem"
                sideBarHeight="20px"
                options={IdLists}
                // selectedValue={field.value}
                // setSelectedValue={field.onChange}
              />
            </div>
          </div>
          <div className={style["form-grid"]}>
            <div className={style["form-group"]}>
              <label>Date Joined</label>
              <CustomDatePicker style={ {width: '100px'}}/>
            </div>
            <div className={style["form-group"]}>
              <label>Date of Birth</label>
              <input type="text" placeholder="Date of Birth" />
            </div>
            <div className={style["form-group"]}>
              <label>ID Number</label>
              <input type="text" placeholder="address" />
            </div>
          </div>
        </div>
        <h1 className={style["section-header"]}>Contact Details</h1>
        <hr />
        <div className={style["inputs-area"]}>
          <div className={style["form-grid"]}>
            <div className={style["form-group"]}>
              <label>Mobile Number</label>
              <PhoneNumberInput  />
            </div>
            <div className={style["form-group"]}>
              <label>Region</label>
              <CustomSelector2
                width="38rem"
                height="2.9rem"
                sideBarHeight="20px"
                options={Regions}
                // selectedValue={field.value}
                // setSelectedValue={field.onChange}
              />
            </div>
            <div className={style["form-group"]}>
              <label>Emergency Contact Name</label>
              <input type="text" placeholder="Emergency Contact Name" />
            </div>
          </div>
          <div className={style["form-grid"]}>
            <div className={style["form-group"]}>
              <label>Additional Mobile Number(Optional)</label>
               <PhoneNumberInput  />
            </div>
            <div className={style["form-group"]}>
              <label>Residential Address</label>
              <input type="text" placeholder="address" />
            </div>
            <div className={style["form-group"]}>
              <label>Emergency Contact Number</label>
               <PhoneNumberInput  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
