import { useNavigate } from "react-router-dom";

//importing Componenets
import ThirdPartyStepper from "../../Components/ThirdPartyStepper";

//import images
import BluredBackground from "../../Assets/blured_dashboard.png";
import Logo from "../../Assets/logos/LOGO-img.png";

export default function RegisterThirdParty() {
  const navigate = useNavigate();
  return (
    <div className="Register-main-container">
      <div className="green-left">
        <div className="register-text-left">
          <h1>
            Register <span className="to-text">to</span>
            <br />
            <span className="throttle-text"> Throttle</span>
          </h1>
          <h3>
            Smart & Seamless Delivery <br /> Management!
          </h3>
        </div>
        <div className="blurred-image-green">
          <img src={BluredBackground} alt="Blurred-box" />
        </div>
      </div>
      <div className="white-right">
        <div className="logo registering-part-logo">
          <img src={Logo} alt="Throttle-logo" />
        </div>
        <div className="registring-part-form-contianer">
          <div className="close" onClick={()=> navigate('/login')} > <h1>X</h1></div>
          <ThirdPartyStepper name="Third-Party Logistics" />
        </div>
      </div>
    </div>
  );
}