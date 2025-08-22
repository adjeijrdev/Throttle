import ReactDOM from "react-dom";
import UserProfileEditInput from "./UserProfileEditInput/UserProfileEditInput";

export default function UserProfileModal({ isOpen, onClose }) {
  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <UserProfileEditInput onClose={onClose} />,
          document.getElementById("user-profile")
        )}
    </>
  );
}
