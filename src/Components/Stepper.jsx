import { useState } from "react";
import "./Stepper.css";

const steps = [
  "Business Info",
  "Contact Details",
  "Payment & Billing",
  "Document Uploads",
  "Account Details",
];

const Stepper = () => {
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
      <h2 className="form-title">Registration process as a Vendor </h2>

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
