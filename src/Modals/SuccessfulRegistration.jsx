import ReactDOM from "react-dom";
import SuccessModal from "./SuccessfulModal/SuccessModal";


export default function SuccessfulRegistration({ isOpen, onClose }) {
  return (
    <>
      {isOpen && 
        ReactDOM.createPortal(<SuccessModal onClose={onClose}/>,
        document.getElementById("successful-registration") 
        )} 
    </>
  );
}
