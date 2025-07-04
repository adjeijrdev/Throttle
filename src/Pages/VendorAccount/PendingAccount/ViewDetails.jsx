import React from "react";
import PasswordTextInput from "../../../Components/form/password/PasswordTextInput";
import CustomBoxRadioBtn from "../../../Components/form/radiobtn/CustomBoxRadioBtn";
import CustomSelector from "../../../Components/form/selector/CustomSelector";
import TextInput from "../../../Components/form/TextInput";
import { useNavigate, useLocation } from "react-router";

export default function ViewDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const status = location?.state?.status;

  return (
    <div className="account">
      <div className="headers">
        <h2 className="ct-staff-title">Vendor Approval</h2>
        <button
          className="btn-new-role"
          onClick={(e) => console.log("dd")}
        >
          Delete Account
        </button>
      </div>

      <div>
        <div>
          <form className="ct-staff-form">
            <div className="ct-staff-form-con1">
              <div className="form-section1">
                <h3>Business Information</h3>

                <div className="personal-info-sec">
                  <TextInput
                    title="Business Name"
                    name="businessName"
                    isRequired={false}
                  />
                  <TextInput title="Business Address" name="businessAddress" />

                  <TextInput
                    title="Country & City of Operation"
                    name="country"
                  />
                  <TextInput
                    title="Business Registration Number"
                    name="registrationNumber"
                  />
                  <TextInput title="Business Type" name="businessType" />
                  <TextInput
                    title="Years in Operation"
                    name="yearsInOperation"
                  />
                </div>
              </div>

              <div className="form-section1">
                <h3>Contact Details</h3>

                <div className="personal-info-sec">
                  <TextInput
                    title="Contact Person Name"
                    name="contactPersonName"
                  />
                  <TextInput title="Contact Phone Number" name="phoneNumber" />
                  <TextInput
                    title="Alternate Phone Number"
                    name="additionalPhoneNumber"
                  />
                  <TextInput title="Business Website" name="website" />
                  <TextInput title="Contact Email" name="email" />
                  <TextInput title="Social Media Links" name="socialMedia" />
                </div>
              </div>

              <div className="form-section1">
                <h3>Payment & Billing</h3>

                <div className="personal-info-sec">
                  <TextInput title="Bank Name" name="bankName" />
                  <TextInput
                    title="Bank Account Number"
                    name="bankAccountNumber"
                  />
                  <TextInput
                    title="Bank Account Recipient Name"
                    name="bankRecipientName"
                  />
                  <TextInput title="Mobile Money Number" name="momoNumber" />

                  <TextInput
                    title="Mobile Money Recipient Name"
                    name="momoRecipientName"
                  />
                </div>
              </div>

              <div className="form-section1">
                <h3>Document Upload</h3>

                <div className="personal-info-sec-doc">
                  <div>
                    <div className="vd-doc-title">Business License</div>
                    <div className="vd-doc"></div>
                  </div>

                  <div>
                    <div className="vd-doc-title">
                      Valid ID of Contact Person
                    </div>
                    <div className="vd-doc"></div>
                  </div>
                </div>
              </div>

              {!(status == "APPROVED" || status =="DENIED") && (
                <div className="buttons">
                  <button className="btn-cancel">Deny Approval</button>
                  <button className="btn-create">Approve Application</button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
