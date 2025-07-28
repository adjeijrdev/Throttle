import { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import style from "./RiderStepper.module.css";
import toast from "react-hot-toast";
//Importing in-application components
import DropDownInput from "../Components/DropDownMenuInput/DropDownInput";
import { useNavigate, Link } from "react-router";

//import images
import LeftSVG from "../Assets/icons/Left.png";
import rightSVG from "../Assets/icons/right-svg.png";
import check from "../Assets/icons/Check.png";
import SuccessfulRegistration from "../Modals/SuccessfulRegistration";
import img from "../Assets/icons/img.png";
import padLock from "../Assets/input_icons/padlock.png";
import EmailIcon from "../Assets/input_icons/emailuser.png";
import Calendar from "../Assets/icons/Calendar.png";
import { useForm } from "react-hook-form";
import { riderSchema } from "../items/RiderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelector2 from "./form/selector/CustomSelecter2";
import CustomDatePicker from "./datePicker/CustomDatePicker";
import { registerRiderAPI } from "../api/authentication";
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

  const [dateOfBirth, setDateOfBirth] = useState();
  const [idType, setIdType] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isSubmitting, touchedFields, setError },
  } = useForm({
    resolver: zodResolver(riderSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (idType) {
      setValue("nationalIdentification.type", idType?.value, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      });
    }
  }, [idType]);

  useEffect(() => {
    if (dateOfBirth) {
      setValue("dateOfBirth", dateOfBirth, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      });
    }
  }, [dateOfBirth]);

  //password functions
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleVisibility1 = () => {
    setShowPassword1((prev) => !prev);
  };

  //modal state { successful Modal}
  const [isOpen, setIsOpen] = useState(false);

  const toggleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  //form functions
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (name === "additionalDocs") {
        setFormData((prev) => ({
          ...prev,
          [name]: Array.from(files),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

  // Image Upload - First (0)
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
      setValue("driverLicense", file, { shouldValidate: true });
      clearErrors("driverLicense"); // Clear any previous errors
    } catch (error) {
      setError("driverLicense", {
        type: "manual",
        message: error.message,
      });
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length > 0) {
      handleImage(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target?.files?.length > 0) {
      handleImage(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  // Image Upload - Second (1)
  const [image1, setImage1] = useState(null);
  const fileInputRef1 = useRef(null);

  const handleImage1 = (file) => {
    try {
      if (!file) return;

      // Basic validation before processing
      if (!file.type.startsWith("image/")) {
        throw new Error("Only image files are allowed");
      }

      const imageUrl = URL.createObjectURL(file);

      setImage1({ file, url: imageUrl });
      setValue("nationalIdentificationImge", file, { shouldValidate: true });
      clearErrors("nationalIdentificationImge"); // Clear any previous errors
    } catch (error) {
      setError("nationalIdentificationImge", {
        type: "manual",
        message: error.message,
      });
      setImage1(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop1 = (e) => {
    e.preventDefault();
    if (e?.dataTransfer?.files?.length > 0) {
      handleImage1(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange1 = (e) => {
    if (e?.target?.files?.length > 0) {
      handleImage1(e.target.files[0]);
    }
  };

  const openFileDialog1 = () => {
    fileInputRef1.current.click();
  };

  const onSubmit = async (data) => {
    toggleModalOpen();

    const formData = new FormData();

    const userProfile = {
      fullName: data.fullName,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      password: data.password,
      confirmPassword: data.confirmpassword,
      nationalIdentification: {
        type: data?.nationalIdentification?.type,
        number: data?.nationalIdentification.number,
      },
    };

    formData.append("userProfile", JSON.stringify(userProfile));

    const professionalDetails = {
      yearsOfDrivingExperience:
        data?.professionalDetails?.yearsOfDrivingExperience,
      driverLicenseNumber: data?.professionalDetails?.driverLicenseNumber,
    };
    formData.append("professionalDetails", JSON.stringify(professionalDetails));

    const contactDetails = {
      phoneNumber: data?.contactDetails?.phoneNumber,
      additionalPhoneNumber: data?.contactDetails?.additionalPhoneNumber || "",
      email: data?.contactDetails?.email,
      residentailAddress: data?.contactDetails?.residentailAddress || "",
      emergencyContactName: data?.contactDetails?.emergencyContactName || "",
      emergencyContactNumber:
        data?.contactDetails?.emergencyContactNumber || "",
    };

    formData.append("contactDetails", JSON.stringify(contactDetails));

    const vehicleInfo = {
      vehicleType: data?.vehicleInfo?.vehicleType,
      registrationNumber: data?.vehicleInfo?.registrationNumber,
    };

    formData.append("vehicleInfo", JSON.stringify(vehicleInfo));

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
          phoneNumber: momo.recipientName,
          recipientName: momo.phoneNumber,
        };
        financialDetails.mobileMoneyAccount = mobileMoneyAccount;
      }

      formData.append("financialDetails", JSON.stringify(financialDetails));

      if (data?.driverLicense) {
        formData.append("driverLicense", data?.driverLicense);
      }

      if (data?.nationalIdentificationImge) {
        formData?.append(
          "nationalIdentification",
          data?.nationalIdentificationImge
        );
      }

      try {
        const result = await registerRiderAPI(formData);

        toast.success(result?.data?.message, {
          style: {
            border: "1px solid #17654F",
            // backgroundColor:"oklch(88.5% 0.062 18.334)",
            color: "black",
            fontSize: "16px",
            width: "500px",
          },
        });

        navigate("/login");
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
    }
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
              <p className={style["step-label"]}>{label}</p>
            </div>
          ))}
        </div>
        <div className={style["form-input-container"]}>
          <div className={style["form-step"]}>
            {currentStep === 0 && (
              <div className={style["form-grid"]}>
                <div className={style["form-group"]}>
                  <label htmlFor="fullName">
                    Full name<sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="enter your fullname here"
                    {...register("fullName")}
                  />
                  {errors?.fullName?.message && (
                    <p className={style.error}>{errors?.fullName?.message} </p>
                  )}
                </div>
                <div className={style["form-flex"]}>
                  <label>
                    Gender<sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className={style.radio}>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="MALE"
                      {...register("gender")}
                    />
                    <label htmlFor="male"> Male </label>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="FEMALE"
                      {...register("gender")}
                    />
                    <label htmlFor="female"> Female </label>
                  </div>
                  {errors?.gender?.message && (
                    <p className={style.error}>{errors?.gender?.message} </p>
                  )}
                </div>
                <div className={style["form-group"]}>
                  <label>
                    Date of Birth<sup style={{ color: "red" }}>*</sup>{" "}
                  </label>
                  <CustomDatePicker
                    date={dateOfBirth}
                    setDate={setDateOfBirth}
                  />

                  {errors?.dateOfBirth && (
                    <p className={style.error}>
                      {errors?.dateOfBirth?.message}{" "}
                    </p>
                  )}
                </div>
                <div className={style["form-group"]}>
                  <label>
                    ID Type<sup style={{ color: "red" }}>*</sup>
                  </label>

                  <div>
                    <CustomSelector2
                      width="290px"
                      height="29px"
                      sideBarHeight="20px"
                      options={[
                        {
                          value: "Driver's License",
                          label: "Driver's License",
                        },
                        { value: "Voter's ID", label: "Voter's ID" },
                        { value: "Ghana Card", label: "Ghana Card" },
                      ]}
                      selectedValue={idType}
                      setSelectedValue={setIdType}
                    />
                  </div>
                  {errors?.nationalIdentification?.type && (
                    <p className={style.error}>
                      {errors?.nationalIdentification?.type?.message}{" "}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label htmlFor="licenseNum">
                    Driver License Number<sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    id="licenseNum"
                    name="licenseNum"
                    placeholder="License number"
                    {...register("professionalDetails.driverLicenseNumber")}
                  />
                  {errors?.professionalDetails?.driverLicenseNumber && (
                    <p className={style.error}>
                      {
                        errors?.professionalDetails?.driverLicenseNumber
                          ?.message
                      }{" "}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label htmlFor="idNumber">
                    ID Number<sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    id="idNumber"
                    placeholder="enter your identification number "
                    {...register("nationalIdentification.number")}
                  />
                  {errors?.nationalIdentification?.number && (
                    <p className={style.error}>
                      {errors?.nationalIdentification?.number?.message}{" "}
                    </p>
                  )}
                </div>

                <div className={style["form-group"]}>
                  <label htmlFor="yearsOfExperience">
                    Years of Driving Experience
                    <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="number"
                    id="yearsOfExperience"
                    placeholder="Enter years of  driving experience here"
                    {...register(
                      "professionalDetails.yearsOfDrivingExperience"
                    )}
                  />
                  {errors?.professionalDetails?.yearsOfDrivingExperience && (
                    <p className={style.error}>
                      {
                        errors?.professionalDetails?.yearsOfDrivingExperience
                          ?.message
                      }{" "}
                    </p>
                  )}
                </div>
              </div>
            )}
            {/* step 2- Contact Details */}
            {currentStep === 1 && (
              <div className={style["form-grid"]}>
                <div className={style["form-group"]}>
                  <label htmlFor="phoneNumber">
                    {" "}
                    Mobile Number<sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="enter your phone number here"
                    {...register("contactDetails.phoneNumber")}
                  />

                  {errors?.contactDetails?.phoneNumber?.message && (
                    <p className={style.error}>
                      {errors?.contactDetails?.phoneNumber?.message}{" "}
                    </p>
                  )}
                </div>
                <div className={style["form-group"]}>
                  <label htmlFor="residentialAddress">
                    Residential Address<sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    name="residentialAddress"
                    placeholder="address"
                    id="residentialAddress"
                    {...register("contactDetails.residentailAddress")}
                  />
                  {errors?.contactDetails?.residentailAddress?.message && (
                    <p className={style.error}>
                      {errors?.contactDetails?.residentailAddress?.message}{" "}
                    </p>
                  )}
                </div>
                <div className={style["form-group"]}>
                  <label htmlFor="additionalPhoneNumber">
                    Additional Mobile Number (Optional)
                  </label>
                  <input
                    id="additionalPhoneNumber"
                    type="text"
                    name="additionalPhoneNumber"
                    placeholder="phone number"
                    {...register("contactDetails.additionalPhoneNumber")}
                  />
                  {errors?.contactDetails?.additionalPhoneNumber?.message && (
                    <p className={style.error}>
                      {errors?.contactDetails?.additionalPhoneNumber?.message}{" "}
                    </p>
                  )}
                </div>
                <div className={style["form-group"]}>
                  <label htmlFor="emergencyContactName">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContactName"
                    placeholder="enter fullname"
                    {...register("contactDetails.emergencyContactName")}
                  />
                  {errors?.contactDetails?.emergencyContactName?.message && (
                    <p className={style.error}>
                      {errors?.contactDetails?.emergencyContactName?.message}{" "}
                    </p>
                  )}
                </div>
                <div className={style["form-group"]}>
                  <label htmlFor="email">
                    Email Address<sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    {...register("contactDetails.email")}
                  />
                  {errors?.contactDetails?.email?.message && (
                    <p className={style.error}>
                      {errors?.contactDetails?.email?.message}{" "}
                    </p>
                  )}
                </div>
                <div className={style["form-group"]}>
                  <label htmlFor="emergencyContactNumber">
                    Emergency contact number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="emergencyContactNumber"
                    id="emergencyContactNumber"
                    placeholder="Contact"
                    {...register("contactDetails.emergencyContactNumber")}
                  />
                  {errors?.contactDetails?.emergencyContactNumber?.message && (
                    <p className={style.error}>
                      {errors?.contactDetails?.emergencyContactNumber?.message}{" "}
                    </p>
                  )}
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className={style["form__grid1"]}>
                {/* <label>Account Email</label> */}
                <div className={style["form-group"]}>
                  <label htmlFor="vehicleModle">
                    Vehicle Type and Model<sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    name="vehicleModle"
                    id="vehicleModle"
                    placeholder="Model"
                    {...register("vehicleInfo.vehicleType")}
                  />
                  {errors?.vehicleInfo?.vehicleType?.message && (
                    <p className={style.error}>
                      {errors?.vehicleInfo?.vehicleType?.message}{" "}
                    </p>
                  )}
                </div>
                <div className={style["form-group"]}>
                  <label htmlFor="registrationNumber">
                    Vehicle Registration Number<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    placeholder="Number"
                    id="registrationNumber"
                    {...register("vehicleInfo.registrationNumber")}
                  />
                  {errors?.vehicleInfo?.registrationNumber?.message && (
                    <p className={style.error}>
                      {errors?.vehicleInfo?.registrationNumber?.message}{" "}
                    </p>
                  )}
                </div>
              </div>
            )}
            {/* Step 3 - Payment & Billing */}
            {currentStep === 3 && (
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
            {currentStep === 4 && (
              <div className={style.gridbox}>
                <div className={style.grid1}>
                  <div className={style["upload-container"]}>
                    <p>
                      Drivers License<sup>*</sup>
                    </p>
                    <div
                      className={style["drop-box"]}
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => e.preventDefault()}
                    >
                      {image ? (
                        <img
                          src={image.url}
                          alt="Preview"
                          className={style["preview-image"]}
                        />
                      ) : (
                        <img src={img} alt="image-vector" />
                      )}
                    </div>

                    <button
                      className={style["upload-button"]}
                      onClick={openFileDialog}
                    >
                      Upload
                    </button>

                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileInputChange}
                    />
                  </div>

                  {errors?.driverLicense?.message && (
                    <p className={style.error}>
                      {errors?.driverLicense?.message}{" "}
                    </p>
                  )}
                </div>

                <div className={style.grid2}>
                  <div className={style["upload-container"]}>
                    <p>
                      National ID/Valid ID<sup>*</sup>
                    </p>
                    <div
                      className={style["drop-box"]}
                      onDrop={handleDrop1}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => e.preventDefault()}
                    >
                      {image1 ? (
                        <img
                          src={image1.url}
                          alt="Preview"
                          className={style["preview-image"]}
                        />
                      ) : (
                        <img src={img} alt="image-vector" />
                      )}
                    </div>

                    <button
                      className={style["upload-button"]}
                      onClick={openFileDialog1}
                    >
                      Upload
                    </button>

                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef1}
                      style={{ display: "none" }}
                      onChange={handleFileInputChange1}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 - Account Details */}
            {currentStep === 5 && (
              <div className={style["form__grid"]}>
                <div className={style["form-group"]}>
                  <label htmlFor="password">
                    Password<sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className={style["Account-details-password"]}>
                    <img src={padLock} alt="padlock" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="password"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className={style["toggle - btn"]}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors?.password?.message && (
                    <p className={style.error}>{errors?.password?.message} </p>
                  )}
                </div>

                <label htmlFor="confirmpassword">
                  Confirm Password<sup>*</sup>
                </label>
                <div className={style["Account-details-password"]}>
                  <img src={padLock} alt="padlock" />
                  <input
                    type={showPassword1 ? "text" : "password"}
                    name="confirmpassword"
                    id="confirmpassword"
                    {...register("confirmpassword")}
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility1}
                    className={style["toggle - btn"]}
                  >
                    {showPassword1 ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {errors?.confirmpassword?.message && (
                  <p className={style.error}>
                    {errors?.confirmpassword?.message}{" "}
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
                // console.log(errors);
                if (isValid) {
                  toggleModalOpen();
                } else {
                  toast.error(
                    "Please provide details for all required fields",
                    {
                      style: {
                        border: "1px solid oklch(88.5% 0.062 18.334)",
                        // backgroundColor:"oklch(88.5% 0.062 18.334)",
                        color: "oklch(39.6% 0.141 25.723)",
                        fontSize: "16px",
                        width: "500px",
                      },
                    }
                  );
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
                <button type="submit">Ok </button>
              </div>
            </div>
          </div>
        )}
        {/* <SuccessfulRegistration isOpen={isOpen} onClose={toggleModalOpen} /> */}
      </form>
    </>
  );
};

export default Stepper;