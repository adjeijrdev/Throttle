import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import style from "./PhoneNumberInput.module.css";
export default function PhoneNumberInput({ value, onChange, error }) {
  return (
    <>
      <div className={style["phone-input-wrapper"]}>
        <div className={style["flex-container"]}>
          <PhoneInput
            className={`${style.phoneInput} ${error ? style.error : ""}`}
            international
            defaultCountry="GH"
            value={value}
            onChange={onChange}
            error={error ? "Invalid phone number" : undefined}
          />
        </div>
      </div>
      {error && <span className={style.errorMessage}>{error}</span>}
    </>
  );
}
