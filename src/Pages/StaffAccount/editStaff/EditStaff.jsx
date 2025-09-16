import PasswordTextInput from "../../../Components/form/password/PasswordTextInput";
import CustomBoxRadioBtn from "../../../Components/form/radiobtn/CustomBoxRadioBtn";
import CustomSelector from "../../../Components/form/selector/CustomSelector";
import TextInput from "../../../Components/form/TextInput";
import { useNavigate } from "react-router";
import { z } from "zod/v3";

// import "./CreateStaffAccount.css";
import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { BeatLoader } from "react-spinners";
import CustomSelector2 from "../../../Components/form/selector/CustomSelecter2";
import { createStaffAPI, editStaffAPI } from "../../../api/authentication";
import {
  GET_ROLES,
  GET_ALL_STAFFS,
  GET_STAFF,
} from "../../../graphql/generalQueries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import imgIcon from "../../../Assets/icons/img.png";
import statusicon from "../../../Assets/icons/statusicon.png";

const schema = z.object({
  staffId: z.string(),
  userProfile: z.object({
    fullName: z
      .object({
        surname: z
          .string({ required_error: "Surname is required" })
          .trim()
          .optional(),
        firstName: z
          .string({ required_error: "firstName is required" })
          .trim()
          .optional(),
        middleName: z.string().trim().optional(),
      })
      .optional(),
    gender: z.enum(["FEMALE", "MALE"]).optional(),
    email: z
      .string({ required_error: "⚠ Email is required" })
      .trim()
      .email({ message: "Invalid email" })
      .optional(),
    contact: z
      .string({ required_error: "Phone number is required" })
      .optional(),
  }),
  roleId: z.string().trim().optional(),
});

