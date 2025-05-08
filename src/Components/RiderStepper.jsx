import { useState } from "react";
import "./RiderStepper.css";

const steps = [
  "Personal Info",
  "Contact Details",
  "Vehicle Details",
  "Payment & Billing",
  "Document Uploads",
  "Account Details",
];

const RiderStepper = ({ name }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
     // Personal Info
     fullName: "",
     gender: "",
     dob: "",
     idType: "",
     licenseNumber: "",
     nationalId: "",

     // Contact Details
    mobilenumber: "",
    address: "",
    altPhone: "",
    emergencyname: "",
    email: "",
    emergencycontact: "",

    // Vehicle details
    vehicletype: "",
    registrationnumber: "",
    area: "",
  
    // Payment & Billing
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
        setFormData(prev => ({
          ...prev,
          [name]: Array.from(files)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: files[0]
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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
      <h2 className="form-title">Registration process as a { name } </h2>

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
              {index < currentStep ? "✔" : index + 1}
            </div>
            <p className="step-label">{label}</p>
          </div>
        ))}
      </div>

      <div className="form-step">
        {currentStep === 0 && (
          <div className="form-grid">
            <div className="form-group">
              <label>FullName</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="fullname" 
                required
              />
            </div>
            <div className="form-group">
            <label>Gender</label>
              <div className="radio-group">
              <label class="radio-option_gender">
        <input type="radio" 
        name="gender"
         value = "male"
         checked ={formData.gender === "male"}
         onChange={handleChange}
         required/><span className="radio-label"> Male</span>
      </label>
      <label class="radio-option_gender">
      <input type="radio" 
        name="gender"
         value="female"
         checked={formData.gender === "female"}
         onChange={handleChange} required/><span className="radio-label"> Female</span>
      </label>
              </div>
            </div>
  
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" 
              name="dob"
              value={formData.dob} 
              onChange={handleChange}
              placeholder="DD/MM/YYYY"/>
            </div>
            <div className="form-group">
              <label>ID type</label>
              <input type="text" 
              name="idType"
              value={formData.idType}
              onChange={handleChange}
              placeholder="choose ID type " />
            </div>
            <div className="form-group">
              <label>Driver's License Number</label>
              <input type="text"
              name="licenseNumber" 
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="number" />
            </div>
            <div className="form-group">
              <label>National ID</label>
              <input type="text"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
               placeholder="number" />
            </div>
          </div>
        )}

              {/* Step 2 - Contact Details */}
              {currentStep === 1 && (
          <div className="form-grid">
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="text" 
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={handleChange}
              placeholder="number" />
            </div>
            <div className="form-group">
              <label>Residential Address</label>
              <input type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
               placeholder="address" />
            </div>
            <div className="form-group">
              <label>Additional Mobile Number(optional)</label>
              <input type="text"
              name="altPhone" 
              value={formData.altPhone}
              onChange={handleChange}
              placeholder="number" />
            </div>
            <div className="form-group">
              <label>Emergency Contact Name</label>
              <input type="text"
              name="emergencyname"
              value={formData.emergencyname}
              onChange={handleChange}
               placeholder="name" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
               placeholder="email" />
            </div>
            <div className="form-group">
              <label>Emergency Contact Number</label>
              <input type="text"
              name="emergencycontact"
              value={formData.emergencycontact}
              onChange={handleChange}
               placeholder="contact" />
            </div>
          </div>
        )}

           {/* Step 3 - Vehicle Details */}
           {currentStep === 2 && (
          <div className="form__grid">
            <div className="form-group_vehicle">
              <label>Vehicle Type and Model</label>
              <input type="text" 
              name="vehicletype"
              value={formData.vehicletype}
              onChange={handleChange}
              placeholder="model" />
            </div>
            <div className="form-group_vehicle">
              <label>Vehicle Registration Number</label>
              <input type="text"
              name="registrationnumber"
              value={formData.registrationnumber}
              onChange={handleChange}
               placeholder="number" />
            </div>
            <div className="form-group_vehicle">
              <label>Area of Operation</label>
              <input type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
               placeholder="Choose Area of Operation" />
            </div>
          </div>
        )}

  {/* Step 4 - Payment & Billing */}
  {currentStep === 3 && (
          <div className="form-grid">
            <div className="form-group">
              <label>Bank Name</label>
              <input type="text"
              name="bankname"
              value={formData.bankname}
              onChange={handleChange}
               placeholder="bank name" />
            </div>
            <div className="form-group">
              <label>Mobile Money Name</label>
              <input type="text"
              name="momoname"
              value={formData.momoname}
              onChange={handleChange}
               placeholder="momo name" />
            </div>
            <div className="form-group">
              <label>Bank Account Number</label>
              <input type="text"
              name="banknumber"
              value={formData.banknumber}
              onChange={handleChange}
              placeholder=" account number" />
            </div>
            <div className="form-group">
              <label>Mobile Money Number</label>
              <input type="text"
              name="momonumber"
              value={formData.momonumber}
              onChange={handleChange}
               placeholder="momo number" />
            </div>
          </div>
        )}

      
{/* Step 5 - Document Uploads */}
{currentStep === 4 && ( 
  <div className="form-grid">
    <div className="form-group document-upload">
      <label>Driver's License</label>
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
    <div className="form-group document-upload">
      <label>National ID</label>
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

 {/* Step 6 - Account Details */}
 {currentStep === 5 && (
          <div className="form__grid">
            <div className="form-group_vehicle">
              <label>Account Email</label>
              <input type="text" 
              name="accountemail"
              value={formData.accountemail}
              onChange={handleChange}
              placeholder="Enter your email" />
            </div>
            <div className="form-group_vehicle">
              <label>Password</label>
              <input type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password" />
            </div>
            <div className="form-group_vehicle">
              <label>Confirm Password</label>
              <input type="text" 
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              placeholder="Confirm Password" />
            </div>
          </div>
        )}



        {/* You can duplicate the logic above for step 1, 2, 3, 4 content */}
      </div>

      <div className="buttons">
        {currentStep > 0 && (
          <button className="btn-outline" onClick={prevStep}>
            ← Previous
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button className="btn-filled" onClick={nextStep}>
            Next →
          </button>
        ) : (
          <button className="btn-filled" onClick={() => alert("Submitted!")}>
            Register
          </button>
        )}
      </div>
    </form>
  );
};

export default RiderStepper;
