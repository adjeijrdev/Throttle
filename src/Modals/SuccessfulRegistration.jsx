import ReactDOM from "react-dom";
import SuccessModal from "./SuccessfulModal/SuccessModal";


export default function SuccessfulRegistration() {
  return (

      ReactDOM.createPortal(<SuccessModal />,
      document.getElementById("successful-registration") )
    
  );
}
