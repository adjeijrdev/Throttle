import { Link, useNavigate } from "react-router";
import PaginatedTabs from "../../../Components/paginationTab/paginationTabs";

import "./StaffRole.css";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import DeleteRoleModal from "./DeleteRoleModal";

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

const roles = {
  nodes: [
    {
      createdAt: "2025-06-10T17:31:00.524Z",
      id: "68486bd48bb929365e6b70e2",
      name: "Admin",
      updatedAt: "2025-06-10T22:00:47.106Z",
      description: "description1",
      permissions: [
        {
          createdAt: "2025-06-10T17:18:18.122Z",
          description: "Book or create new orders",
          id: "684868da7a4c9386ab6b1594",
          name: "Book orders",
          updatedAt: "2025-06-10T17:18:18.122Z",
        },
        {
          createdAt: "2025-06-10T21:47:08.419Z",
          description: "To be able to delete orders",
          id: "6848a7dc9f5268929300cf77",
          name: "Delete orders",
          updatedAt: "2025-06-10T21:47:08.419Z",
        },
      ],
    },
    {
      createdAt: "2025-06-10T17:31:00.524Z",
      id: "2",
      name: "Admin",
      updatedAt: "2025-06-10T22:00:47.106Z",
      description: "description1",
      permissions: [
        {
          createdAt: "2025-06-10T17:18:18.122Z",
          description: "Book or create new orders",
          id: "684868da7a4c9386ab6b1594",
          name: "Book orders",
          updatedAt: "2025-06-10T17:18:18.122Z",
        },
        {
          createdAt: "2025-06-10T21:47:08.419Z",
          description: "To be able to delete orders",
          id: "6848a7dc9f5268929300cf77",
          name: "Delete orders",
          updatedAt: "2025-06-10T21:47:08.419Z",
        },
      ],
    },
    {
      createdAt: "2025-06-10T17:31:00.524Z",
      id: "3",
      name: "Admin",
      updatedAt: "2025-06-10T22:00:47.106Z",
      description: "description1",

      permissions: [
        {
          createdAt: "2025-06-10T17:18:18.122Z",
          description: "Book or create new orders",
          id: "684868da7a4c9386ab6b1594",
          name: "Book orders",
          updatedAt: "2025-06-10T17:18:18.122Z",
        },
        {
          createdAt: "2025-06-10T21:47:08.419Z",
          description: "To be able to delete orders",
          id: "6848a7dc9f5268929300cf77",
          name: "Delete orders",
          updatedAt: "2025-06-10T21:47:08.419Z",
        },
      ],
    },
    {
      createdAt: "2025-06-10T17:31:00.524Z",
      id: "4",
      name: "Admin",
      updatedAt: "2025-06-10T22:00:47.106Z",
      description: "description1",

      permissions: [
        {
          createdAt: "2025-06-10T17:18:18.122Z",
          description: "Book or create new orders",
          id: "684868da7a4c9386ab6b1594",
          name: "Book orders",
          updatedAt: "2025-06-10T17:18:18.122Z",
        },
        {
          createdAt: "2025-06-10T21:47:08.419Z",
          description: "To be able to delete orders",
          id: "6848a7dc9f5268929300cf77",
          name: "Delete orders",
          updatedAt: "2025-06-10T21:47:08.419Z",
        },
        {
          createdAt: "2025-06-10T21:47:08.419Z",
          description: "To be able to delete orders",
          id: "3",
          name: "Delete orders",
          updatedAt: "2025-06-10T21:47:08.419Z",
        },
        {
          createdAt: "2025-06-10T21:47:08.419Z",
          description: "To be able to delete orders",
          id: "4",
          name: "Delete orders",
          updatedAt: "2025-06-10T21:47:08.419Z",
        },
        {
          createdAt: "2025-06-10T21:47:08.419Z",
          description: "To be able to delete orders",
          id: "5",
          name: "Delete orders",
          updatedAt: "2025-06-10T21:47:08.419Z",
        },
      ],
    },
    {
      createdAt: "2025-06-10T17:31:00.524Z",
      id: "5",
      name: "Admin",
      updatedAt: "2025-06-10T22:00:47.106Z",
      description: "description1",

      permissions: [
        {
          createdAt: "2025-06-10T17:18:18.122Z",
          description: "Book or create new orders",
          id: "684868da7a4c9386ab6b1594",
          name: "Book orders",
          updatedAt: "2025-06-10T17:18:18.122Z",
        },
        {
          createdAt: "2025-06-10T21:47:08.419Z",
          description: "To be able to delete orders",
          id: "6848a7dc9f5268929300cf77",
          name: "Delete orders",
          updatedAt: "2025-06-10T21:47:08.419Z",
        },
      ],
    },
    {
      createdAt: "2025-06-10T17:31:00.524Z",
      id: "6",
      name: "Admin",
      updatedAt: "2025-06-10T22:00:47.106Z",
      description: "description1",

      permissions: [
        {
          createdAt: "2025-06-10T17:18:18.122Z",
          description: "Book or create new orders",
          id: "684868da7a4c9386ab6b1594",
          name: "Book orders",
          updatedAt: "2025-06-10T17:18:18.122Z",
        },
        {
          createdAt: "2025-06-10T21:47:08.419Z",
          description: "To be able to delete orders",
          id: "6848a7dc9f5268929300cf77",
          name: "Delete orders",
          updatedAt: "2025-06-10T21:47:08.419Z",
        },
      ],
    },
    {
      createdAt: "2025-06-10T17:31:00.524Z",
      id: "7",
      name: "Admin",
      updatedAt: "2025-06-10T22:00:47.106Z",
      description: "description1",
      permissions: [
        {
          createdAt: "2025-06-10T17:18:18.122Z",
          description: "Book or create new orders",
          id: "684868da7a4c9386ab6b1594",
          name: "Book orders",
          updatedAt: "2025-06-10T17:18:18.122Z",
        },
        {
          createdAt: "2025-06-10T21:47:08.419Z",
          description: "To be able to delete orders",
          id: "6848a7dc9f5268929300cf77",
          name: "Delete orders",
          updatedAt: "2025-06-10T21:47:08.419Z",
        },
        {
          createdAt: "2025-06-10T21:47:08.419Z",
          description: "To be able to delete orders",
          id: "2",
          name: "Delete orders",
          updatedAt: "2025-06-10T21:47:08.419Z",
        },
      ],
    },
  ],
};

