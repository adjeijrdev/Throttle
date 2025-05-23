import ReactDOM from "react-dom";
import SignupCard from "./ModalComponents/SignupCard";

export default function RegisterAppModal({ isOpen, onCLose }) {
  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <SignupCard onClose={onCLose} />,
          document.getElementById("trial-modal")
        )}
    </>
  );
}
