import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router";
import "./Login.css";

//importing images
import BluredBackground from "../../Assets/blured_dashboard.png";
import Man from "../../Assets/DisplayModel.png";
import Logo from "../../Assets/logos/LOGO-img.png";
import EmailIcon from "../../Assets/input_icons/emailuser.png";
import padLock from "../../Assets/input_icons/padlock.png";
import RegisterAppModal from "../../Modals/RegisterAppModal";

const schema = z.object({
  email: z.string().email("⚠ Invalid email"),
  password: z.string().min(8, "⚠ Password should be a minimum of 8 characters"),
  role: z.enum(["Staff", "Vendor", "3PL"], {
    required_error: "Please select your role",
  })
  .default("Staff"),
});

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //FORM VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "Staff", // Default role
    }
  });

  const onSubmit = (data) => {
    if(data){setTimeout(()=>{
      console.log(data), 2000
      navigate('/')
    })}
    else{
      throw Error;
    }
    
  }

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
      <form className="form"onSubmit={handleSubmit(onSubmit)} >
        <div className="white-container">
          <div className="logo logo-form">
            <img src={Logo} alt="Throttle-logo" />
          </div>
          <div className="line-box">
            <div className="line-and-text">
              <span>Login or signup</span>
            </div>
          </div>
          {/* <form action=""></form> */}
          <div className="radio-button-group">
            <div className="radio-button">
              <input
                type="radio"
                id="Staff"
                value="Staff"
                {...register("role")}
              />
              <label htmlFor="Staff">Staff</label>
            </div>
            <div className="radio-button">
              <input
                type="radio"
                id="Vendor"
                value="Vendor"
                {...register("role")}
              />
              <label htmlFor="Vendor">Vendor</label>
            </div>
            <div className="radio-button">
              <input type="radio" id="3PL" value="3PL" {...register("role")} />
              <label htmlFor="3PL">3PL</label>
            </div>
          </div>
          {errors.role && <h3 style={{ color: "red", marginTop: "-1rem", fontSize: "1.3rem", fontWeight:"450" }}>{errors.role.message.replaceAll("Kindly Select a role")}</h3>}
          <div className="input-fields">
            <div className="input-box login_email-box">
              <img src={EmailIcon} alt="emailIcon" />
              <input
                // className="input"
                type="text"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <h3 style={{ color: "red", marginTop: "-1rem", fontSize: "1.3rem", fontWeight:"450" }}>{errors.email.message}</h3>
            )}
            <div className="input-box input-password-box-1">
              <img src={padLock} alt="padlock" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="toggle-btn"
                aria-label="Toggle Password"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <h3 style={{ color: "red", marginTop: "-1rem", fontSize: "1.3rem", fontWeight:"450" }}>{errors.password.message}</h3>
            )}
            <div className="remember-me">
              {" "}
              <p>Forget Password?</p>{" "}
            </div>
          </div>

          <div className="button-and-sign-up">
            <button type="submit" disabled={isSubmitting}> {isSubmitting ? "Logging " : "Login"} </button>
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
      </form>
    </div>
  );
}
// () => navigate("/")