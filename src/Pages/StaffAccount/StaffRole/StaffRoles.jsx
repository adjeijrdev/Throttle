import { Link,useNavigate } from "react-router";
import PaginatedTabs from "../../../Components/paginationTab/paginationTabs";

import "./StaffRole.css";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import DeleteRoleModal from "./DeleteRoleModal";
const roles = [
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


];

function StaffRoles() {
  const [itemOffset, setItemOffset] = useState(0)
  const [isDeleteModal, setDeleteModal] = useState(false)
  
   let navigate = useNavigate();
  return (
    <div class="roles">
      <div className="headers">
        <div className="roles-title">Staff Roles</div>

        <button className="btn-new-role" onClick={(e)=>navigate("/staff-account/create-Role")}>
          Create New Role <span className="new-plus">+</span>
        </button>
      </div>

      {
        isDeleteModal && <DeleteRoleModal setDeleteModel={setDeleteModal}/>
      }

      <div className="table-container">
        <div>
          <div className="table-head">
                 
            <span className="tb-head-checkbox"> <input type="checkbox"  /></span>
            <span>Role Title</span>
            <span>Description</span>
            <span>Date Created</span>
            <span>Action</span>

          </div>

          {roles.map((role) => {
            return (
              <div key={role.id} className="tb-row">
                <span>
                  <input type="checkbox" id={role.id} />
                </span>
                <span>{role.name}</span>
                <span>{role.description}</span>
                {/* <span>
                  {role.permissions.map((perm) => {
                    return (
                      <span>
                        {" "}
                        <span className="star">*</span> {perm.description}
                      </span>
                    );
                  })}
                </span> */}
               

                <span>{format(parseISO(role.updatedAt), "dd/MM/yyyy")}</span>

                 <span className="btn-container">
                  <button onClick={(e)=> navigate(`/staff-account/edit-role/${role.id}`)}>Edit</button>
                  <button onClick={()=>setDeleteModal(true)}>Delete</button>
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

export default StaffRoles;
