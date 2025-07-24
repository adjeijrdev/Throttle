import "./StaffRole.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";

import TextInput from "../../../Components/form/TextInput";
import {
  GET_PERMISSIONS,
  GET_ROLE,
  GET_ROLES,
} from "../../../graphql/generalQueries";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { BeatLoader } from "react-spinners";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { editRoleAPI } from "../../../api/authentication";

const schema = z.object({
  id: z.string().trim(),
  name: z.string().trim().optional(),
  description: z.string().trim().optional(),
  permissions: z
    .array(z.string().trim())
    .min(1, "Please assign atleast one permssion").optional(),
});

function EditRole() {
  const [roleName, setRoleName] = useState();
  const [_roleDescription, _setRoleDescription] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPermssions, setSelectedPermission] = useState([]);
  const { refetch: refetchRoles } = useQuery(GET_ROLES, {
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: roleLoading,
    error: roleError,
    data: roleData,
  } = useQuery(GET_ROLE, {
    variables: {
      roleId: id,
    },
  });

  useEffect(() => {
    const assignedRoleIds = roleData?.role?.permissions?.map(
      (perm) => perm._id
    );

    for (let i = 0; i < assignedRoleIds?.length; i++) {
      setSelectedPermission((prevPermissions) => {
        let newPermissions;

        if (!prevPermissions?.includes(id)) {
          newPermissions = [...prevPermissions, assignedRoleIds[i]];
        }
        setValue("permissions", newPermissions, { shouldValidate: true });
        return newPermissions;
      });
    }
    setRoleName(roleData?.role?.name);
    _setRoleDescription(roleData?.role?.description);
  setValue("id",id)

  }, [roleData]);

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
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: roleName,
      description: _roleDescription,
      permissions: selectedPermssions,
    },
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

  const onEdtRole = async (data) => {
    try {
      const result = await editRoleAPI(data);

      toast.success(result.data.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });

      refetchRoles();
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
  };

  return (
    <div className="staffs account">
      <h2>Edit Role</h2>

      <form className="role-form" onSubmit={handleSubmit(onEdtRole)}>
        <div className="form-section">
          <h3>Role Title</h3>
          <div>
            <label htmlFor="roleTitle">
              Edit role title <span className="required-field">*</span>
            </label>
            <br />
            <input
              {...register("name", {
              
                onChange: (e) => setRoleName(e.target.value),
              })}
              className="text-input"
              value={roleName}
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

          <div className="form-section">
            <h3>Description</h3>
            <div>
              <label htmlFor="description">Edit role description</label>
              <br />
              <textarea
                value={_roleDescription}
                className="text-input"
                {...register("description", {
                  onChange: (e) => _setRoleDescription(e.target.value),
                })}
                rows={3}
              ></textarea>
            </div>
          </div>
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

          {!(permssions || roleLoading) ? (
            <Spin size="large" className="loading-spinner" />
          ) : (
            <ul>
              {permssions?.permissions?.map((permission) => {
                return (
                  <li key={permission._id}>
                    <div>
                      <input
                        type="checkbox"
                        id={permission._id}
                        checked={selectedPermssions?.includes(permission._id)}
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

        <div className="buttons">
          <button
            className="btn-cancel"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className="btn-create" disabled={isSubmitting}>
            {isSubmitting ? <BeatLoader color="white" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRole;
