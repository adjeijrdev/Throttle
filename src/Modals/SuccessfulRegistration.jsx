import ReactDOM from "react-dom";
import SuccessModal from "./SuccessfulModal/SuccessModal";


export default function SuccessfulRegistration({ isOpen }) {
  return (
    <>
      {isOpen && 
        ReactDOM.createPortal(<SuccessModal/>,
        document.getElementById("successful-registration") 
        )} 
    </>
  );
}
