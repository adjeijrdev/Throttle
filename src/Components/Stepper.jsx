import { useState } from "react";
import "./Stepper.css";

const steps = [
  "Business Info",
  "Contact Details",
  "Payment & Billing",
  "Document Uploads",
  "Account Details",
];

const Stepper = ({ name }) => {
  const [currentStep, setCurrentStep] = useState(0);

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
    <div className="form-container">
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
              <label>Business Name</label>
              <input type="text" placeholder="business name" />
            </div>
            <div className="form-group">
              <label>Business Address</label>
              <input type="text" placeholder="address" />
            </div>
            <div className="form-group">
              <label>Business Type (e.g. Electronics, Clothing)</label>
              <input type="text" placeholder="business type" />
            </div>
            <div className="form-group">
              <label>Country & City of Operation</label>
              <input type="text" placeholder="country" />
            </div>
            <div className="form-group">
              <label>Business Registration Number</label>
              <input type="text" placeholder="number" />
            </div>
            <div className="form-group">
              <label>Years in Operation</label>
              <input type="text" placeholder="year" />
            </div>
          </div>
        )}
{/* step 2- Contact Details */}
{currentStep === 1 && (
          <div className="form-grid">
            <div className="form-group">
              <label> Name</label>
              <input type="text" placeholder="name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" placeholder="email" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" placeholder="number" />
            </div>
            <div className="form-group">
              <label>Business Website</label>
              <input type="text" placeholder="link" />
            </div>
          </div>
        )}

        {/* Step 3 - Payment & Billing */}
  {currentStep === 2 && (
          <div className="form-grid">
            <div className="form-group">
              <label>Bank Name</label>
              <input type="text" placeholder="bank name" />
            </div>
            <div className="form-group">
              <label>Mobile Money Name</label>
              <input type="text" placeholder="momo name" />
            </div>
            <div className="form-group">
              <label>Bank Account Number</label>
              <input type="text" placeholder=" account number" />
            </div>
            <div className="form-group">
              <label>Mobile Money Number</label>
              <input type="text" placeholder="momo number" />
            </div>
          </div>
        )}


              
{/* Step 4 - Document Uploads */}
{currentStep === 3 && ( 
  <div className="form-grid">
    <div className="form-group document-upload">
      <label>Profile Photo</label>
      <div className="upload-area">
        <input 
          type="file" 
          id="profilePhoto" 
          accept="image/*" 
          className="file-input"
        />
        <label htmlFor="profilePhoto" className="upload-label">
          <span>Click to upload</span>
          <p>JPEG, PNG (Max 2MB)</p>
        </label>
      </div>
    </div>

    <div className="form-group document-upload">
      <label>Driver's License (Front)</label>
      <div className="upload-area">
        <input 
          type="file" 
          id="licenseFront" 
          accept="image/*,.pdf" 
          className="file-input"
        />
        <label htmlFor="licenseFront" className="upload-label">
          <span>Click to upload</span>
          <p>JPEG, PNG, PDF (Max 5MB)</p>
        </label>
      </div>
    </div>

    <div className="form-group document-upload">
      <label>Driver's License (Back)</label>
      <div className="upload-area">
        <input 
          type="file" 
          id="licenseBack" 
          accept="image/*,.pdf" 
          className="file-input"
        />
        <label htmlFor="licenseBack" className="upload-label">
          <span>Click to upload</span>
          <p>JPEG, PNG, PDF (Max 5MB)</p>
        </label>
      </div>
    </div>

    <div className="form-group document-upload">
      <label>Vehicle Insurance</label>
      <div className="upload-area">
        <input 
          type="file" 
          id="insurance" 
          accept="image/*,.pdf" 
          className="file-input"
        />
        <label htmlFor="insurance" className="upload-label">
          <span>Click to upload</span>
          <p>JPEG, PNG, PDF (Max 5MB)</p>
        </label>
      </div>
    </div>

    <div className="form-group document-upload">
      <label>Vehicle Registration</label>
      <div className="upload-area">
        <input 
          type="file" 
          id="registration" 
          accept="image/*,.pdf" 
          className="file-input"
        />
        <label htmlFor="registration" className="upload-label">
          <span>Click to upload</span>
          <p>JPEG, PNG, PDF (Max 5MB)</p>
        </label>
      </div>
    </div>

    <div className="form-group document-upload">
      <label>Additional Documents (Optional)</label>
      <div className="upload-area">
        <input 
          type="file" 
          id="additionalDocs" 
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
            <div className="form-group">
              <label>Account Email</label>
              <input type="text" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="text" placeholder="password" />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="text" placeholder="Confirm Password" />
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
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
