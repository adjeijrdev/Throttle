import "./StaffRole.css";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";

import { GET_PERMISSIONS } from "../../../graphql/generalQueries";
import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoleAPI } from "../../../api/authentication";
import toast from "react-hot-toast";
import {  Spin } from "antd";
import { BeatLoader } from "react-spinners";


const schema = z.object({
  name: z.string().trim().min(1, "⚠ Role name is required"),
  permissions: z
    .array(z.string().trim())
    .min(1, "Please assign atleast one permssion"),
});

function CreateRole() {
  const [selectedPermssions, setSelectedPermission] = useState([]);
  const {
    loading: permissionLoading,
    error: permissionError,
    data: permssions,
  } = useQuery(GET_PERMISSIONS);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors: validationError, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) ,
    
  });

  const handleSetPermission = (id) => {

    setSelectedPermission((prevPermissions) => {
      let newPermissions;

      if (!prevPermissions?.includes(id)) {
        newPermissions = [...prevPermissions, id];
      } else {
        newPermissions = prevPermissions?.filter((_id) => _id !== id);
      }
      setValue("permissions", newPermissions, { shouldValidate: true });
      return newPermissions;
    });
    
  };
  const onCreateRole = async (data) => {
    try {
      const result = await createRoleAPI(data);

      toast.success(result.data.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });
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
      // console.log(error.message);
    }
  };

  useEffect(()=>{
    console.log(selectedPermssions)
  },[selectedPermssions])
  const navigate = useNavigate();
  return (
    <div className="staffs account">
      <h2 className="se">Create New Role</h2>

      <form className="role-form" onSubmit={handleSubmit(onCreateRole)}>
        <div className="form-section">
          <h3>Role Title</h3>
          <div>
            <label htmlFor="roleTitle">
              Enter role title <span className="required-field">*</span>
            </label>
            <br />
            <input
              {...register("name", { required: true })}
              // type="text"
              // id="roleTitle"

              className="text-input"
              // value={name}
              // onChange={(e)=>{setName(e.target.value),setValue("name", name,{required:true})}}
            />
          </div>
          {validationError?.name && (
            <h2
              style={{
                color: "red",
                marginTop: "-1rem",
                fontSize: "1.3rem",
                fontWeight: "450",
              }}
            >
              {validationError?.name?.message}
            </h2>
          )}
        </div>

        <div className="form-section">
          <h3>Permissions Selection</h3>

          {validationError?.permissions && (
            <h2
              style={{
                color: "red",
                marginTop: "-1rem",
                fontSize: "1.3rem",
                fontWeight: "450",
              }}
            >
              Please assign atleast one permssion
            </h2>
          )}

          {!permssions ? (
            <Spin
              size="large"
             className="loading-spinner" 
            />
          ) : (
            <ul>
              {permssions?.permissions?.map((permission) => {
                return (
                  <li key={permission._id}>
                    <div>
                      <input
                        type="checkbox"
                        id={permission._id}
                        name={permission.name}
                        onChange={(e) => handleSetPermission(e.target.value)}
                        value={permission._id}
                      />
                    </div>

                    <label htmlFor={permission._id} className="list-label">
                      {permission?.description}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="account-create-btn">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button className="btn-create" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <BeatLoader color="white" /> : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRole;
