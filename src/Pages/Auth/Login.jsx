import { useNavigate } from "react-router";
import "./Login.css";

//importing images
import BluredBackground from "../../Assets/blured_dashboard.png";
import Man from "../../Assets/man.png";

export default function Login() {
  // const navigate = useNavigate();
  // onClick={() => navigate("/")}

  const text = `
  A powerful delivery management system designed to act as a trusted
  middleman between businesses and customers. Whether you're a vendor,
  rider, or administrator, our platform ensures smooth order
  processing, real-time tracking, and secure payment handling.
`;

  return (
    <div className="main-container-box">
      <div className="green-side">
        <div className="text-on-green">
          <h1>
            Welcome <span className="to-text">to</span>{" "}
            <span className="throttle-text" >Throttle</span>
          </h1>
          <h3>Smart & Seamless Delivery Management!</h3>
          <pre>{text}</pre>
        </div>
        <div className="blurred-box">
          <img src={BluredBackground} alt="Blurred-box" />
        </div>
        <div className="man-box">
          <img src={Man} alt="Man-model" />
        </div>
      </div>
      <div className="form"></div>
    </div>
  );
}
