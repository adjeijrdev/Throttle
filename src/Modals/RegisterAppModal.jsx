import ReactDOM from "react-dom";
import SignupCard from "./ModalComponents/SignupCard";

export default function RegisterAppModal({ isOpen }) {
  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <SignupCard />,
          document.getElementById("trial-modal")
        )}
    </>
  );
}
