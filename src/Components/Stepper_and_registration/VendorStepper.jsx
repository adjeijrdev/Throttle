// VendorStepper.jsx
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import './VendorStepper.module.css';

const steps = [
  'Business Info',
  'Contact Details',
  'Payment & Billing',
  'Document Uploads',
  'Account Details'
];

export default function VendorStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm();

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const onSubmit = data => {
    if (currentStep === steps.length - 1) {
      console.log('Final Data:', data);
    } else {
      nextStep();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="stepper-container">
        <h2 className="stepper-title">Registration process as a Vendor</h2>
        <div className="stepper">
          {steps.map((label, index) => (
            <div className={`step-item ${index <= currentStep ? 'active' : ''}`} key={index}>
              <div className="step-circle">{index + 1}</div>
              <div className="step-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="step-form">
          {currentStep === 0 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Business Name</label>
                <input {...methods.register('businessName')} type="text" placeholder="business name" />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Email</label>
                <input {...methods.register('email')} type="email" placeholder="email" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Account Number</label>
                <input {...methods.register('accountNumber')} type="text" placeholder="account number" />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Upload Document</label>
                <input {...methods.register('document')} type="file" />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Username</label>
                <input {...methods.register('username')} type="text" placeholder="username" />
              </div>
            </div>
          )}
        </div>

        <div className="step-buttons">
          {currentStep > 0 && <button type="button" onClick={prevStep} className="prev-btn">Previous</button>}
          <button type="submit" className="next-btn">{currentStep === steps.length - 1 ? 'Submit' : 'Next →'}</button>
        </div>
      </form>
    </FormProvider>
  );
}
