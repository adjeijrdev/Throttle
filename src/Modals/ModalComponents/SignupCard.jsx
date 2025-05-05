import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./SignupCard.css";

//importing images
import Vendors from "../../Assets/icons/Vendors.png";
import Rider from "../../Assets/icons/Rider.png";

export default function SignupCard({ onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleCardClick = (e) => e.stopPropagation();

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="register-modal-card" onClick={handleCardClick}>
        <h2>Register as?</h2>
        <img src={Vendors} alt="v" />
        <div
          className="register-modal-button"
          onClick={() => navigate("/register")}
        >
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
