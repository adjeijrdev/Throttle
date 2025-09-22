import { useState, useRef, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import style from "./ThirdPartyStepper.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ThirdPartySchema } from "../items/ThirdPartySchema";
import PhoneNumberInput from "./Phone/PhoneNumberInput";
import { BeatLoader } from "react-spinners";


import CustomSelector2 from "./form/selector/CustomSelecter2";

//list of the sixteen Regions in Ghana
import { Regions } from "../items/Ghana-regional-list";
import toast from "react-hot-toast";
//import images
import LeftSVG from "../Assets/icons/Left.png";
import rightSVG from "../Assets/icons/right-svg.png";
import check from "../Assets/icons/Check.png";
import SuccessfulRegistration from "../Modals/SuccessfulRegistration";
import img from "../Assets/icons/img.png";
import padLock from "../Assets/input_icons/padlock.png";
import EmailIcon from "../Assets/input_icons/emailuser.png";
import Calendar from "../Assets/icons/Calendar.png";
import { register3plAPI } from "../api/authentication";
import { useNavigate } from "react-router";

const steps = [
  "Personal info",
  "Contact Details",
  "Payment & Billings",
  "Document Uploads",
  "Account Details",
];

// Custom Toast Component
const CustomToast = ({ messages, onClose }) => {
  return (
    <div className={style.customToast}>
      <div className={style.toastContent}>
        <div className={style.toastHeader}>
          <strong>Please fill in all the fields:</strong>
          <button onClick={onClose} className={style.toastClose}>
            ×
          </button>
        </div>
        <h1>
          Kindly go through the form and fill all <br /> empty spaces
        </h1>
      </div>
    </div>
  );
};

const Stepper = ({ name }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessages, setToastMessages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control,
    trigger,
    getValues,
  } = useForm({
    resolver: zodResolver(ThirdPartySchema),
    mode: "all",
    reValidateMode: "onChange",
  });

 
  //const password visibility toggle functions
  const toggleVisibility = () => setShowPassword((prev) => !prev);
  const toggleVisibility1 = () => setShowPassword1((prev) => !prev);

  //modal state { successful Modal}
  const toggleModalOpen = () => setIsOpen((prev)=>!prev);

  
  const navigate = useNavigate();

  // Toast functions
  const showToastMessage = (messages) => {
    setToastMessages(messages);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 8000);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  // File input refs
  const licenseInputRef = useRef(null);
  const idInputRef = useRef(null);

  // Handle file drops
  const handleFileDrop = useCallback(
    (fieldName, e) => {
      e.preventDefault();
      if (e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          setValue(fieldName, file, { shouldValidate: true });
        }
      }
    },
    [setValue]
  );

  // Handle file selection
  const handleFileSelect = useCallback(
    (fieldName, e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        setValue(fieldName, file, { shouldValidate: true });
      }
    },
    [setValue]
  );

  // Open file dialog
  const openFileDialog = (ref) => ref.current?.click();

  // Form submission
  const onSubmit = async(data) => {

    const formData = new FormData();
  
     // Step 1: Business Info
    const businessInfo = {
      companyName: data.companyName,
      streetAddress: data.streetAddress,
      registrationNumber: data.registrationNumber,
      gpsAddress: data.gpsAddress,
      region: data?.region?.value,
      yearsInOperation: data.yearsInOperation || undefined,
     
    };
    formData.append("businessInfo", JSON.stringify(businessInfo));

    // Step 2: Contact Details
    const contactDetails = {
      name: data.primaryContact,
      email: data.email,
      phoneNumber: data.phoneNumber,
      additionalPhoneNumber: data.officeLine,
      position: data.position,
      ghanaCardNumber: data.ghanaCardNumber,
      password: data.password,
    };
    formData.append("contactDetails", JSON.stringify(contactDetails));

    const hasBankDetails =
      data?.financialDetails?.bankAccountDetails &&
      (data?.financialDetails?.bankAccountDetails?.bankName ||
        data?.financialDetails?.bankAccountDetails?.accountNumber ||
        data?.financialDetails?.bankAccountDetails?.recipientName);
    
    const hasMomoDetails =
      data?.financialDetails?.mobileMoneyAccount &&
      (data?.financialDetails?.mobileMoneyAccount?.phoneNumber ||
        data?.financialDetails?.mobileMoneyAccount?.recipientName);

    if (hasBankDetails || hasMomoDetails) {
      const financialDetails = {};

      const bank = data?.financialDetails?.bankAccountDetails;
      if (
        bank &&
        (bank?.bankName || bank?.accountNumber || bank?.recipientName)
      ) {
        const bankAccount = {
          bankName: bank?.bankName,
          accountNumber: bank?.accountNumber,
          recipientName: bank?.recipientName,
        };

        financialDetails.bankAccountDetails = bankAccount;
      }

      const momo = data?.financialDetails?.mobileMoneyAccount;
      if (momo && (momo?.recipientName || momo?.phoneNumber)) {
        const mobileMoneyAccount = {
          phoneNumber:momo.phoneNumber ,
          recipientName:momo.recipientName ,
        };
        financialDetails.mobileMoneyAccount = mobileMoneyAccount;
      }


      formData.append("financialDetails", JSON.stringify(financialDetails));
    }

       if (data.businessLogo) {
      formData.append("businessLogo", data.businessLogo);
    }
   

    if (data.registrationCertificate){
      formData.append("businessCertificate", data.registrationCertificate)
    }

       try {
          const result = await register3plAPI(formData);
    
          toast.success(result?.data?.message, {
            style: {
              border: "1px solid #17654F",
              // backgroundColor:"oklch(88.5% 0.062 18.334)",
              color: "black",
              fontSize: "16px",
              width: "500px",
            },
          });
    
          navigate("/");
        } catch (error) {
          toast.error(error?.message, {
            style: {
              border: "1px solid oklch(88.5% 0.062 18.334)",
              // backgroundColor:"oklch(88.5% 0.062 18.334)",
              color: "oklch(39.6% 0.141 25.723)",
              fontSize: "16px",
              width: "500px",
            },
          });
        }

    toggleModalOpen();

  };

  // Handle form submission with error toast
  const onError = (errors) => {
  
    const errorMessages = Object.values(errors).map((error) => error.message);

    if (errorMessages.length > 0) {
      showToastMessage(errorMessages);
    } else {
      showToastMessage(["Please fill all required fields correctly"]);
    }
  };

  // Simple step navigation without validation
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  // Watch files for preview
  const registrationCertificate= watch("registrationCertificate");
  const businessLogo = watch("businessLogo");

  return (
    <>
      {showToast && (
        <CustomToast messages={toastMessages} onClose={closeToast} />
      )}

      {/* Use handleSubmit with two parameters: onSubmit for success, onError for errors */}
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={style["form-container"]}
      >
        <h2 className={style["form-title"]}>
          Registration process as a {name}
        </h2>

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
                {index < currentStep ? (
                  <img src={check} alt="check" />
                ) : (
                  index + 1
                )}
              </div>
              <p className={style["step-label"]}>{label}</p>
            </div>
          ))}
        </div>

        <div className={style["form-input-container"]}>
          <div className={style["form-step"]}>
            {/* Step 1 - Personal Info */}
            {currentStep === 0 && (
              <div className={style["form-grid"]}>
                <div className={style["form-group"]}>
                  <label>
                    Company Name<sup style={{color:"red"}}>*</sup>
                  </label>
                  <input
                    type="text"
                    {...register("companyName")}
                    placeholder="business name"
                  />
                  {errors.companyName && (
                    <p className={style.errorMessage}>
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label>
                    Street Address<sup style={{color:"red"}}>*</sup>
                  </label>
                  <input
                    type="text"
                    {...register("streetAddress")}
                    placeholder="location"
                  />
                  {errors.streetAddress && (
                    <p className={style.errorMessage}>
                      {errors.streetAddress.message}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label>
                    Business Registration Number<sup style={{color:"red"}}>*</sup>
                  </label>
                  <input
                    type="text"
                    {...register("registrationNumber")}
                    placeholder="Registration Number"
                  />
                  {errors.registrationNumber && (
                    <p className={style.errorMessage}>
                      {errors.registrationNumber.message}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label>
                    GPS Address<sup style={{color:"red"}}>*</sup>
                  </label>
                  <input
                    type="text"
                    {...register("gpsAddress")}
                    placeholder="address"
                  />
                  {errors.gpsAddress && (
                    <p className={style.errorMessage}>
                      {errors.gpsAddress.message}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label>
                    Region<sup style={{color:"red"}}>*</sup>
                  </label>
                  <Controller
                    name="region"
                    control={control}
                    render={({ field }) => (
                      <CustomSelector2
                        width="29rem"
                        height="2.9rem"
                        sideBarHeight="20px"
                        options={Regions}
                        selectedValue={field.value}
                        setSelectedValue={field.onChange}
                      />
                    )}
                  />
                  {errors.region && (
                    <p className={style.errorMessage}>
                      {errors.region.message}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label>
                    Years in Operation<sup style={{color:"red"}}>*</sup>
                  </label>
                  <input
                    type="text"
                    {...register("yearsInOperation")}
                    placeholder="year"
                  />
                  {errors.yearsInOperation && (
                    <p className={style.errorMessage}>
                      {errors.yearsInOperation.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2 - Contact Details */}
            {currentStep === 1 && (
              <div className={style["form-grid"]}>
                <div className={style["form-group"]}>
                  <label>
                    Primary Contact Person<sup style={{color:"red"}}>*</sup>
                  </label>
                  <input
                    type="text"
                    {...register("primaryContact")}
                    placeholder="Name"
                  />
                  {errors.primaryContact && (
                    <p className={style.errorMessage}>
                      {errors.primaryContact.message}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label>
                    Phone Number<sup style={{color:"red"}}>*</sup>
                  </label>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <PhoneNumberInput
                        {...field}
                        error={errors.phoneNumber?.message || ""}
                      />
                    )}
                  />
                </div>

                <div className={style["form-group"]}>
                  <label>
                    Position/Role(Operations Manager)<sup style={{color:"red"}}>*</sup>
                  </label>
                  <input
                    type="text"
                    {...register("position")}
                    placeholder="Position"
                  />
                  {errors.position && (
                    <p className={style.errorMessage}>
                      {errors.position.message}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label>
                    Ghana Card Number<sup style={{color:"red"}}>*</sup>
                  </label>
                  <input
                    type="text"
                    {...register("ghanaCardNumber")}
                    placeholder="number"
                  />
                  {errors.ghanaCardNumber && (
                    <p className={style.errorMessage}>
                      {errors.ghanaCardNumber.message}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label>
                    Email Address<sup style={{color:"red"}}>*</sup>
                  </label>
                  <input
                    type="text"
                    {...register("email")}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className={style.errorMessage}>{errors.email.message}</p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label>
                    Office Line
                  </label>
                  <Controller
                    name="officeLine"
                    control={control}
                    render={({ field }) => (
                      <PhoneNumberInput
                        {...field}
                        error={errors.officeLine?.message || ""}
                      />
                    )}
                  />
                  {errors.officeLine && (
                    <p className={style.errorMessage}>
                      {errors.officeLine.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3 - Payment & Billings */}
            {currentStep === 2 && (
              <div>
                {errors?.financialDetails?.message && (
                  <div className={style.errorMessage} style={{
                    marginBottom:"20px"
                  }}>
                    {errors?.financialDetails?.message}{" "}
                  </div>
                )}
                <div className={style["form-grid"]}>
                  <div className={style["form-group"]}>
                    <label>Bank Name</label>
                    <input
                      type="text"
                      {...register(
                        "financialDetails.bankAccountDetails.bankName"
                      )}
                      placeholder="bank name"
                    />
                    {errors?.financialDetails?.bankAccountDetails?.bankName
                      ?.message && (
                      <p className={style.errorMessage}>
                        {
                          errors.financialDetails.bankAccountDetails.bankName
                            .message
                        }
                      </p>
                    )}
                  </div>

                  <div className={style["form-group"]}>
                    <label>Mobile Money Recipient Name</label>
                    <input
                      type="text"
                      {...register(
                        "financialDetails.mobileMoneyAccount.recipientName"
                      )}
                      placeholder="recipient name"
                    />
                    {errors?.financialDetails?.mobileMoneyAccount?.recipientName
                      ?.message && (
                      <p className={style.errorMessage}>
                        {
                          errors.financialDetails.mobileMoneyAccount
                            .recipientName.message
                        }
                      </p>
                    )}
                  </div>

                  <div className={style["form-group"]}>
                    <label>
                      Bank Account Recipient Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      {...register(
                        "financialDetails.bankAccountDetails.recipientName"
                      )}
                      placeholder="account name"
                    />
                    {errors?.financialDetails?.bankAccountDetails?.recipientName
                      ?.message && (
                      <p className={style.errorMessage}>
                        {
                          errors.financialDetails.bankAccountDetails
                            .recipientName.message
                        }
                      </p>
                    )}
                  </div>

                  <div className={style["form-group"]}>
                    <label>
                      Mobile Money Number<sup>*</sup>
                    </label>
                    <Controller
                      name="financialDetails.mobileMoneyAccount.phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <PhoneNumberInput
                          {...field}
                          error={
                            errors?.financialDetails?.mobileMoneyAccount
                              ?.phoneNumber?.message || ""
                          }
                        />
                      )}
                    />
                    {errors.mobileMoneyNumber && (
                      <p className={style.errorMessage}>
                        {errors.mobileMoneyNumber.message}
                      </p>
                    )}
                  </div>

                  <div className={style["form-group"]}>
                    <label>
                      Bank Account Number<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="banknumber"
                      {...register("financialDetails.bankAccountDetails.accountNumber")}
                      placeholder="account number"
                    />
                    {errors?.financialDetails?.bankAccountDetails?.accountNumber
                      ?.message && (
                      <p className={style.errorMessage}>
                        { errors.financialDetails.bankAccountDetails
                            .accountNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 - Document Uploads */}
            {currentStep === 3 && (
              <div className={style.gridbox}>
                <div className={style.grid1}>
                  <div className={style["upload-container"]}>
                    <p>
                      Business Registration Certificate
                    </p>
                    <div
                      className={style["drop-box"]}
                      onDrop={(e) => handleFileDrop("registrationCertificate", e)}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => openFileDialog(licenseInputRef)}
                    >
                      {registrationCertificate ? (
                        <img
                          src={URL.createObjectURL(registrationCertificate)}
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
                      onClick={() => openFileDialog(licenseInputRef)}
                    >
                      Upload
                    </button>

                    <input
                      type="file"
                      accept="image/*"
                      ref={licenseInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileSelect("registrationCertificate", e)}
                    />
                    {errors.registrationCertificate && (
                      <p className={style.errorMessage}>
                        {errors.registrationCertificate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className={style.grid2}>
                  <div className={style["upload-container"]}>
                    <p>
                      Business Logo
                    </p>
                    <div
                      className={style["drop-box"]}
                      onDrop={(e) => handleFileDrop("businessLogo", e)}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => openFileDialog(idInputRef)}
                    >
                      {businessLogo ? (
                        <img
                          src={URL.createObjectURL(businessLogo)}
                          alt="ID Preview"
                          className={style["preview-image"]}
                        />
                      ) : (
                        <img src={img} alt="Upload placeholder" />
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
                      onChange={(e) => handleFileSelect("businessLogo", e)}
                    />
                    {errors.businessLogo && (
                      <p className={style.errorMessage}>
                        {errors.businessLogo.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 - Account Details */}
            {currentStep === 4 && (
              <div className={style["form__grid"]}>
                <div className={style["form-group"]}>
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
                      className={style["toggle-btn"]}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className={style.errorMessage}>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
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
                      className={style["toggle-btn"]}
                    >
                      {showPassword1 ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className={style.errorMessage}>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={style.buttons}>
          {currentStep > 0 && (
            <button
              type="button"
              className={style["btn-outline"]}
              onClick={prevStep}
            >
              <img src={LeftSVG} className={style.btn} alt="left" /> Previous
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              className={style["btn-filled"]}
              onClick={()=>{nextStep()}}
            >
              Next <img className={style.btn} src={rightSVG} alt="right" />
            </button>
          ) : (
            <button
              type="button"
              className={style["btn-filled"]}
              disabled={isSubmitting}
              onClick={async () => {
                const isValid = await trigger();
              
                if (isValid) {
                  toggleModalOpen();
                } else {
                    showToastMessage()
                }
              }}
            >
              Register
            </button>
          )}
        </div>

           {/* ---------------------------------------modal----------------------------------- */}
                {isOpen && (
                  <div
                    className={style["modal-background"]}
                    // onClick={onClose}
                  >
                    <div
                      className={style["main-card"]}
                      // onClick={handleCardClick}
                    >
                      <img src={check} alt="success check" />
                      <div className={style.text}>
                        <h1>Registration Successful!</h1>
                        <h2 className={style.subtitle}>
                          Thank you for registering your business on{" "}
                          <span>THROTTLE.</span>
                        </h2>
                        <p>
                          Your account is currently under review and will be approved
                          and activated shortly. <br />A confirmation email will be sent
                          to your registered email address once approval is
                          <br /> complete.
                        </p>
                        <h2>We appreciate your interest in partnering with us!</h2>
                      </div>
                      <div className={style.button}>
                        <button type="submit">

                       {isSubmitting ? <BeatLoader color="white" /> : "Ok"}{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
      </form>
    </>
  );
};

export default Stepper;
