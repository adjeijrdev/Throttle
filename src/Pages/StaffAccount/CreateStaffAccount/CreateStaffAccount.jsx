import PasswordTextInput from "../../../Components/form/password/PasswordTextInput";
import CustomBoxRadioBtn from "../../../Components/form/radiobtn/CustomBoxRadioBtn";
import CustomSelector from "../../../Components/form/selector/CustomSelector";
import TextInput from "../../../Components/form/TextInput";
import { useNavigate } from "react-router";
import { z } from "zod";

import "./CreateStaffAccount.css";
import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { BeatLoader } from "react-spinners";
import CustomSelector2 from "../../../Components/form/selector/CustomSelecter2";
import { createStaffAPI } from "../../../api/authentication";
import { GET_ROLES,GET_ALL_STAFFS } from "../../../graphql/generalQueries";
import { useQuery } from "@apollo/client";

const schema = z.object({
  userProfile: z.object({
    fullName: z.object({
      surname: z
        .string({ required_error: "Surname is required" })
        .min(1, { message: "⚠ Surname is requied" })
        .trim(),
      firstName: z
        .string({ required_error: "firstName is required" })
        .min(1, { message: "⚠ firstName is requied" })
        .trim(),
      middleName: z.string().trim().optional(),
    }),
    gender: z.enum(["FEMALE", "MALE"], {
      required_error: "Please select staff gender",
    }),
    email: z
      .string({ required_error: "⚠ Email is required" })
      .trim()
      .email({ message: "Invalid email" }),
    contact: z
      .string({ required_error: "Phone number is required" })
      .min(10, { message: "Incorrect phone number" }),
  }),
  roleId: z.string().trim().length(24, "⚠ Please assign a role to the staff"),
});

function CreateStaffAccount() {
  const [selectedRole, setSelectedRole] = useState();
  const [roles, setRoles] = useState();
  const navigate = useNavigate();

    const {refetch: refetchStaff} = useQuery(GET_ALL_STAFFS)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: validationError, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

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
      search:""
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(()=>{
refetchRole()
  },[])

  useEffect(() => {
    
    if (!roleLoading) {
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
    setValue("roleId", selectedRole?.value, { shouldValidate: true });
  }, [selectedRole]);

  const onCreateStaff = async (data) => {
    try {
      const result = await createStaffAPI(data);

      toast.success(result?.data?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });

      refetchStaff()
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
      {/* <h2 className="ct-staff-title">Enter staff details</h2> */}

      <div>
        <div className="ct-form-container">
          <form
            className="ct-staff-form"
            onSubmit={handleSubmit(onCreateStaff)}
          >
            <div className="ct-staff-form-con1">
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

              {/* <div className="form-section1">
                <h3>Account Details</h3>

                <div className="personal-info-sec">
                  <PasswordTextInput
                    title="Temporary Password"
                    name="password"
                    isRequired={true}
                  />
                  <PasswordTextInput
                    title="Confirm Password"
                    name="comfirmPassword"
                    isRequired={true}
                  />
                </div>
              </div> */}

              <div className="form-section1">
                <div className="new-row-btn-container-st">
                  <h3 className="rm-h3-ln">Account Details</h3>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/dashboard/staff-account/create-Role");
                      
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateStaffAccount;
