import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VendorSchema } from "../items/VendorSchema";
import { FaEye, FaEyeSlash, FaRegGrimace } from "react-icons/fa";
import { FiUpload, FiAlertCircle, FiTrash2 } from "react-icons/fi";
import style from "./Stepper.module.css";

//import images
import LeftSVG from "../Assets/icons/Left.png";
import rightSVG from "../Assets/icons/right-svg.png";
import check from "../Assets/icons/Check.png";
import SuccessfulRegistration from "../Modals/SuccessfulRegistration";
import img from "../Assets/icons/img.png";
import padLock from "../Assets/input_icons/padlock.png";
import EmailIcon from "../Assets/input_icons/emailuser.png";

const steps = [
  "Business Info",
  "Contact Details",
  "Payment & Billing",
  "Document Uploads",
  "Account Details",
];

const Stepper = ({ name }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleVisibility1 = () => {
    setShowPassword1((prev) => !prev);
  };
  const toggleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  //form functions
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(VendorSchema),
    mode: "onTouched",
  });

const [isSubmitting, setIsSubmitting] = useState(false);

const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    await submitData(data); // Your API call
    toggleModalOpen();
  } finally {
    setIsSubmitting(false);
  }
};

  const nextStep = async () => {
    const fieldsByStep = [
      [
        "businessname",
        "businessaddress",
        "businesstype",
        "country",
        "regnumber",
        "years",
      ],
      ["vendorname", "email", "phone", "website"],
      ["bankname", "momoname", "banknumber", "momonumber"],
      ["logo"],
      ["accountemail", "password", "confirmpassword"],
    ];

    const isValid = await trigger(fieldsByStep[currentStep]);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // File Upload Logic
const [image, setImage] = useState(null);
const fileInputRef = useRef(null);

const handleImage = (file) => {
  try {
    if (!file) return;

    // Basic validation before processing
    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    const imageUrl = URL.createObjectURL(file);
    setImage({ file, url: imageUrl });
    setValue("logo", file, { shouldValidate: true });
    clearErrors("logo"); // Clear any previous errors
  } catch (error) {
    setError("logo", {
      type: "manual",
      message: error.message,
    });
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
};

const handleDrop = (e) => {
  e.preventDefault();
  handleImage(e.dataTransfer.files[0]);
};

const handleFileInputChange = (e) => {
  handleImage(e.target.files[0]);
};

const openFileDialog = () => {
  fileInputRef.current?.click();
};

const removeImage = () => {
  setImage(null);
  setValue("logo", null, { shouldValidate: true });
  if (fileInputRef.current) fileInputRef.current.value = "";
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style["form-container"]}>
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
            <p className={style["step-label"]}>{label} </p>
          </div>
        ))}
      </div>
      <div className={style["form-input-container"]}>
        <div className={style["form-step"]}>
          {currentStep === 0 && (
            <div
              className={style["form-grid"]}
              style={{
                marginBottom:
                  errors.businessname | errors.businessaddress
                    ? "10px"
                    : "20px",
              }}
            >
              <div className={style["form-group"]}>
                <label>Business Name</label>
                <input
                  type="text"
                  name="businessname"
                  {...register("businessname")}
                  placeholder="business name"
                />
                {errors.businessname?.message && (
                  <p className={style.error}>{errors.businessname.message} </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>Business Address</label>
                <input
                  type="text"
                  name="businessaddress"
                  {...register("businessaddress")}
                  placeholder="address"
                />
                {errors.businessaddress?.message && (
                  <p className={style.error}>
                    {errors.businessaddress.message}{" "}
                  </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>Business Type (e.g. Electronics, Clothing)</label>
                <input
                  type="text"
                  name="businesstype"
                  {...register("businesstype")}
                  placeholder="business type"
                />
                {errors.businesstype?.message && (
                  <p className={style.error}>{errors.businesstype.message} </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>Country & City of Operation</label>
                <input
                  type="text"
                  name="country"
                  {...register("country")}
                  placeholder="country"
                />
                {errors.country?.message && (
                  <p className={style.error}>{errors.country.message} </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>Business Registration Number</label>
                <input
                  type="text"
                  name="regnumber"
                  {...register("regnumber")}
                  placeholder="number"
                />
                {errors.regnumber?.message && (
                  <p className={style.error}>{errors.regnumber.message} </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>Years in Operation</label>
                <input
                  type="text"
                  name="years"
                  {...register("years")}
                  placeholder="year"
                />
                {errors.years?.message && (
                  <p className={style.error}>{errors.years.message} </p>
                )}
              </div>
            </div>
          )}
          {/* step 2- Contact Details */}
          {currentStep === 1 && (
            <div className={style["form-grid"]}>
              <div
                className={style["form-group"]}
                style={errors.businessname && { marginBottom: "-8px" }}
              >
                <label> Name</label>
                <input
                  type="text"
                  name="vendorname"
                  {...register("vendorname")}
                  placeholder="name"
                />
                {errors.vendorname?.message && (
                  <p className={style.error}>{errors.vendorname.message} </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  {...register("email")}
                  placeholder="email"
                />
                {errors.email?.message && (
                  <p className={style.error}>{errors.email.message} </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  {...register("phone")}
                  placeholder="number"
                />
                {errors.phone?.message && (
                  <p className={style.error}>{errors.phone.message} </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>Business Website</label>
                <input
                  type="text"
                  name="website"
                  {...register("website")}
                  placeholder="link"
                />
                {errors.website?.message && (
                  <p className={style.error}>{errors.website.message} </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3 - Payment & Billing */}
          {currentStep === 2 && (
            <div className={style["form-grid"]}>
              <div className={style["form-group"]}>
                <label>Bank Name</label>
                <input
                  type="text"
                  name="bankname"
                  {...register("bankname")}
                  placeholder="bank name"
                />
                {errors.bankname?.message && (
                  <p className={style.error}>{errors.bankname.message} </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>Mobile Money Name</label>
                <input
                  type="text"
                  name="momoname"
                  {...register("momoname")}
                  placeholder="momo name"
                />
                {errors.momoname?.message && (
                  <p className={style.error}>{errors.momoname.message} </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>Bank Account Number</label>
                <input
                  type="text"
                  name="banknumber"
                  {...register("banknumber")}
                  placeholder=" account number"
                />
                {errors.banknumber?.message && (
                  <p className={style.error}>{errors.banknumber.message} </p>
                )}
              </div>
              <div className={style["form-group"]}>
                <label>Mobile Money Number</label>
                <input
                  type="text"
                  name="momonumber"
                  {...register("momonumber")}
                  placeholder="momo number"
                />
                {errors.momonumber?.message && (
                  <p className={style.error}>{errors.momonumber.message} </p>
                )}
              </div>
            </div>
          )}

          {/* Step 4 - Document Uploads */}
          {currentStep === 3 && (
  <div className={style["upload-container"]}>
    <p>Business logo</p>
    <div
      className={`${style["drop-box"]} ${
        errors.logo ? style["error-border"] : ""
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onClick={openFileDialog}
    >
      {image ? (
        <>
          <img
            src={image.url}
            alt="Preview"
            className={style["preview-image"]}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeImage();
            }}
            className={style["remove-image-btn"]}
          >
            ×
          </button>
        </>
      ) : errors.logo?.message ? (
        <div className={style["upload-error"]}>
          <FiAlertCircle />
          <p>{errors.logo.message}</p>
        </div>
      ) : (
        <img src={img} alt="placeholder" />
      )}
    </div>

    <button
      type="button"
      className={style["upload-button"]}
      onClick={openFileDialog}
    >
      {image ? "Change" : "Upload"}
    </button>
    
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={handleFileInputChange}
    />
  </div>
)}

          {/* Step 5 - Account Details */}
          {currentStep === 4 && (
            <div className={style["form__grid"]}>
              <label>Account Email</label>
              <div
                className={`${style["Account-details-password"]} ${style.email}`}
              >
                <img src={EmailIcon} alt="emailIcon" />
                <input
                  type="text"
                  name="accountemail"
                  {...register("accountemail")}
                  placeholder="Enter your email"
                />
              </div>
              {errors.accountemail?.message && (
                <p className={style.error}>{errors.accountemail.message} </p>
              )}
              <label>Password</label>
              <div className={style["Account-details-password"]}>
                <img src={padLock} alt="padlock" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  {...register("password")}
                  placeholder="password"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className={style["toggle - btn"]}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password?.message && (
                <p className={style.error}>{errors.password.message} </p>
              )}
              <label>Confirm Password</label>
              <div className={style["Account-details-password"]}>
                <img src={padLock} alt="padlock" />
                <input
                  type={showPassword1 ? "text" : "password"}
                  name="confirmpassword"
                  {...register("confirmpassword")}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={toggleVisibility1}
                  className={style["toggle-btn"]}
                >
                  {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmpassword?.message && (
                <p className={style.error}>{errors.confirmpassword.message} </p>
              )}
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
           <button 
              type="button"
              className={style["btn-filled"]}
              onClick={async () => {
              // Validate current step first
              const isValid = await trigger(fieldsByStep[currentStep]);
              if (isValid) {
                handleSubmit(onSubmit)(); // Trigger form submission
                toggleModalOpen();
              }
            }}
          >
      Submit
    </button>
        )}
      </div>
      <SuccessfulRegistration isOpen={isOpen} onClose={toggleModalOpen} />
    </form>
  );
};

export default Stepper;
