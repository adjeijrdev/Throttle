import styles from "./deliveredOTP.module.css";
import { BeatLoader } from "react-spinners";
import orderAsignIcon from "../../Assets/icons/OrderAssign.png";
import { forwardRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OrderCompletedAPI } from "../../api/order";


const DeliveredOTPModal = forwardRef(({orderId,refetchOrder,setShowOrderCompletedOTPModal }, ref) => {
    const [inputOne, setInputOne] = useState()
    const [inputTwo, setInputTwo] = useState()
    const [inputThree, setInputThree] = useState()
    const [inputFour, setInputFour] = useState()
    const [inputFive, setInputFive] = useState()
    const [canNotSubmit, setCanNotSubmit] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [otp, setOTP] = useState();

    useEffect(()=>{
        const _otp = `${inputOne}${inputTwo}${inputThree}${inputFour}${inputFive}`;
        setOTP(_otp);

        if(_otp.trim().length === 5){
                setCanNotSubmit(false)
        }else{
                setCanNotSubmit(true)
        }

    },[inputOne,inputTwo,inputThree,inputFour,inputFive])

      const handleCompleteOrder = async () => {
        try {
          setIsSubmitting(true)
    
          const result = await OrderCompletedAPI({
            orderId: orderId,
            otpCode:otp
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
          setShowOrderCompletedOTPModal(false)
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
      setIsSubmitting(false)
      };



  return (
    <div className={styles.modalContainer} ref={ref}>
      <p className={styles.modalTitle}>Change status to</p>

      <div className={styles.otpBoxContainer}>
        <input type="text" placeholder="-" maxLength={1}  value={inputOne} onChange={(e)=> setInputOne(e.target.value)}/>
        <input type="text" placeholder="-" maxLength={1}  value={inputTwo} onChange={(e)=> setInputTwo(e.target.value)}/>
        <input type="text" placeholder="-" maxLength={1}  value={inputThree} onChange={(e)=> setInputThree(e.target.value)}/>
        <input type="text" placeholder="-"maxLength={1}   value={inputFour} onChange={(e)=> setInputFour(e.target.value)}/>
        <input type="text" placeholder="-"maxLength={1}   value={inputFive} onChange={(e)=> setInputFive(e.target.value)}/>
     
      </div>

      <button
        className={styles.btn}
        disabled={canNotSubmit}
        style={{
            backgroundColor: canNotSubmit ? "#b0b9b7ff": "#17654F"
        }}
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
            <img src={orderAsignIcon} /> Completed
          </span>
        )}
      </button>
    </div>
  );
});

export default DeliveredOTPModal;
