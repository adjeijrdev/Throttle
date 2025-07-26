import { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import style from "./ThirdPartyStepper.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ThirdPartySchema } from "../items/ThirdPartySchema";

//Importing in-application components
import DropDownInput from "../Components/DropDownMenuInput/DropDownInput";

//import images
import LeftSVG from "../Assets/icons/Left.png";
import rightSVG from "../Assets/icons/right-svg.png";
import check from "../Assets/icons/Check.png";
import SuccessfulRegistration from "../Modals/SuccessfulRegistration";
import img from "../Assets/icons/img.png";
import padLock from "../Assets/input_icons/padlock.png";
import EmailIcon from "../Assets/input_icons/emailuser.png";
import Calendar from "../Assets/icons/Calendar.png";

const steps = [
  "Personal info",
  "Contact Details",
  "Vehicle Details",
  "Payment & Billing",
  "Document Uploads",
  "Account Details",
];

const Stepper = ({ name }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(ThirdPartySchema),
    mode: "onChange",
  });

  //const password visibility toggle functions
  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleVisibility1 = () => {
    setShowPassword1((prev) => !prev);
  };

  //modal state { successful Modal}
  const toggleModalOpen = () => {
    setIsOpen(!isOpen);
  };
  // File input refs
  const licenseInputRef = useRef(null);
  const idInputRef = useRef(null);

  // Handle file drops
  const handleFileDrop = (fieldName, e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setValue(fieldName, file, { shouldValidate: true });
      }
    }
  };

  // Handle file selection
  const handleFileSelect = (fieldName, e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setValue(fieldName, file, { shouldValidate: true });
    }
  };

  // Open file dialog
  const openFileDialog = (ref) => ref.current.click();

  // Form submission
  const onSubmit = (data) => {
    console.log("Form data:", data);
    toggleModal();
  };

  // Step navigation with validation