function StaffRoles() {
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleteModal, setDeleteModal] = useState(false);

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
          padding-left:7rem;
         
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

  return (
    <div class="roles">
      <div className="headers">
        <div className="roles-title">Staff Roles</div>

        <button
          className="btn-new-role"
          onClick={(e) => navigate("/staff-account/create-Role")}
        >
          Create New Role <span className="new-plus">+</span>
        </button>
      </div>

      {isDeleteModal && <DeleteRoleModal setDeleteModel={setDeleteModal} />}

      <div className="table-container-st">
        <Table data={roles} theme={tableTheme}   layout={{ custom: true, horizontalScroll: true , fixedHeader: true}}>
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
                  <HeaderCell><span className="header-action">Action</span></HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell>
                      <input type="checkbox" />
                    </Cell>
                    <Cell>{item.name}</Cell>
                    <Cell>{item.description}</Cell>
                    <Cell ><div className="num-staff-col">5</div></Cell>
                    <Cell>
                      <span className="btn-container">
                        <button
                          onClick={(e) => navigate(`/staff-account/edit-role/${item.id}`)
                          }
                        >
                          Edit
                        </button>
                        <button onClick={() => setDeleteModal(true)}>
                          Delete
                        </button>
                      </span>
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

export default StaffRoles;
