import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router";
import "./Login.css";

//importing images
import BluredBackground from "../../Assets/blured_dashboard.png";
import Man from "../../Assets/man.png";
import Logo from "../../Assets/logos/LOGO-img.png";
import EmailIcon from "../../Assets/input_icons/emailuser.png";
import padLock from "../../Assets/input_icons/padlock.png";
import RegisterAppModal from "../../Modals/RegisterAppModal";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //in-components functions
  const toggleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const text = `
  A powerful delivery management system designed to act as a trusted
  middleman between businesses and customers. Whether you're a vendor,
  rider, or administrator, our platform ensures smooth order
  processing, real-time tracking, and secure payment handling.
`;

  return (
    <div className="main-container-box">
      <div className="green-side">
        <div className="TextBox">
          <div className="text-on-green">
            <h1>
              Welcome <span className="to-text">to</span>
              <span className="throttle-text"> Throttle</span>
            </h1>
            <h3>Smart & Seamless Delivery Management!</h3>
            <pre>{text}</pre>
          </div>
        </div>
        <div className="Images">
          <div className="blurred-box">
            <img src={BluredBackground} alt="Blurred-box" />
          </div>
          <div className="man-box">
            <img src={Man} alt="Man-model" />
          </div>
        </div>
      </div>
      {/* WHITE SECTION AND FORM */}
      <div className="form">
        <div className="white-container">
          <div className="logo logo-form">
            <img src={Logo} alt="Throttle-logo" />
          </div>
          <div className="line-box">
            <div className="line-and-text">
              <span>Login or signup</span>
            </div>
          </div>
          <div className="radio-button-group">
            <div className="radio-button">
              <input
                type="radio"
                id="Admin"
                name="option"
                value="Admin"
                checked={selectedOption === "Admin"}
                onChange={handleOptionChange}
              />
              <label htmlFor="Admin">Admin</label>
            </div>
            <div className="radio-button">
              <input
                type="radio"
                id="Vendor"
                name="option"
                value="Vendor"
                checked={selectedOption === "Vendor"}
                onChange={handleOptionChange}
              />
              <label htmlFor="Vendor">Vendor</label>
            </div>
            <div className="radio-button">
              <input
                type="radio"
                id="Dispatcher"
                name="option"
                value="Dispatcher"
                checked={selectedOption === "Dispatcher"}
                onChange={handleOptionChange}
              />
              <label htmlFor="Dispatcher">Dispatcher</label>
            </div>
            <div className="radio-button">
              <input
                type="radio"
                id="Rider"
                name="option"
                value="Rider"
                checked={selectedOption === "Rider"}
                onChange={handleOptionChange}
              />
              <label htmlFor="Rider">Rider</label>
            </div>
          </div>
          <div className="input-fields">
            <div className="input-box login_email-box">
              <img src={EmailIcon} alt="emailIcon" />
              <input
                // className="input"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="input-box input-password-box-1">
              <img src={padLock} alt="padlock" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="toggle-btn"
                aria-label="Toggle Password"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
             <div className="remember-me"> <p>Forget Password?</p> </div>
          </div>
         
          <div className="button-and-sign-up">
            <button onClick={() => navigate("/")}> Login </button>
            <div className="sign-up">
              <span>
                Don't have an Account?
                <Link onClick={toggleModalOpen}> Register</Link>
                <RegisterAppModal
                  isOpen={isModalOpen}
                  onCLose={toggleModalOpen}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
