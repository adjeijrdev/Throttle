import { useNavigate } from "react-router";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="main-container-box" onClick={() => navigate("/")}>
      <div className="green-side"></div>
      <div className="form"></div>
    </div>
  );
}
