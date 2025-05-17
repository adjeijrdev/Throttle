import { useState } from "react";
import "./Stepper.module.css";

//import images
import LeftSVG from "../Assets/icons/Left.png";
import rightSVG from "../Assets/icons/right-svg.png";
import check from "../Assets/icons/Check.png";

const steps = [
  "Business Info",
  "Contact Details",
  "Payment & Billing",
  "Document Uploads",
  "Account Details",
];

const Stepper = ({ name }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Business info
    businessname: "",
    businessaddress: "",
    businesstype: "",
    country: "",
    regnumber: "",
    years: "",

    // Contact details
    vendorname: "",
    email: "",
    phone: "",
    website: "",

    // Payment&Billing
    bankname: "",
    momoname: "",
    banknumber: "",
    momonumber: "",

    // Document Uploads
    additionalDocs: [],

    // Account details
    accountemail: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (name === "additionalDocs") {
        setFormData((prev) => ({
          ...prev,
          [name]: Array.from(files),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send data to your API
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Registration process as a {name} </h2>

      <div className="stepper">
        {steps.map((label, index) => (
          <div className="step-item" key={index}>
            <div
              className={`step-circle ${
                index === currentStep
                  ? "active"
                  : index < currentStep
                  ? "completed"
                  : ""
              }`}
            >
              {index < currentStep ? <img src={check} /> : index + 1}
            </div>
            <p className="step-label">{label}</p>
          </div>
        ))}
      </div>

      <div className="form-step">
        {currentStep === 0 && (
          <div className="form-grid">
            <div className="form-group">
              <label>Business Name</label>
              <input
                type="text"
                name="businessname"
                value={formData.businessname}
                onChange={handleChange}
                placeholder="business name"
              />
            </div>
            <div className="form-group">
              <label>Business Address</label>
              <input
                type="text"
                name="businessaddress"
                value={formData.businessaddress}
                onChange={handleChange}
                placeholder="address"
              />
            </div>
            <div className="form-group">
              <label>Business Type (e.g. Electronics, Clothing)</label>
              <input
                type="text"
                name="businesstype"
                value={formData.businesstype}
                onChange={handleChange}
                placeholder="business type"
              />
            </div>
            <div className="form-group">
              <label>Country & City of Operation</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="country"
              />
            </div>
            <div className="form-group">
              <label>Business Registration Number</label>
              <input
                type="text"
                name="regnumber"
                value={formData.regnumber}
                onChange={handleChange}
                placeholder="number"
              />
            </div>
            <div className="form-group">
              <label>Years in Operation</label>
              <input
                type="text"
                name="years"
                value={formData.years}
                onChange={handleChange}
                placeholder="year"
              />
            </div>
          </div>
        )}
        {/* step 2- Contact Details */}
        {currentStep === 1 && (
          <div className="form-grid">
            <div className="form-group">
              <label> Name</label>
              <input
                type="text"
                name="vendorname"
                value={formData.vendorname}
                onChange={handleChange}
                placeholder="name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="number"
              />
            </div>
            <div className="form-group">
              <label>Business Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="link"
              />
            </div>
          </div>
        )}

        {/* Step 3 - Payment & Billing */}
        {currentStep === 2 && (
          <div className="form-grid">
            <div className="form-group">
              <label>Bank Name</label>
              <input
                type="text"
                name="bankname"
                value={formData.bankname}
                onChange={handleChange}
                placeholder="bank name"
              />
            </div>
            <div className="form-group">
              <label>Mobile Money Name</label>
              <input
                type="text"
                name="momoname"
                value={formData.momoname}
                onChange={handleChange}
                placeholder="momo name"
              />
            </div>
            <div className="form-group">
              <label>Bank Account Number</label>
              <input
                type="text"
                name="banknumber"
                value={formData.banknumber}
                onChange={handleChange}
                placeholder=" account number"
              />
            </div>
            <div className="form-group">
              <label>Mobile Money Number</label>
              <input
                type="text"
                name="momonumber"
                value={formData.momonumber}
                onChange={handleChange}
                placeholder="momo number"
              />
            </div>
          </div>
        )}

        {/* Step 4 - Document Uploads */}
        {currentStep === 3 && (
          <div className="form-grid_document">
            <label>Additional Documents</label>
            <div className="form-group document-upload">
              <div className="upload-area">
                <input
                  type="file"
                  id="additionalDocs"
                  name="additionalDocs"
                  onChange={handleChange}
                  accept="image/*,.pdf"
                  multiple
                  className="file-input"
                />
                <label htmlFor="additionalDocs" className="upload-label">
                  <span>Click to upload</span>
                  <p>Multiple files allowed</p>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 5 - Account Details */}
        {currentStep === 4 && (
          <div className="form__grid">
            <div className="form-group_vehicle">
              <label>Account Email</label>
              <input
                type="text"
                name="accountemail"
                value={formData.accountemail}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group_vehicle">
              <label>Password</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
              />
            </div>
            <div className="form-group_vehicle">
              <label>Confirm Password</label>
              <input
                type="text"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            </div>
          </div>
        )}

        {/* You can duplicate the logic above for step 1, 2, 3, 4 content */}
      </div>

      <div className="buttons">
        {currentStep > 0 && (
          <div className="btn-outline" onClick={prevStep}>
            <img src={LeftSVG} alt="left" /> Previous
          </div>
        )}
        {currentStep < steps.length - 1 ? (
          <div className="btn-filled" onClick={nextStep}>
            Next <img src={rightSVG} alt="right" />
          </div>
        ) : (
          <button className="btn-filled" onClick={() => alert("Submitted!")}>
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default Stepper;
