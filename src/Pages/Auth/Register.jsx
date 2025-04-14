import "./Register.css"

//import images
import BluredBackground from "../../Assets/blured_dashboard.png";

export default function Register() {
  return (
    <div className="Register-main-container">
        <div className="green-left">
            <div className="register-text-left">
            <h1>
              Register       <span className="to-text">to</span><br/>
              <span className="throttle-text"> Throttle</span>
            </h1>
            <h3>Smart & Seamless Delivery <br/> Management!</h3>
            </div>
            <div className="blurred-image-green">
            <img src={BluredBackground} alt="Blurred-box" />
            </div>
        </div>
        <div className="white-right">
            
        </div>
    </div>
  )
}