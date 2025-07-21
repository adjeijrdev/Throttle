import { useEffect } from "react";
import { useNavigate } from "react-router";
import SuccessStyle from "./SuccessfulModal.module.css";

import check from "../../Assets/icons/Successful.png";


export default function SuccessModal({ onClose }) {
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
    <div className={ SuccessStyle["modal-background"]} onClick={ onClose } >
      <div className={ SuccessStyle["main-card"]} onClick={handleCardClick}> 
        <img src={check} alt="success check" />
        <div className={SuccessStyle.text}>
          <h1>Registration Successful!</h1>
          <h2 className={SuccessStyle.subtitle}>Thank you for registering your business on <span>THROTTLE.</span></h2>
          <p>Your account is currently under review and will be approved and activated shortly. <br/>A confirmation email will be sent to your registered email address once approval is<br/> complete.</p>
          <h2>We appreciate your interest in partnering with us!</h2>
        </div>
        <div className={SuccessStyle.button}>
          <button  type="submit"  >Ok </button>
        </div>
      </div>
    </div>
  )
}
