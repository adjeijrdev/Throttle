import { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import style from "./RiderStepper.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RiderSchema } from "../items/RiderSchema";

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
    resolver: zodResolver(RiderSchema),
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
    let isValid = false;

    // Validate current step fields before proceeding
    switch (currentStep) {
      case 0: // Personal Info
        isValid = await trigger([
          "fullName",
          "gender",
          "dob",
          "idType",
          "licenseNumber",
          "idNumber",
        ]);
        break;
      case 1: // Contact Details
        isValid = await trigger([
          "email",
          "phone",
          "emergencyContactName",
          "emergencyPhone",
        ]);
        break;
      case 2: // Vehicle Details
        isValid = await trigger(["vehicleType", "vehicleRegNumber"]);
        break;
      case 3: // Payment
        isValid = await trigger([
          "bankName",
          "momoName",
          "bankNumber",
          "momoNumber",
        ]);
        break;
      case 4: // Documents
        isValid = await trigger(["licenseImage", "idImage"]);
        break;
      default:
        isValid = true;
    }

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  // Watch files for preview
  const licenseImage = watch("licenseImage");
  const idImage = watch("idImage");

  //form functions
  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;

  //   if (type === "file") {
  //     if (name === "additionalDocs") {
  //       setFormData((prev) => ({
  //         ...prev,
  //         [name]: Array.from(files),
  //       }));
  //     } else {
  //       setFormData((prev) => ({
  //         ...prev,
  //         [name]: files[0],
  //       }));
  //     }
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);
  //   // Here you would typically send data to your API
  // };

  // const nextStep = () => {
  //   if (currentStep < steps.length - 1) {
  //     setCurrentStep((prev) => prev + 1);
  //   }
  // };

  // const prevStep = () => {
  //   if (currentStep > 0) {
  //     setCurrentStep((prev) => prev - 1);
  //   }
  // };

  // // Image Upload - First (0)
  // const [image, setImage] = useState(null);
  // const fileInputRef = useRef(null);

  // const handleImage = (file) => {
  //   if (file && file.type.startsWith("image/")) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setImage({ file, url: imageUrl });
  //   }
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   if (e.dataTransfer.files.length > 0) {
  //     handleImage(e.dataTransfer.files[0]);
  //   }
  // };

  // const handleFileInputChange = (e) => {
  //   if (e.target.files.length > 0) {
  //     handleImage(e.target.files[0]);
  //   }
  // };

  // const openFileDialog = () => {
  //   fileInputRef.current.click();
  // };

  // // Image Upload - Second (1)
  // const [image1, setImage1] = useState(null);
  // const fileInputRef1 = useRef(null);

  // const handleImage1 = (file) => {
  //   if (file && file.type.startsWith("image/")) {
  //     const imageUrl1 = URL.createObjectURL(file);
  //     setImage1({ file, url: imageUrl1 });
  //   }
  // };

  // const handleDrop1 = (e) => {
  //   e.preventDefault();
  //   if (e.dataTransfer.files.length > 0) {
  //     handleImage1(e.dataTransfer.files[0]);
  //   }
  // };

  // const handleFileInputChange1 = (e) => {
  //   if (e.target.files.length > 0) {
  //     handleImage1(e.target.files[0]);
  //   }
  // };

  // const openFileDialog1 = () => {
  //   fileInputRef1.current.click();
  // };

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
              {index < currentStep ? <img src={check} /> : index + 1}
            </div>
            <p className={style["step-label"]}>{label}</p>
          </div>
        ))}
      </div>
      <div className={style["form-input-container"]}>
        <div className={style["form-step"]}>
          {currentStep === 0 && (
            <div className={style["form-grid"]}>
              <div className={style["form-group"]}>
                <label>
                  Full name<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  placeholder="business name"
                  required
                />
                {errors.fullName && (
                  <p className={style.errorMessage}>
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className={style["form-flex"]}>
                <label>
                  Gender<sup>*</sup>
                </label>
                <div className={style.radio}>
                  <input
                    type="radio"
                    value="male"
                    id="male"
                    {...register("gender")}
                  />
                  <label htmlFor="male"> Male </label>
                  <input
                    type="radio"
                    value="female"
                    id="female"
                    {...register("gender")}
                  />
                  <label htmlFor="female"> Female </label>
                </div>
                {errors.gender && (
                <p className={style.errorMessage}>{errors.gender.message}</p>
              )}
              </div>
              
              <div className={style["form-group"]}>
                <div className={style.calendar}>
                  <label>
                    Date of Birth<sup>*</sup>{" "}
                  </label>
                  <input
                    type="date"
                    {...register("dob", { valueAsDate: true })}
                    placeholder="Date of Birth"
                  />
                  <span>
                    <img src={Calendar} alt="calendar" />
                  </span>
                </div>
                 {errors.dob && (
                <p className={style.errorMessage}>{errors.dob.message}</p>
              )}
              </div>
             
              <div className={style["form-group"]}>
                <label>
                  ID Type<sup>*</sup>
                </label>
                <div className={style.option_container}>
                  <select {...register("idType")}>
                    <option value="">Choose ID type</option>
                    <option value="Driver's License">Driver's License</option>
                    <option value="Voter's ID">Voter's ID</option>
                  </select>
                </div>
                 {errors.idType && (
                <p className={style.errorMessage}>{errors.idType.message}</p>
              )}
              </div>
             
              <div className={style["form-group"]}>
                <label>
                  Driver License Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("licenseNumber")}
                  placeholder="License Number"
                />
                {errors.licenseNumber && (
                <p className={style.errorMessage}>
                  {errors.licenseNumber.message}
                </p>
              )}
              </div>
              
              <div className={style["form-group"]}>
                <label>
                  ID Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("idNumber")}
                  placeholder="ID Number"
                />
                {errors.idNumber && (
                <p className={style.errorMessage}>{errors.idNumber.message}</p>
              )}
              </div>
              
            </div>
          )}
          {/* step 2- Contact Details */}
          {currentStep === 1 && (
            <div className={style["form-grid"]}>
              <div className={style["form-group"]}>
                <label>
                  {" "}
                  Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Name"
                  required
                />
                 {errors.name && (
                <p className={style.errorMessage}>{errors.name.message}</p>
              )}
              </div>
             
              <div className={style["form-group"]}>
                <label>
                  Email<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("email")}
                  placeholder="Email"
                  required
                />
                {errors.email && (
                <p className={style.errorMessage}>{errors.email.message}</p>
              )}
              </div>
              
              <div className={style["form-group"]}>
                <label>
                  Phone Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Phone number"
                  required
                />
                {errors.phone && (
                <p className={style.errorMessage}>{errors.phone.message}</p>
              )}
              </div>
              
              <div className={style["form-group"]}>
                <label>
                  Emergency Contact Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("emergencyContactName")}
                  placeholder="Emergency Contact Name"
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
                  placeholder="Emergency Email"
                />
                 {errors.emergencyEmail && (
                <p className={style.errorMessage}>
                  {errors.emergencyEmail.message}
                </p>
              )}
              </div>
             
              <div className={style["form-group"]}>
                <label>
                  Emergency contact number<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("emergencyPhone")}
                  placeholder="Emergency Contact"
                />
                 {errors.emergencyPhone && (
                <p className={style.errorMessage}>
                  {errors.emergencyPhone.message}
                </p>
              )}
              </div>
             
            </div>
          )}
          {currentStep === 2 && (
            <div className={style["form__grid1"]}>
              {/* <label>Account Email</label> */}
              <div className={style["form-group"]}>
                <label>
                  Vehicle Type and Model<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("vehicleType")}
                  placeholder="Enter Vehicle Model"
                />
                 {errors.vehicleType && (
                <p className={style.errorMessage}>
                  {errors.vehicleType.message}
                </p>
              )}
              </div>
             
              <div className={style["form-group"]}>
                <label>
                  Vehicle Registration Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("vehicleRegNumber")}
                  placeholder="Number"
                />
                {errors.vehicleRegNumber && (
                <p className={style.errorMessage}>
                  {errors.vehicleRegNumber.message}
                </p>
              )}
              </div>
              
            </div>
          )}
          {/* Step 3 - Payment & Billing */}
          {currentStep === 3 && (
            <div className={style["form-grid"]}>
              <div className={style["form-group"]}>
                <label>
                  Bank Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  {...register("bankName")}
                  placeholder="bank name"
                />
              </div>
              {errors.bankName && (
                <p className={style.errorMessage}>{errors.bankName.message}</p>
              )}
              <div className={style["form-group"]}>
                <label>
                  Mobile Money Name<sup>*</sup>
                </label>
                <input type="text" {...register("momoName")} placeholder="Enter momo name"/>
                {errors.momoName && (
                <p className={style.errorMessage}>{errors.momoName.message}</p>
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
              
              <div className={style["form-group"]}>
                <label>Mobile Money Number</label>
                <input
                  type="text"
                  {...register("momoNumber")}
                  placeholder="momo number"
                />
                {errors.momoNumber && (
                <p className={style.errorMessage}>
                  {errors.momoNumber.message}
                </p>
              )}
              </div>
              
            </div>
          )}

          {/* Step 4 - Document Uploads */}
          {currentStep === 4 && (
            <div className={style.gridbox}>
              <div className={style.grid1}>
                <div className={style["upload-container"]}>
                  <p>
                    Drivers License<sup>*</sup>
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
                    National ID/Valid ID<sup>*</sup>
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
                <p className={style.errorMessage}>{errors.password.message}</p>
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
