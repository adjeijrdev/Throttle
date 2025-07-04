import PasswordTextInput from "../../../Components/form/password/PasswordTextInput";
import CustomBoxRadioBtn from "../../../Components/form/radiobtn/CustomBoxRadioBtn";
import CustomSelector from "../../../Components/form/selector/CustomSelector";
import TextInput from "../../../Components/form/TextInput";
import { useNavigate } from "react-router";

import "./CreateStaffAccount.css";
import { useState } from "react";

const roles = [
  {
    id: "4",
    name: "Admin",
  },
  {
    id: "5",
    name: "Dispatcher",
  },
  {
    id: "6",
    name: "Finance",
  },
  {
    id: "7",
    name: "Customer Service",
  },
  {
    id: "7",
    name: "Customer Service",
  },
  {
    id: "7",
    name: "Customer Service",
  },
  {
    id: "7",
    name: "Customer Service",
  },
  {
    id: "7",
    name: "Customer Service",
  },
  {
    id: "7",
    name: "Customer Service",
  },
  {
    id: "7",
    name: "Customer Service",
  },
  {
    id: "7",
    name: "Customer Service",
  },
];

function CreateStaffAccount() {
  const [selectedRole, setSelectedRole] = useState();
  const navigate = useNavigate();

  const roleSelectOptions = roles.map((role) => {
    return {
      value: role.id,
      label: role.name,
    };
  });
  return (
    <div className="account">
      <h2 className="ct-staff-title">Enter staff details</h2>

      <div>
        <div className="ct-form-container">
          <form className="ct-staff-form">
            <div className="ct-staff-form-con1">
              <div className="form-section1">
                <h3>Personal Information</h3>

                <div className="personal-info-sec">
                  <TextInput title="Surname" name="Surname" isRequired={true} />
                  <TextInput title="Other Names" name="otherNames" />

                  <TextInput
                    title="First Name"
                    name="firstName"
                    isRequired={true}
                  />
                  <TextInput
                    title="Email Address"
                    name="email"
                    isRequired={true}
                  />
                  <TextInput title="contact" name="contact" isRequired={true} />
                  <div className="gender-container">
                    <div className="label-text-style">
                      Gender<span className="required-field">*</span>
                    </div>
                    <div className="gender-radio-container ">
                      <CustomBoxRadioBtn
                        value={"Male"}
                        name={"gender"}
                        id={"Male"}
                        label={"Male"}
                      />
                      <CustomBoxRadioBtn
                        value={"Female"}
                        name={"gender"}
                        id={"Female"}
                        label={"Female"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section1">
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
              </div>

              <div className="form-section1">
                <div className="new-row-btn-container-st">
                  <h3 className="rm-h3-ln">Account Details</h3>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/staff-account/Staff-Role");
                    }}
                  >
                    Create New Role
                  </button>
                </div>

                <div className="personal-info-select">
                  <div>
                    Staff role<span className="required-field">*</span>{" "}
                  </div>
                  <CustomSelector
                    options={roleSelectOptions}
                    selectedValue={selectedRole}
                    setSelectedValue={setSelectedRole}
                  />
                </div>
              </div>
            </div>

            <div className="account-create-btn">
              <button type="button" onClick={()=>navigate(-1)} className="btn-cancel">Cancel</button>
              <button className="btn-create">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateStaffAccount;