const nextStep = async () => {
  if (currentStep < steps.length - 1) {
    setCurrentStep(prev => prev + 1);
  }
};

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  // Watch files for preview
  const licenseImage = watch("licenseImage");
  const idImage = watch("idImage");

  return (
    <form onSubmit={handleSubmit} className={style["form-container"]}>
      <h2 className={style["form-title"]}>Registration process as a {name}</h2>

      <div className={style["stepper"]}>
        {steps.map((label, index) => (
          <div className={style["step-item"]} key={index}>
            <div
              className={`${style["step-circle"]} ${
                index === currentStep
                  ? style.active
                  : index < currentStep
                  ? style.completed
                  : ""
              }`}
            >
              { index < currentStep ? <img src={check} /> : index + 1}
            </div>
            <p className={style["step-label"]}>{label}</p>
          </div>
        ))}
      </div>
      <div className={style["form-input-container"]}>
        <div className={style["form-step"]}>
          { /* Step 1 - Personal Info */}
          {currentStep === 0 && (
            < div className={style["form-grid"]}>
              <div className={style["form-group"]} >
                <label>
                  Company Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("companyName")}
                  placeholder="business name"
                  required
                />
                {errors.companyName && (
                  <p className={style.errorMessage}>
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className={style["form-group"]}>
                <label>
                  Street Address<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("streetAddress") }
                  placeholder="business name"
                  required
                />
                {errors.streetAddress && (
                  <p className={style.errorMessage}>{errors.streetAddress.message}</p>
                )}
              </div>

              <div className={style["form-group"]}>
                <div className={style.calendar}>
                  <label>
                    Business Registration Number<sup>*</sup>{" "}
                  </label>
                  <input
                    type="text"
                    {...register("registrationNumber")}
                    placeholder="Registration Number"
                    required
                  />
                </div>
                {errors.registrationNumber && (
                  <p className={style.errorMessage}>{errors.registrationNumber.message}</p>
                )}
              </div>

              <div className={style["form-group"]}>
                <label>
                  GPS Address<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("gpsAddress")}
                  placeholder="License Number"
                />
                {errors.gpsAddress && (
                  < p className={style.errorMessage}>
                    {errors.gpsAddress.message}
                  </p>
                )}
              </div>

              <div className={style["form-group"]}>
                <label>
                  Region<sup>*</sup>
                </label>
                <div className={style.option_container}>
                  <select {...register("region")}>
                    <option value="">Choose Region</option>
                    <option value="Ahafo">Ahafo</option>
                    <option value="Ashanti">Ashanti</option>
                    <option value="Bono">Bono</option>
                    <option value="Bono East">Bono East</option>
                    <option value="Central">Central</option>
                    <option value="Eastern">Eastern</option>
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="North East">North East</option>
                    <option value="Northern">Northern</option>
                    <option value="Oti">Oti</option>
                    <option value="Savannah">Savannah</option>
                    <option value="Upper East">Upper East</option>
                    <option value="Upper West">Upper West</option>
                    <option value="Volta">Volta</option>
                    <option value="Western">western</option>
                    <option value="Western North">Western North</option>
                  </select>
                </div>

                {errors.region && (
                  <p className={style.errorMessage}>{errors.region.message}</p>
                )}
              </div>

              <div className={style["form-group"]}>
                <label>
                  Years in Operation<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("yearsInOperation")}
                  placeholder="ID Number"
                />
                {errors.yearsInOperation && (
                  <p className={style.errorMessage}>
                    {errors.yearsInOperation.message}
                  </p>
                )}
              </div>
            </div>
          )}
          {/* step 2- Contact Details */}
          {currentStep === 1 && (
            <div className={style["form-grid"]}>
              <div className={style["form-group"]}>
                <label>
  
                  Primary Contact Person<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("primaryContact")}
                  placeholder="Name"
                  required
                />
                {errors.primaryContact && (
                  <p className={style.errorMessage}>{errors.primaryContact.message}</p>
                )}
              </div>

              <div className={style["form-group"]}>
                <label>
                  Phone Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("email")}
                  placeholder="contact"
                  required
                />
                {errors.email && (
                  <p className={style.errorMessage}>{errors.email.message}</p>
                )}
              </div>

              <div className={style["form-group"]}>
                <label>
                  Position/Role(Operations Manager)<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Position"
                  required
                />
                {errors.phone && (
                  <p className={style.errorMessage}>{errors.phone.message}</p>
                )}
              </div>

              <div className={style["form-group"]}>
                <label>
                  Ghana Card Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("emergencyContactName")}
                  placeholder="number"
                />
                {errors.emergencyContactName && (
                  <p className={style.errorMessage}>
                    {errors.emergencyContactName.message}
                  </p>
                )}
              </div>

              <div className={style["form-group"]}>
                <label>
                  Email Address<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("emergencyEmail")}
                  placeholder="Email"
                />
                {errors.emergencyEmail && (
                  <p className={style.errorMessage}>
                    {errors.emergencyEmail.message}
                  </p>
                )}
              </div>

              <div className={style["form-group"]}>
                <label>
                  Office Line<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("emergencyPhone")}
                  placeholder="Contact"
                />
                {errors.emergencyPhone && (
                  <p className={style.errorMessage}>
                    {errors.emergencyPhone.message}
                  </p>
                )}
              </div>
            </div>
          )}
           {/* Step 3 - Document Uploads */}
          {currentStep === 2 && (
            <div className={style["form__grid1"]}>
              {/* <label>Account Email</label> */}
              <div className={style["form-group"]}>
                <label>
                  Bank Name
                  {/* <sup>*</sup> */}
                </label>
                <input
                  type="text"
                  {...register("vehicleType")}
                  placeholder="Bank name"
                />
                {errors.vehicleType && (
                  <p className={style.errorMessage}>
                    {errors.vehicleType.message}
                  </p>
                )}
              </div>

              <div className={style["form-group"]}>
                <label>
                  Mobile Money Name
                  {/* <sup>*</sup> */}
                </label>
                <input
                  type="text"
                  {...register("vehicleRegNumber")}
                  placeholder="account name"
                />
                {errors.vehicleRegNumber && (
                  <p className={style.errorMessage}>
                    {errors.vehicleRegNumber.message}
                  </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>
                  Bank Account Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("bankName")}
                  placeholder="account name"
                />
              </div>
              {errors.bankName && (
                <p className={style.errorMessage}>{errors.bankName.message}</p>
              )}
              <div className={style["form-group"]}>
                <label>
                  Mobile Money Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("momoName")}
                  placeholder="momo number"
                />
                {errors.momoName && (
                  <p className={style.errorMessage}>
                    {errors.momoName.message}
                  </p>
                )}
              </div>

              <div className={style["form-group"]}>
                <label>
                  Bank Account Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("bankNumber")}
                  placeholder=" account number"
                />
                {errors.bankNumber && (
                  <p className={style.errorMessage}>
                    {errors.bankNumber.message}
                  </p>
                )}
              </div>
            </div>
          )}
          {/* Step 4 - Document Uploads */}
          {currentStep === 3 && (
            <div className={style.gridbox}>
              <div className={style.grid1}>
                <div className={style["upload-container"]}>
                  <p>
                    Business Registration Certificate<sup>*</sup>
                  </p>
                  <div
                    className={style["drop-box"]}
                    onDrop={(e) => handleFileDrop("licenseImage", e)}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => openFileDialog(licenseInputRef)}
                  >
                    {licenseImage ? (
                      <img
                        src={URL.createObjectURL(licenseImage)}
                        alt="License preview"
                        className={style["preview-image"]}
                      />
                    ) : (
                      <img src={img} alt="Upload placeholder" />
                    )}
                  </div>

                  <button
                    type="button"
                    className={style["upload-button"]}
                    onClick={openFileDialog}
                  >
                    Upload
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={licenseInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileSelect("licenseImage", e)}
                  />
                  {errors.licenseImage && (
                    <p className={style.errorMessage}>
                      {errors.licenseImage.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={style.grid2}>
                <div className={style["upload-container"]}>
                  <p>
                    Business Logo<sup>*</sup>
                  </p>
                  <div
                    className={style["drop-box"]}
                    onDrop={(e) => handleFileDrop("idImage", e)}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={() => openFileDialog(idInputRef)}
                  >
                    {idImage ? (
                      <img
                        src={URL.createObjectURL(idImage)}
                        alt="ID Preview"
                        className={style["preview-image"]}
                      />
                    ) : (
                      <img src={img} alt="Uplaod placeholder" />
                    )}
                  </div>

                  <button
                    type="button"
                    className={style["upload-button"]}
                    onClick={() => openFileDialog(idInputRef)}
                  >
                    Upload
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={idInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileSelect("idImage", e)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5 - Account Details */}
          {currentStep === 5 && (
            <div className={style["form__grid"]}>
              <label>
                Password<sup>*</sup>
              </label>
              <div className={style["Account-details-password"]}>
                <img src={padLock} alt="padlock" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="password"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className={style["toggle - btn"]}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                {errors.password && (
                  <p className={style.errorMessage}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <label>
                Confirm Password<sup>*</sup>
              </label>
              <div className={style["Account-details-password"]}>
                <img src={padLock} alt="padlock" />
                <input
                  type={showPassword1 ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={toggleVisibility1}
                  className={style["toggle - btn"]}
                >
                  {showPassword1 ? <FaEye /> : <FaEyeSlash />}
                </button>
                {errors.confirmPassword && (
                  <p className={style.errorMessage}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* You can duplicate the logic above for step 1, 2, 3, 4 content */}
        </div>
      </div>
      <div className={style.buttons}>
        {currentStep > 0 && (
          <div className={style["btn-outline"]} onClick={prevStep}>
            <img src={LeftSVG} className={style.btn} alt="left" /> Previous
          </div>
        )}
        {currentStep < steps.length - 1 ? (
          <div className={style["btn-filled"]} onClick={nextStep}>
            Next <img className={style.btn} src={rightSVG} alt="right" />
          </div>
        ) : (
          <button className={style["btn-filled"]} onClick={toggleModalOpen}>
            Register
          </button>
        )}
      </div>
      <SuccessfulRegistration isOpen={isOpen} onClose={toggleModalOpen} />
    </form>
  );
};

export default Stepper;
