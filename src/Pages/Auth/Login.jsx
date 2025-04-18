import { useNavigate, Link } from "react-router";
import "./Login.css";

//importing images
import BluredBackground from "../../Assets/blured_dashboard.png";
import Man from "../../Assets/man.png";
import Logo from "../../Assets/logos/LOGO-img.png";
import EmailIcon from "../../Assets/input_icons/emailuser.png";
import padLock from "../../Assets/input_icons/padlock.png";

export default function Login() {
  const navigate = useNavigate();

  const text =`
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
      <div className="form">
        <div className="white-container">
          <div className="logo logo-form">
            <img src={Logo} alt="Throttle-logo" />
          </div>
          <div className="line-and-text">
            <span>Login or signup</span>
          </div>
          <div className="radio-fields"></div>
          <div className="input-fields">
            <div className="input-box">
              <img src={EmailIcon} alt="emailIcon" />
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="input-box">
              <img src={padLock} alt="padlock" />
              <input type="password" placeholder="Enter password" />
            </div>

            {/* <input className="input" type="password" /> */}
          </div>
          <div className="remember-me"></div>
          <div className="button-and-sign-up">
            <button onClick={() => navigate("/")}> Login </button>
            <div className="sign-up">
              <span>
                Don't have an Account?   <Link to="/register"> Register</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

