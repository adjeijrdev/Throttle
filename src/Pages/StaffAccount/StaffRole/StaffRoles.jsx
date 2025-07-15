import { Link, useNavigate } from "react-router";
import PaginatedTabs from "../../../Components/paginationTab/paginationTabs";

import "./StaffRole.css";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import DeleteRoleModal from "./DeleteRoleModal";
import { Spin } from "antd";
import toast from "react-hot-toast";

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
import { useQuery } from "@apollo/client";
import { GET_ROLES } from "../../../graphql/generalQueries";
import { deleteRoleAPI } from "../../../api/authentication";
import { removeSingleRoleFromCache } from "../../../graphql/graphqlConfiguration";
import DisplayRoleStaffsAssignModel from "./DisplayRoleStaffsAssignModel";

function StaffRoles() {
  const [roleOffSet, setRoleOffSet] = useState(0);
  let itemsPerPage = 2;

  const {
    loading: roleLoading,
    data: roleData,
    error: roleError,
    fetchMore: fetchMoreRoles,
  } = useQuery(GET_ROLES, {
    variables: {
      offset: roleOffSet,
      limit: itemsPerPage,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [roleIdToDelete,setRoleIdToDelete] = useState("");
  const [showStaffModal, setShowStaffModal] = useState(false)
  const totalNumberOfRoles = roleData?.roles?.totalCount;

  // console.log(roleData);
  let navigate = useNavigate();

  const tableTheme = useTheme([
    getTheme(),
    {
      Table: `
        border-radius: 8px 8px 0rem 0rem;
        border: 0.1rem solid #979595;
      
    // max-width: 1511px;
      // --data-table-library_grid-template-columns:  50px repeat(4, minmax(100px, 1fr)) !important;
      // --data-table-library_grid-template-columns:  10% 22.5% 22.5% 22.5% 22.5%  minmax(100px, 1fr) !important ;

        --data-table-library_grid-template-columns: 50px repeat(4, minmax(250px, auto));


        &::-webkit-scrollbar-track {
              background: #f1f1f1; 
              border-radius: 4px;
          }

          &::-webkit-scrollbar-thumb {
            background:  rgba(112, 128, 144, 0.4); 
            height:1rem;
            border-radius: 4px;
          }


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

          & .num-staff-col{
          margin-left:3rem;
       
          }  
          
          
          & input{
        
          width:15.98px;
          height:15.09px;
          border-radius:4px
        }

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
          width:15.98px;
          height:15.09px;
          border-radius:4px
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

  const handleDeleteRole = async () => {
   
    try {
      const result = await deleteRoleAPI(roleIdToDelete);

      toast.success(result.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });

      removeSingleRoleFromCache(roleIdToDelete)
    } catch (error) {
      toast.error(error.message, {
        style: {
          border: "1px solid oklch(88.5% 0.062 18.334)",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "oklch(39.6% 0.141 25.723)",
          fontSize: "16px",
          width: "500px",
        },
      });
    }
    setDeleteModal(false)
  };

  return (
    <div className="roles">
      <div className="headers">
        <div className="roles-title">Staff Roles</div>

        <button
          className="btn-new-role"
          onClick={(e) => navigate("/staff-account/create-Role")}
        >
          Create New Role <span className="new-plus">+</span>
        </button>
      </div>

      {isDeleteModal && <DeleteRoleModal setDeleteModel={setDeleteModal} handleDeleteRole={handleDeleteRole}/>}

      {showStaffModal && <DisplayRoleStaffsAssignModel setShowStaffModal={setShowStaffModal} />}

      <div className="table-container-st">
        <Table
          data={{ nodes: [...(roleData?.roles.data || [])] }}
          theme={tableTheme}
          layout={{ custom: true, horizontalScroll: true, fixedHeader: true }}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>
                    <input type="checkbox" />
                  </HeaderCell>
                  <HeaderCell>Role Title</HeaderCell>
                  <HeaderCell>Description</HeaderCell>
                  <HeaderCell>Number of Staffs</HeaderCell>
                  <HeaderCell>
                    <span className="header-action">Action</span>
                  </HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {roleLoading ? (
                  <Row>
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell>
                      <Spin size="large" className="loading-spinner" />
                    </Cell>
                  </Row>
                ) : (
                  tableList.map((item) => (
                    <Row key={item?._id} item={item}>
                      <Cell>
                        <input type="checkbox" />
                      </Cell>
                      <Cell>{item?.name}</Cell>
                      <Cell>{item?.description}</Cell>
                      <Cell>
                        {/* working on show staff modal */}
                        <button
                            onClick={()=>setShowStaffModal(true)}
                            className="num-staff-col"
                          >
                          {item?.assignTo?.length}
                          </button>
                        
                      </Cell>
                      <Cell>
                        <span className="btn-container">
                          <button
                            onClick={(e) =>
                              navigate(`/staff-account/edit-role/${item.id}`)
                            }
                          >
                            Edit
                          </button>
                          <button onClick={() => {setDeleteModal(true),setRoleIdToDelete(item?._id)}}>
                            Delete
                          </button>
                        </span>
                      </Cell>
                    </Row>
                  ))
                )}
              </Body>
            </>
          )}
        </Table>

        <div className="pagination-tab">
          <PaginatedTabs
            totalRecords={totalNumberOfRoles}
            setItemOffset={setItemOffset}
            offSet={itemOffset}
            itemsPerPage={itemsPerPage}
            fetchMore={fetchMoreRoles}
          />
        </div>
      </div>
    </div>
  );
}

export default StaffRoles;
