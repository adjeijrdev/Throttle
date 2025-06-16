import { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import style from "./RiderStepper.module.css";


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
  const [formData, setFormData] = useState({
    // Business info
    businessname: "",
    businessaddress: "",
    businesstype: "",
    country: "",
    regnumber: "",
    years: "",

    // Contact details
    vendorname: "",
    email: "",
    phone: "",
    website: "",

    // Payment&Billing
    bankname: "",
    momoname: "",
    banknumber: "",
    momonumber: "",

    // // Document Uploads
    // additionalDocs: [],

    // Account details
    accountemail: "",
    password: "",
    confirmpassword: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send data to your API
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
  if (file && file.type.startsWith("image/")) {
    const imageUrl = URL.createObjectURL(file);
    setImage({ file, url: imageUrl });
  }
};

const handleDrop = (e) => {
  e.preventDefault();
  if (e.dataTransfer.files.length > 0) {
    handleImage(e.dataTransfer.files[0]);
  }
};

const handleFileInputChange = (e) => {
  if (e.target.files.length > 0) {
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
  if (file && file.type.startsWith("image/")) {
    const imageUrl1 = URL.createObjectURL(file);
    setImage1({ file, url: imageUrl1 });
  }
};

const handleDrop1 = (e) => {
  e.preventDefault();
  if (e.dataTransfer.files.length > 0) {
    handleImage1(e.dataTransfer.files[0]);
  }
};

const handleFileInputChange1 = (e) => {
  if (e.target.files.length > 0) {
    handleImage1(e.target.files[0]);
  }
};

const openFileDialog1 = () => {
  fileInputRef1.current.click();
};


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
                  name="businessname"
                  value={formData.businessname}
                  onChange={handleChange}
                  placeholder="business name"
                  required
                />
              </div>
              <div className={style["form-flex"]}>
                <label>
                  Gender<sup>*</sup>
                </label>
                <div className={style.radio}>
                  <input type="radio" name="gender" id="male" />
                  <label htmlFor="male"> Male </label>
                  <input type="radio" name="gender" id="female" />
                  <label htmlFor="female"> Female </label>
                </div>
              </div>
              <div className={style["form-group"]}>
                <div className={style.calendar}>
                  <label>
                    Date of Birth<sup>*</sup>{" "}
                  </label>
                  <input
                    type="date"
                    name="businesstype"
                    value={formData.businesstype}
                    onChange={handleChange}
                    placeholder="business type"
                  />
                  <span><img src={Calendar} alt="calendar" /></span>
                </div>
              </div>
              <div className={style["form-group"]}>
                <label>ID Type<sup>*</sup></label>
                <div className={style.option_container}>
                   <select>
                    <option >Choose ID type</option>
                    <option value="Driver's License">Driver's License</option>
                    <option value="Voter's ID">Voter's ID</option>
                   </select>
                </div>
              </div>
              <div className={style["form-group"]}>
                <label>
                  Driver License Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="regnumber"
                  value={formData.regnumber}
                  onChange={handleChange}
                  placeholder="number"
                />
              </div>
              <div className={style["form-group"]}>
                <label>ID Number<sup>*</sup></label>
                <input
                  type="text"
                  name="years"
                  value={formData.years}
                  onChange={handleChange}
                  placeholder="year"
                />
              </div>
              
            </div>
          )}
          {/* step 2- Contact Details */}
          {currentStep === 1 && (
            <div className={style["form-grid"]}>
              <div className={style["form-group"]}>
                <label> Name<sup>*</sup></label>
                <input
                  type="text"
                  name="vendorname"
                  value={formData.vendorname}
                  onChange={handleChange}
                  placeholder="name"
                  required
                />
              </div>
              <div className={style["form-group"]}>
                <label>Email<sup>*</sup></label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email"
                  required
                />
              </div>
              <div className={style["form-group"]}>
                <label>Phone Number<sup>*</sup></label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="number"
                  required
                />
              </div>
              <div className={style["form-group"]}>
                <label>Emergency Contact Name<sup>*</sup></label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
              <div className={style["form-group"]}>
                <label>Email Address<sup>*</sup></label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className={style["form-group"]}>
                <label>Emergency contact number<sup>*</sup></label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Contact"
                />
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className={style["form__grid1"]}>
            {/* <label>Account Email</label> */}
            <div className={style["form-group"]}>
                <label>Vehicle Type and Model<sup>*</sup></label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Model"
                />
              </div>
              <div className={style["form-group"]}>
                <label>Vehicle Registration Number<sup>*</sup></label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Number"
                />
              </div>
              
          </div>
          )}
          {/* Step 3 - Payment & Billing */}
          {currentStep === 3 && (
            <div className={style["form-grid"]}>
              <div className={style["form-group"]}>
                <label>Bank Name<sup>*</sup></label>
                <input
                  type="text"
                  name="bankname"
                  value={formData.bankname}
                  onChange={handleChange}
                  placeholder="bank name"
                />
              </div>
              <div className={style["form-group"]}>
                <label>Mobile Money Name<sup>*</sup></label>
                <input
                  type="text"
                  name="momoname"
                  value={formData.momoname}
                  onChange={handleChange}
                  placeholder="momo name"
                />
              </div>
              <div className={style["form-group"]}>
                <label>Bank Account Number<sup>*</sup></label>
                <input
                  type="text"
                  name="banknumber"
                  value={formData.banknumber}
                  onChange={handleChange}
                  placeholder=" account number"
                />
              </div>
              <div className={style["form-group"]}>
                <label>Mobile Money Number</label>
                <input
                  type="text"
                  name="momonumber"
                  value={formData.momonumber}
                  onChange={handleChange}
                  placeholder="momo number"
                />
              </div>
            </div>
          )}

          {/* Step 4 - Document Uploads */}
          {currentStep === 4 && (
  <div className={style.gridbox}>
    <div className={style.grid1}>
      <div className={style["upload-container"]}>
        <p>Drivers License<sup>*</sup></p>
        <div
          className={style["drop-box"]}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
        >
          {image ? (
            <img src={image.url} alt="Preview" className={style["preview-image"]} />
          ) : (
            <img src={img} alt="image-vector" />
          )}
        </div>

        <button className={style["upload-button"]} onClick={openFileDialog}>
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
    </div>

    <div className={style.grid2}>
      <div className={style["upload-container"]}>
        <p>National ID/Valid ID<sup>*</sup></p>
        <div
          className={style["drop-box"]}
          onDrop={handleDrop1}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
        >
          {image1 ? (
            <img src={image1.url} alt="Preview" className={style["preview-image"]} />
          ) : (
            <img src={img} alt="image-vector" />
          )}
        </div>

        <button className={style["upload-button"]} onClick={openFileDialog1}>
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
              <label>Account Email<sup>*</sup></label>
              <div
                className={`${style["Account-details-password"]} ${style.email}`}
              >
                <img src={EmailIcon} alt="emailIcon" />
                <input
                  type="text"
                  name="accountemail"
                  value={formData.accountemail}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <label>Password<sup>*</sup></label>
              <div className={style["Account-details-password"]}>
                <img src={padLock} alt="padlock" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
              <label>Confirm Password<sup>*</sup></label>
              <div className={style["Account-details-password"]}>
                <img src={padLock} alt="padlock" />
                <input
                  type={showPassword1 ? "text" : "password"}
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={toggleVisibility1}
                  className={style["toggle - btn"]}
                >
                  {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                </button>
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
