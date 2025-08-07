import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router";
import { loginAPI } from "../../api/authentication";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "antd";
import { RxPerson } from "react-icons/rx";
import "./Login.css";

//importing images
import BluredBackground from "../../Assets/blured_dashboard.png";
import Man from "../../Assets/BlackModel.png";
import Logo from "../../Assets/logos/LOGO-img.png";
import EmailIcon from "../../Assets/input_icons/emailuser.png";
import padLock from "../../Assets/input_icons/padlock.png";
import RegisterAppModal from "../../Modals/RegisterAppModal";
import CustomAlert from "../../Components/Alert/CustomAlert";

const schema = z.object({
  email: z.string().trim().email("⚠ Invalid email"),
  password: z.string().trim(),
  role: z.enum(["STAFF", "VENDOR", "3PL", "RIDER"], {
    required_error: "Please select your role",
  })
  .default("STAFF"),
});

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //FORM VALIDATION
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema),
    defaultValues: {
      role: "STAFF",
    }
   });

  const onSubmit = async (data) => {
    

    try {
      const result = await loginAPI(data);
      // console.log(result);
      navigate("/")
    } catch (error) {
      toast.error(error.message, {
        style: {
          border: "1px solid oklch(88.5% 0.062 18.334)",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "oklch(39.6% 0.141 25.723)",
          fontSize: "16px",
          width: "500px",
        },
      });
      // console.log(error.message);
    }
  };


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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="white-container">
          <div className=" logo-form">
            <img src={Logo} alt="Throttle-logo" />
          </div>
          <div className="line-box">
            <div className="line-and-text">
              <span>Login or signup</span>
            </div>
          </div>
          {/* <form action=""></form> */}
          <div className="login-input-con-st">
            <div className="radio-button-group">
              <div className="login-radio-button">
                <input
                  type="radio"
                  id="Staff"
                  value="STAFF"
                  {...register("role")}
                  className=""
                />
                <label htmlFor="Staff">Staff</label>
              </div>
              <div className="login-radio-button">
                <input
                  type="radio"
                  id="rider"
                  value="RIDER"
                  {...register("role")}
                />
                <label htmlFor="rider">Rider</label>
              </div>
              <div className="login-radio-button">
                <input
                  type="radio"
                  id="Vendor"
                  value="VENDOR"
                  {...register("role")}
                />
                <label htmlFor="Vendor">Vendor</label>
              </div>
              <div className="login-radio-button">
                <input
                  type="radio"
                  id="3PL"
                  value="3PL"
                  {...register("role")}
                />
                <label htmlFor="3PL">3PL</label>
              </div>
            </div>
            {errors.role && (
              <h3
                style={{
                  color: "red",
                  marginTop: "-1rem",
                  fontSize: "1.3rem",
                  fontWeight: "450",
                }}
              >
                {errors.role.message.replaceAll("Kindly Select a role")}
              </h3>
            )}
            <div className="input-fields">
              <div className="login-input-box ">
                <RxPerson size={20} />
                <input
                  // className="input"
                  type="text"
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <h3
                  style={{
                    color: "red",
                    marginTop: "-1rem",
                    fontSize: "1.3rem",
                    fontWeight: "450",
                  }}
                >
                  {errors.email.message}
                </h3>
              )}
              <div
              className=""
              >
                <Input.Password
                  placeholder="input password"
                  iconRender={(visible) =>
                    visible ? <FaEye /> : <FaEyeSlash />
                  }
                  className="login-password"
                  onChange={(e) =>
                    setValue("password", e.target.value, {
                      shouldValidate: true
                    })
                  }
                />
                {errors.password && (
                  <h3
                    style={{
                      color: "red",
                      marginTop: "1rem",
                      fontSize: "1.3rem",
                      fontWeight: "450",
                    }}
                  >
                    Password is required
                  </h3>
                )}
              </div>

              <div className="remember-me">
                {" "}
                <p>Forget Password?</p>{" "}
              </div>
            </div>
          </div>

          <div className="button-and-sign-up">
            <button type="submit" disabled={isSubmitting}>
              {" "}
              {isSubmitting ? <BeatLoader color="white" /> : "Login"}{" "}
            </button>
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
