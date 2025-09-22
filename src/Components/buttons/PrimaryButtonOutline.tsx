import { BeatLoader } from "react-spinners";
import styles from "./primaryButton.module.css";

export default function PrimaryButtonOutline({ onClick, disabled, text }) {
  return (
    <button
      className={styles.outlineContainer}
      onClick={() => onClick()}
      disabled={disabled}
    >
        {disabled ? <BeatLoader color="white" /> : text}
      
    </button>
  );
}
