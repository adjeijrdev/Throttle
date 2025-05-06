import { useState } from "react";
import "./Stepper.css";

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
              <label>FullName</label>
              <input type="text" placeholder="fullname" />
            </div>
            <div className="form-group">
            <label>Gender</label>
              <div className="radio-group">
              <label class="radio-inline">
        <input type="radio" name="gender" value="male"/> Male
      </label>
      <label class="radio-inline">
        <input type="radio" name="gender" value="female"/> Female
      </label>
              </div>
            </div>
  
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" placeholder="DD/MM/YYYY" />
            </div>
            <div className="form-group">
              <label>ID type</label>
              <input type="text" placeholder="choose ID type " />
            </div>
            <div className="form-group">
              <label>Driver's License Number</label>
              <input type="text" placeholder="number" />
            </div>
            <div className="form-group">
              <label>National ID</label>
              <input type="text" placeholder="number" />
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

export default RiderStepper;
