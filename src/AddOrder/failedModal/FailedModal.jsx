import { forwardRef, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import orderAsignIcon from "../../Assets/icons/OrderAssign.png";
import toast from "react-hot-toast";
import styles from "./failedModal.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { OrderFailedAPI } from "../../api/order";
export const FailedModal = forwardRef(
  ({ setShowFailedModal, refetchOrder,orderId }, ref) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [remark, setRemark] = useState("");

    const handleCompleteOrder = async () => {
      try {
        setIsSubmitting(true);

        const result = await OrderFailedAPI({
          orderId: orderId,
          remark: remark,
        });

        toast.success(result?.data?.message, {
          style: {
            border: "1px solid #17654F",
            // backgroundColor:"oklch(88.5% 0.062 18.334)",
            color: "black",
            fontSize: "16px",
            width: "500px",
          },
        });
        refetchOrder();
        setShowFailedModal(false)
      } catch (error) {
        toast.error(error?.message, {
          style: {
            border: "1px solid oklch(88.5% 0.062 18.334)",
            // backgroundColor:"oklch(88.5% 0.062 18.334)",
            color: "oklch(39.6% 0.141 25.723)",
            fontSize: "16px",
            width: "500px",
          },
        });
      }
      setIsSubmitting(false);
    };

    return (
      <div className={styles.fullPage}>
        <div className={styles.modalContainer} ref={ref}>
          <p className={styles.headerContainer}>
            <span> Remark</span>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => setShowFailedModal(false)}
            >
              <IoIosCloseCircleOutline size={24} />
            </button>
          </p>
          <div className={styles.mainContent}>
            <textarea 
                    onChange={(e)=>setRemark(e.target.value)}
                    value={remark}
            />

            <button
              className={styles.btn}
              onClick={() => handleCompleteOrder()}
            >
              {isSubmitting ? (
                <BeatLoader color="white" />
              ) : (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <img src={orderAsignIcon} /> Failed
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
);