function EditStaff() {
  const [selectedRole, setSelectedRole] = useState();
  const [roles, setRoles] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const { refetch: refetchStaff } = useQuery(GET_ALL_STAFFS);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors: validationError, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Watch the relevant form fields
const watchedValues = watch();
const surname = watch('userProfile.fullName.surname');
const middleName = watch('userProfile.fullName.middleName');
const firstName = watch('userProfile.fullName.firstName');
const email = watch('userProfile.email');

// Create dynamic display values
const displayName = [surname, middleName, firstName]
  .filter(name => name && name.trim() !== '')
  .join(' ') || 'Staff Name';
const displayEmail = email || 'staff@email.com';


  const {
    loading: staffLoading,
    data: staffData,
    error: staffError,
    reset: staffReset,
    fetchMore: fetchMoreStaff,
  } = useQuery(GET_STAFF, {
    variables: {
      staffId: id,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (staffData) {
   
      reset({
        userProfile: {
          fullName: {
            surname: staffData?.staff?.userProfile?.fullName?.surname,
            firstName: staffData?.staff?.userProfile?.fullName?.firstName,
            middleName: staffData?.staff?.userProfile?.fullName?.middleName,
          },
          gender: staffData?.staff?.userProfile?.gender,
          email:  staffData?.staff?.userProfile?.email,
          contact:  staffData?.staff?.userProfile?.contact,
          roleId:staffData?.staff?.role?._id
        },
      });
    }

      setSelectedRole(
        {
          value: staffData?.staff?.role?._id,
          label: staffData?.staff?.role?.name,
        }
      );

      setValue("staffId", id)
  }, [staffData]);

  const {
    loading: roleLoading,
    data: roleData,
    error: roleError,
    fetchMore: fetchMoreRoles,
    refetch: refetchRole,
  } = useQuery(GET_ROLES, {
    variables: {
      offset: 0,
      limit: 100,
      search: "",
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (roleData) {
      const _roles = roleData?.roles?.data?.map((role) => {
        return {
          value: role?._id,
          label: role?.name,
        };
      });

      setRoles(_roles);
    }
  }, [roleData]);

  useEffect(() => {
    setValue("roleId", selectedRole?.value);
  }, [selectedRole]);

  const onEditStaff = async (data) => {
    try {
      const result = await editStaffAPI(data);

      toast.success(result?.data?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });

      refetchStaff();
    } catch (error) {
      toast.error(error?.message, {
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
    <div className="account">
      <h2 className="ct-staff-title">Enter staff details</h2>

      <div>
        <div className="ct-form-container">
          <form
            className="ct-staff-form"
            onSubmit={handleSubmit(onEditStaff)}
          >
            <div className="ct-staff-form-con1">
               <div style={{backgroundColor:"white", padding:"1rem"}}>
                          <div  style={{backgroundColor:"white", width:"45%", display:"flex", justifyContent:"flex-start", alignItems:"center", marginTop:"2rem",padding:"1.5rem"}}>
                             <span style={{width:"6rem",
                                        height:"6rem", 
                                        borderRadius:"50%", 
                                        border:"1px solid black",
                                        display:"inline-flex",justifyContent:"center", alignContent:"center",padding:"2rem"}}>
                                                 <img
                                                    src={imgIcon}
                                                    alt=" imgIcon"
                                                    style={{ width: "16px", height: "16px" }}
                                                  />
                                </span>
                                <div style={{display:"grid", marginLeft:"2rem", gap:"0.3rem"}}>
                                  <div style={{fontSize:"2rem",fontWeight:"700"}}>{displayName}</div>
                                  <div style={{ fontSize:"1.2rem"}}>{displayEmail}</div>
                                  <button style={{
                                   backgroundColor:"#99f8c1ff",
                                   border:"1px solid #4ef493ff",
                                   width:"10rem",
                                   borderRadius:"0.2rem"
                                   }}>
                                    Approved<img
                                                                                    src={statusicon}
                                                                                    alt=" statusicon"
                                                                                    style={{ width: "10px", height: "14px" }}
                                                                                  /></button>
                                </div>
                          </div>
                           <div className="account-create-btn">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-cancel"
              >
                Cancel
              </button>

              <button
                className="btn-create"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <BeatLoader color="white" /> : "Create"}
              </button>
            </div>
                         </div>
              <div className="form-section1">
                <h3>Personal Information</h3>

                <div className="personal-info-sec">
                  <div className="input-con">
                    <TextInput
                      title="Surname"
                      name="surname"
                      isRequired={true}
                      register={() => register("userProfile.fullName.surname")}
                    />
                    {validationError?.userProfile?.fullName?.surname && (
                      <h2
                        style={{
                          color: "red",
                          marginTop: "-1rem",
                          fontSize: "1.3rem",
                          fontWeight: "450",
                        }}
                      >
                        {
                          validationError?.userProfile?.fullName?.surname
                            ?.message
                        }
                      </h2>
                    )}
                  </div>

                  <TextInput
                    title="Other Names"
                    name="otherNames"
                    isRequired={true}
                    register={() => register("userProfile.fullName.middleName")}
                  />

                  <div className="input-con">
                    <TextInput
                      title="FirstName"
                      name="firstName"
                      isRequired={true}
                      register={() =>
                        register("userProfile.fullName.firstName")
                      }
                    />
                    {validationError?.userProfile?.fullName?.firstName && (
                      <h2
                        style={{
                          color: "red",
                          marginTop: "-1rem",
                          fontSize: "1.3rem",
                          fontWeight: "450",
                        }}
                      >
                        {
                          validationError?.userProfile?.fullName?.firstName
                            ?.message
                        }
                      </h2>
                    )}
                  </div>

                  <div className="input-con">
                    <TextInput
                      title="Email Address"
                      name="email"
                      isRequired={true}
                      register={() => register("userProfile.email")}
                    />
                    {validationError?.userProfile?.email && (
                      <h2
                        style={{
                          color: "red",
                          marginTop: "-1rem",
                          fontSize: "1.3rem",
                          fontWeight: "450",
                        }}
                      >
                        {validationError?.userProfile?.email?.message}
                      </h2>
                    )}
                  </div>

                  <div className="input-con">
                    <TextInput
                      title="contact"
                      name="contact"
                      isRequired={true}
                      register={() => register("userProfile.contact")}
                    />
                    {validationError?.userProfile?.contact && (
                      <h2
                        style={{
                          color: "red",
                          marginTop: "-1rem",
                          fontSize: "1.3rem",
                          fontWeight: "450",
                        }}
                      >
                        {validationError?.userProfile?.contact?.message}
                      </h2>
                    )}
                  </div>

                  <div className="gender-container">
                    <div className="label-text-style">
                      Gender<span className="required-field">*</span>
                    </div>
                    <div className="gender-radio-container ">
                      <CustomBoxRadioBtn
                        value={"MALE"}
                        name={"gender"}
                        id={"Male"}
                        label={"Male"}
                        register={() => register("userProfile.gender")}
                      />
                      <CustomBoxRadioBtn
                        value={"FEMALE"}
                        name={"gender"}
                        id={"Female"}
                        label={"Female"}
                        register={() => register("userProfile.gender")}
                      />
                    </div>
                    {validationError?.userProfile?.gender && (
                      <h2
                        style={{
                          color: "red",
                          // marginTop: "0.5rem",
                          fontSize: "1.3rem",
                          fontWeight: "450",
                        }}
                      >
                        Gender is required
                      </h2>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-section1">
                <div className="new-row-btn-container-st">
                  <h3 className="rm-h3-ln">Account Details</h3>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/staff-account/create-Role");
                    }}
                  >
                    Create New Role
                  </button>
                </div>

                <div className="personal-info-select">
                  <div>
                    Staff role<span className="required-field">*</span>{" "}
                  </div>
                  <CustomSelector2
                    options={roles}
                    selectedValue={selectedRole}
                    setSelectedValue={setSelectedRole}
                  />
                  {validationError?.roleId && (
                    <h2
                      style={{
                        color: "red",
                        marginTop: "1rem",
                        fontSize: "1.3rem",
                        fontWeight: "450",
                      }}
                    >
                      Please assign a role to staff
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStaff;
