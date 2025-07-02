import { Link, useNavigate } from "react-router";
import PaginatedTabs from "../../../Components/paginationTab/paginationTabs";
import "./StaffList.css";
import { format, parseISO } from "date-fns";
import { useState } from "react";


const staffs = [
 
    {
      id: "684981ad212f29a948ad6980",
        createdAt: "2025-06-10T17:31:00.524Z",

      userProfile: {
        contact: "0545892555",
        email: "akua.boateng@example.com",
        fullName: {
          firstName: "Akua",
          surname: "Boateng",
          middleName: "Serwaa"
        },
        gender: "FEMALE",
        picture: "https://avatar.iran.liara.run/public/girl?username=Boateng"
      },
      preference: {
        enable2FA: false,
        enableEmailNotification: false
      },
      role: {
        id: "68486bd48bb929365e6b70e2",
        createdAt: "2025-06-10T17:31:00.524Z",
        name: "Admin",
        permissions: [
          { description: null, id: null, name: null },
          { description: null, id: null, name: null }
        ]
      },
      auditingAndConfirmation: {
        accountVerificationStatus: null,
        emailVarification: false,
        lastLogin: "2025-06-11T13:16:29.510Z"
      }
    },
     {
      id: "user15id123",
        createdAt: "2025-06-10T17:31:00.524Z",

      userProfile: {
        contact: "0501234567",
        email: "kwame.mensah@example.com",
        fullName: {
          firstName: "Kwame",
          surname: "Mensah",
          middleName: "Yaw"
        },
        gender: "MALE",
        picture: "https://avatar.iran.liara.run/public/boy?username=Mensah"
      },
      preference: {
        enable2FA: true,
        enableEmailNotification: true
      },
      role: {
        id: "roleId15",
        createdAt: "2025-06-01T10:00:00.000Z",
        name: "Manager",
        permissions: [
          { description: "Manage users", id: "perm1", name: "USER_MANAGE" },
          { description: "View reports", id: "perm2", name: "REPORT_VIEW" }
        ]
      },
      auditingAndConfirmation: {
        accountVerificationStatus: "VERIFIED",
        emailVarification: true,
        lastLogin: "2025-06-28T09:00:00.000Z"
      }
    },
     {
      id: "user16id456",
        createdAt: "2025-06-10T17:31:00.524Z",

      userProfile: {
        contact: "0249876543",
        email: "ama.owusu@example.com",
        fullName: {
          firstName: "Ama",
          surname: "Owusu",
          middleName: "Adwoa"
        },
        gender: "FEMALE",
        picture: "https://avatar.iran.liara.run/public/girl?username=Owusu"
      },
      preference: {
        enable2FA: false,
        enableEmailNotification: true
      },
      role: {
        id: "roleId16",
        createdAt: "2025-05-15T15:30:00.000Z",
        name: "Editor",
        permissions: [
          { description: "Edit content", id: "perm3", name: "CONTENT_EDIT" },
          { description: "Publish content", id: "perm4", name: "CONTENT_PUBLISH" }
        ]
      },
      auditingAndConfirmation: {
        accountVerificationStatus: "PENDING",
        emailVarification: false,
        lastLogin: "2025-06-27T14:45:00.000Z"
      }
    },
     {
      id: "user17id789",
        createdAt: "2025-06-10T17:31:00.524Z",

      userProfile: {
        contact: "0201122334",
        email: "kojo.addo@example.com",
        fullName: {
          firstName: "Kojo",
          surname: "Addo",
          middleName: "Kweku"
        },
        gender: "MALE",
        picture: "https://avatar.iran.liara.run/public/boy?username=Addo"
      },
      preference: {
        enable2FA: true,
        enableEmailNotification: false
      },
      role: {
        id: "roleId17",
        createdAt: "2025-04-20T08:15:00.000Z",
        name: "Viewer",
        permissions: [
          { description: "View dashboard", id: "perm5", name: "DASHBOARD_VIEW" }
        ]
      },
      auditingAndConfirmation: {
        accountVerificationStatus: "VERIFIED",
        emailVarification: true,
        lastLogin: "2025-06-25T12:30:00.000Z"
      }
    }
];

function StaffList() {
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleteModal, setDeleteModal] = useState(true);

  let navigate = useNavigate();
  return (
    <div className="roles">
      <div className="headers">
        <div className="roles-title">Staff Accounts</div>
       
        <button
          className="btn-new-role"
          onClick={(e) => navigate("/staff-account/Create-Staff-Account")}
        >
          Create Staff Account<span className="new-plus"> +</span>
        </button>
      </div>
      {/* 
      {
        isDeleteModal && <DeleteRoleModal setDeleteModel={setDeleteModal}/>
      } */}

      <div className="table-container">
        <div>
          <div className="table-head table-head-staffs-list">
            <span className=" tb-head-checkbox">
              {" "}
              <input type="checkbox" />
            </span>
            <span>ID</span>
            <span>Full Name</span>
            <span>Gender</span>
            <span>Contact</span>
            <span>Email Address</span>
            <span>Role</span>
            <span>Date Created</span>
          </div>

          {staffs.map((staff) => {
            return (
              <div key={staff.id} className="tb-row tb-row-staffs-list">
                <span>
                  <input type="checkbox" id={staff.id} />
                </span>
                <span>
                  AAA-000
                </span>
                <span>
                  
                  {staff?.userProfile?.fullName?.surname }  {staff.userProfile?.fullName?.middleName}  {staff.userProfile?.fullName?.firstName}
                </span>
                <span>
                  {staff?.userProfile?.gender}
                </span>
                <span>
                  {staff?.userProfile?.contact}
                </span>
                <span>
                  {staff?.userProfile?.email}
                </span>
                <span>
                  {staff?.role?.name}
                </span>
                <span>
                  1/12/2024
                  {/* {format(parseISO(staffs?.createdAt), "dd/MM/yyyy")} */}
                </span>
              </div>
            );
          })}
        </div>
        <div className="pagination-tab">
          <PaginatedTabs pageCount={30} setItemOffset={setItemOffset} />
        </div>
      </div>
    </div>
  );
}

export default StaffList;
