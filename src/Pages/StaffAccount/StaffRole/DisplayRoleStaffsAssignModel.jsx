import React from "react";
import { MdOutlineClose } from "react-icons/md";

export default function DisplayRoleStaffsAssignModel({setShowStaffModal}) {
  const fullName = [
    {
      _id: "0",
      userProfile: {
        fullName: {
          surname: "Yaw",
          middleName: "meand",
          firstName: "Kwa",
        },
      },
    },
    {
      _id: "1",
      userProfile: {
        fullName: {
          surname: "Yaw",
          middleName: "meand",
          firstName: "Kwa",
        },
      },
    },
    {
      _id: "2",
      userProfile: {
        fullName: {
          surname: "Yaw",
          middleName: "meand",
          firstName: "Kwa",
        },
      },
    },
    {
      _id: "3",
      userProfile: {
        fullName: {
          surname: "Yaw",
          middleName: "meand",
          firstName: "Kwa",
        },
      },
    },
  ];

  return (
    <div className="displayStaffModalContainer">
      <button className="close-btn" onClick={()=>setShowStaffModal(false)}>
        <MdOutlineClose size={22}/>
      </button>
      <ul>
        {fullName.map((staff) => {
          return (
            <li key={staff._id}>
              {staff?.userProfile?.fullName?.surname}{" "}
              {staff.userProfile?.fullName?.middleName}{" "}
              {staff?.userProfile?.fullName?.firstName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
