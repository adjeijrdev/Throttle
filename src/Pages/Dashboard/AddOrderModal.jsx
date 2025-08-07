import {forwardRef} from "react";
import styles from "./Dashboard.module.css";
import riderIcon from "../../Assets/icons/Rider.png"
import manualIcon from "../../Assets/icons/manualAddIcon.png"
import { useNavigate } from "react-router";

const AddOrderModal =forwardRef((props, ref)=> {
    const navigate = useNavigate();
  return (
    <div className={styles.addOrderPopUp} ref={ref}>
      {/* Option 1 - Manually Add Order */}
        <div className={styles.header}>
            Add order by?
        </div>
        <div className={styles.selectors_container}>
            <button
            onClick={()=>{
                navigate()
            }}
            >
                <img src={riderIcon} />
                Manual
            </button>
            <button>
                <img src={manualIcon} />

                Excel/CSV
            </button>
        </div>
        <div>
            <div className={styles.info_title}>Things to take note before importing order from Excel/CSV file:</div>
            <div className={styles.info}>Ensure your import file has input value for</div>
            <ul className={styles.info}>
                <li>Destination</li>
                <li>Recipient</li>
                <li>Recipient's Telephone number</li>

            </ul>
        </div>
    </div>
  )
})


export default  AddOrderModal;