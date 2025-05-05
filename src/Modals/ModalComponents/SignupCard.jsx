import { useNavigate } from "react-router";
import "./SignupCard.css";

//importing images
import Vendors from "../../Assets/icons/Vendors.png";
import Rider from "../../Assets/icons/Rider.png";

export default function SignupCard() {
  const navigate = useNavigate();
  return (
    <div className="modal-background">
      <div className="register-modal-card">
        <h2>Register as?</h2>
        <img src={Vendors} alt="v" />
        <div className="register-modal-button" onClick={() => navigate("/register")}>
          <img src={Vendors} alt="vendors-logo" />
          <p>Vendor</p>
        </div>
        <div
          className="register-modal-button"
          onClick={() => navigate("/register-rider")}
        >
          <img src={Rider} alt="rider-logo" />
          <p>Rider</p>
        </div>
      </div>
    </div>
  );
}
