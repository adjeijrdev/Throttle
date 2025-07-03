import { Link, useNavigate } from "react-router";
import PaginatedTabs from "../../../Components/paginationTab/paginationTabs";
import "./StaffList.css";
import { format, parseISO } from "date-fns";
import { useState } from "react";


import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";



const staffs = {
  nodes:[
 
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
]}


function StaffList() {
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleteModal, setDeleteModal] = useState(true);

  let navigate = useNavigate();


  
  const tableTheme = useTheme([
    getTheme(),
    {
      Table: `
        border-radius: 8px 8px 0rem 0rem;
        border: 0.1rem solid #979595;
    
      --data-table-library_grid-template-columns:  50px repeat(6, minmax(0, 1fr)) !important;
     
      `,
      BaseCell: `
        height: 47px;

      `,
      BaseRow: `
       
  `,
      Cell: `
          color:#06264D;
          height:56px;
          font-size: 1.4rem;
          font-weight:500;
          font-family: "Poppins", sans-serif;

         

          & .btn-container{
            display: flex;
            gap: 0.5rem;

            & button{
              padding: 0.7rem 3rem;
              border-radius: 0.8rem;
              border: 0.1rem solid #cdd4db;
              background-color: transparent;
              cursor: pointer;
              color: #003627;
              transition-duration: 250ms;
              transition-property: background-color, color, border;
              transition-timing-function: ease-in-out;
             

            }
          
          }

        `,
      HeaderRow: `
        background-color: #17654F;
        border-color: #003627;
        height: 56px;
        padding:25px;
        

      `,
      HeaderCell: `
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 1.6rem;
        color: #FFFFFF;

         & input{
          border-color:#fff;
        }

         & input:checked{
          border-color:#fff;
        }

         & .header-action{
          
            padding-left:6rem;
          }
      `,
      Body: `
    
      `,
      Row: `
          cursor: pointer;

          transition-duration: 250ms;
          transition-property: background-color;
          transition-timing-function: ease-in-out;

          &:hover{
          background-color:#D6E3E0;
          border-color:#979595;
          }
      `,
    },
  ]);

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
   


  <div className="table-container-st">
        <Table data={staffs} theme={tableTheme}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>
                    <input type="checkbox" />
                  </HeaderCell>
                  
                  <HeaderCell>Full Name</HeaderCell>
                  <HeaderCell>Gender</HeaderCell>
                  <HeaderCell>Contact</HeaderCell>
                  <HeaderCell>Email Address</HeaderCell>
                  <HeaderCell>Role</HeaderCell>
                  <HeaderCell>Date Created</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell>
                      <input type="checkbox" />
                    </Cell>
                    <Cell>{item?.userProfile?.fullName?.surname }  {item.userProfile?.fullName?.middleName}  {item.userProfile?.fullName?.firstName}</Cell>
                    <Cell>{item?.userProfile?.gender}</Cell>
                    <Cell>{item?.userProfile?.contact}</Cell>
                    <Cell>{item?.userProfile?.email}</Cell>
                    <Cell>{item?.role?.name}</Cell>
                    <Cell>
                     {format(parseISO(item?.createdAt), "dd/MM/yyyy")}
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>

        <div className="pagination-tab">
          <PaginatedTabs pageCount={30} setItemOffset={setItemOffset} />
        </div>
      </div>

     
        
    </div>
  );
}

export default StaffList;
