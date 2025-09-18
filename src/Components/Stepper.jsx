import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VendorSchema } from "../items/VendorSchema";
import { FaEye, FaEyeSlash, FaRegGrimace } from "react-icons/fa";
import { FiUpload, FiAlertCircle, FiTrash2 } from "react-icons/fi";
import style from "./Stepper.module.css";
import { registerVendorAPI } from "../api/authentication";
//import images
import LeftSVG from "../Assets/icons/Left.png";
import rightSVG from "../Assets/icons/right-svg.png";
import check from "../Assets/icons/Check.png";
import SuccessfulRegistration from "../Modals/SuccessfulRegistration";
import img from "../Assets/icons/img.png";
import padLock from "../Assets/input_icons/padlock.png";
import EmailIcon from "../Assets/input_icons/emailuser.png";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router";

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

  const navigate = useNavigate();

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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(VendorSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    toggleModalOpen();

    const formData = new FormData();

    // Step 1: Business Info
    const businessInfo = {
      companyName: data.businessname,
      businessAddress: data.businessaddress,
      businessType: data.businesstype,
      country: data.country,
      businessRegistrationNumber: data.regnumber,
      yearsInOpertion: data.years || undefined,
      webApplicationDomainName: data.website || undefined,
    };
    formData.append("businessInfo", JSON.stringify(businessInfo));

    // Step 2: Contact Details
    const contactDetails = {
      name: data.vendorname,
      email: data.email,
      phoneNumber: data.phone,
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
          phoneNumber: momo.phoneNumber,
          recipientName:momo.recipientName ,
        };
        financialDetails.mobileMoneyAccount = mobileMoneyAccount;
      }

      formData.append("financialDetails", JSON.stringify(financialDetails));
    }

    if (data.logo) {
      formData.append("businessLogo", data.logo);
    }

    try {
      const result = await registerVendorAPI(formData);

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
  };

  const nextStep = async () => {
    setCurrentStep((prev) => prev + 1);
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
    handleImage(e?.target?.files[0]);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImage(null);
    setValue("logo", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={style["form-container"]}
        encType="multipart/form-data"
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
                    <p className={style.error}>
                      {errors.businessname.message}{" "}
                    </p>
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
                    <p className={style.error}>
                      {errors.businesstype.message}{" "}
                    </p>
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
                    type="number"
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
              <div>
                {errors?.financialDetails?.message && (
                  <div className={style.error}>
                    {errors?.financialDetails?.message}{" "}
                  </div>
                )}

                <div className={style["form-grid"]}>
                  <div className={style["form-group"]}>
                    <label>Bank Name</label>
                    <input
                      type="text"
                      name="bankname"
                      {...register(
                        "financialDetails.bankAccountDetails.bankName"
                      )}
                      placeholder="bank name"
                    />
                    {errors?.financialDetails?.bankAccountDetails?.bankName
                      ?.message && (
                      <p className={style.error}>
                        {
                          errors.financialDetails.bankAccountDetails.bankName
                            .message
                        }{" "}
                      </p>
                    )}
                  </div>
                  <div className={style["form-group"]}>
                    <label>Mobile Money Recipient Name</label>
                    <input
                      type="text"
                      name="momoname"
                      {...register(
                        "financialDetails.mobileMoneyAccount.recipientName"
                      )}
                      placeholder="recipient name"
                    />
                    {errors?.financialDetails?.mobileMoneyAccount?.recipientName
                      ?.message && (
                      <p className={style.error}>
                        {
                          errors.financialDetails.mobileMoneyAccount
                            .recipientName.message
                        }{" "}
                      </p>
                    )}
                  </div>
                  <div className={style["form-group"]}>
                    <label>Bank Account Number</label>
                    <input
                      type="text"
                      name="banknumber"
                      {...register(
                        "financialDetails.bankAccountDetails.accountNumber"
                      )}
                      placeholder=" account number"
                    />
                    {errors?.financialDetails?.bankAccountDetails?.accountNumber
                      ?.message && (
                      <p className={style.error}>
                        {
                          errors.financialDetails.bankAccountDetails
                            .accountNumber.message
                        }{" "}
                      </p>
                    )}
                  </div>
                  <div className={style["form-group"]}>
                    <label>Mobile Money Number</label>
                    <input
                      type="text"
                      name="momonumber"
                      {...register(
                        "financialDetails.mobileMoneyAccount.phoneNumber"
                      )}
                      placeholder="momo number"
                    />
                    {errors?.financialDetails?.mobileMoneyAccount
                      ?.phoneNumber && (
                      <p className={style.error}>
                        {
                          errors.financialDetails.mobileMoneyAccount.phoneNumber
                            .message
                        }
                      </p>
                    )}
                  </div>
                  <div className={style["form-group"]}>
                    <label>Bank Account Recipient Name</label>
                    <input
                      type="text"
                      name="banknumber"
                      {...register(
                        "financialDetails.bankAccountDetails.recipientName"
                      )}
                      placeholder=" account number"
                    />
                    {errors?.financialDetails?.bankAccountDetails?.recipientName
                      ?.message && (
                      <p className={style.error}>
                        {
                          errors.financialDetails.bankAccountDetails
                            .recipientName.message
                        }{" "}
                      </p>
                    )}
                  </div>
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
                {/* <label>Account Email</label>
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
              )} */}
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
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
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
                    {showPassword1 ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {errors.confirmpassword?.message && (
                  <p className={style.error}>
                    {errors.confirmpassword.message}{" "}
                  </p>
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
                const isValid = await trigger();
                if (isValid) {
                  // handleSubmit(onSubmit)(); // Trigger form submission
                  toggleModalOpen();
                } else {
                  toast.error("Please provide details for all required fields", {
                    style: {
                      border: "1px solid oklch(88.5% 0.062 18.334)",
                      // backgroundColor:"oklch(88.5% 0.062 18.334)",
                      color: "oklch(39.6% 0.141 25.723)",
                      fontSize: "16px",
                      width: "500px",
                    },
                  });
                }
              }}
            >
              Submit
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
                <button type="submit">Ok </button>
              </div>
            </div>
          </div>
        )}
        {/* <SuccessfulRegistration isOpen={isOpen} onClose={toggleModalOpen} /> */}
      </form>

      {/* <div className={style.cancel_registration_btn}>
        Don't want to continue?{" "}
        <Link
          to="/login"
          style={{ fontWeight: "bold", color: "#000000", marginLeft: "5px" }}
        >
          {" "}
          Cancel Registration
        </Link>
      </div> */}
    </>
  );
};

export default Stepper;
