import { useRef, useState } from "react";
import AssignModal from "./assignModal/AssignModal";
import styles from "./orderDetails.module.css";
import { useClickOutside } from "../CustomHooks/useClickOutSide";
import AssignRiderTableFilter from "./AssignOrderFilterTB/AssignRiderFilter";
import Assign3PLTableFilter from "./AssignOrderFilterTB/T3PLTBFilter";

export default function OrderDetails() {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAssignRiderFiltersTable, setShowAssignRiderFilterTable] =useState(false);
  const [showAssign3PLFiltersTable, setShowAssign3PLFilterTable] =useState(false);

    

  const showAssignModalRef = useRef(null);
  useClickOutside(
    showAssignModalRef,
    () => setShowAssignModal(false)
    // buttonAddOrderRef
  );

  const showRideAssignTBRef = useRef(null);
  const ignoreRideAssignTBRef = useRef(null);
  useClickOutside(
    showRideAssignTBRef,
    () => setShowAssignRiderFilterTable(false)
    // buttonAddOrderRef
  );

  const handleShowRidersTable=()=>{
    setShowAssignModal(false);
    setShowAssignRiderFilterTable(true)
  }


   const show3plAssignTBRef = useRef(null);
  useClickOutside(
    show3plAssignTBRef,
    () => setShowAssign3PLFilterTable(false)
    // buttonAddOrderRef
  );

  const handleShow3PLTable=()=>{
    setShowAssignModal(false);
   setShowAssign3PLFilterTable(true)
  }
 
  return (
    <div>
      <div>
        <div className={styles.orderDetailsHeader}>
          <div className={styles.orderDetailsTitle}>Order Details</div>
          <div className={styles.orderDetailsDescription}>
            View and manage orders.
          </div>
        </div>

        <div className={styles.orderDetails}>
          <div className={styles.orderDetailMain}>
            <div className={styles.detailsLeft}>
              <div>Product Imge</div>
              <div className={styles.detailsLeftRight}>
                <div className={styles.detailsLeftTitle}>
                  ZELOTES F-26C Rechargeable Display Dual-mode Wireless Mouse
                </div>
                <div className={styles.Detailstotal}>
                  <span className={styles.totalCostTitle}>Total Cost:</span>
                  <span className={styles.totalConstValue}>GHC 212.00</span>
                </div>

                <div className={styles.border_b}>
                  <p className={styles.smallText}>Vendor Information:</p>
                  <p>
                    <span className={styles.smallTextBold}>Vendor Name:</span>
                    <span className={styles.smallText}>
                      {" "}
                      Tech Haven Store
                    </span>{" "}
                  </p>
                  <p>
                    <span className={styles.smallTextBold}>
                      Vendor Contact:
                    </span>{" "}
                    <span
                      className={styles.smallText}
                      style={{ color: "#0074FF" }}
                    >
                      {" "}
                      suppoert@gmakdk.com
                    </span>
                  </p>
                </div>
                <div>
                  <p className={styles.smallTextBold}>Delivery Status</p>
                  <p className={[styles.orderStatusPlaces]}>Order Placed</p>
                </div>
              </div>
            </div>

            <div className={styles.detailsRight}>
              <div className={styles.con1}>
                <p className={styles.con_title}>Order Information</p>
                <div className={styles.con_content}>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Order ID</p>
                    <p className={styles.con_box_value}>AOM600</p>
                  </div>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Pickup Date & Time</p>
                    <p className={styles.con_box_value}>21-12-2024, 01:53</p>
                  </div>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Delivery Date</p>
                    <p className={styles.con_box_value}>02-2-2023</p>
                  </div>
                </div>
              </div>
              <div className={styles.con1}>
                <p className={styles.con_title}>Recipient Information</p>
                <div className={styles.con_content}>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Customer Name</p>
                    <p className={styles.con_box_value}>James Owusu</p>
                  </div>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Customer Contact</p>
                    <p className={styles.con_box_value}>+23355123843</p>
                  </div>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Alternate Contact</p>
                    <p className={styles.con_box_value}>+2332348347375</p>
                  </div>

                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Delivery Address</p>
                    <p className={styles.con_box_value}>
                      House No.21,East Legon, Accra, Ghana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.orderDetailDownMain}>
            <div className={styles.detailsDownLeft}>
              <div className={styles.downTitle}>Payment Details </div>
              <div>
                <div>
                  <p className={styles.smallTextBold}>Payment Status</p>
                  <p className={styles.payment}>Pending</p>
                </div>
                <div className={styles.down_con1_down}>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Remittant(GHC)</p>
                    <p className={styles.con_box_value}>187.00</p>
                  </div>
                  <div>
                    <p className={styles.con_box_title}>Delivery fee(GHC)</p>
                    <p className={styles.con_box_value}>25.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.detailsDownRight}>
              <div className={styles.down_title}>Cost</div>
              <div className={styles.cost}>
                <div className={styles.con_box}>
                  <p className={styles.con_box_title}>Remittant(GHC)</p>
                  <p className={styles.con_box_value}>187.00</p>
                </div>
                <div className={styles.con_box}>
                  <p className={styles.con_box_title}>Delivery fee(GHC)</p>
                  <p className={styles.con_box_value}>25.00</p>
                </div>
                <div className={styles.con_box}>
                  <p className={styles.con_box_title}>Contact</p>
                  <p className={styles.con_box_value}>+2332084757332</p>
                </div>
                <div className={styles.con_box}>
                  <p className={styles.con_box_title}>Vehicle</p>
                  <p className={styles.con_box_value}>Yamaha 125 Motorbike</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.detailsBottomDown}>
            <div className={styles.bottom_con1}>
              <p className={styles.down_title}>Remark</p>
              <textarea
                className={styles.remarkValue}
                value={"review value"}
              ></textarea>
            </div>
            <div className={styles.changeStatusContainer}>
              <div className={styles.down_title}>Rider/3PL</div>
              <button
                className={styles.assignBtn}

                onClick={() => setShowAssignModal((prev) => !prev)}
              >
                Assign
              </button>
            </div>
          </div>

          {showAssignModal && (
            <AssignModal
              ref={showAssignModalRef}
              handleShowRiders={handleShowRidersTable}
              handleShow3PLTable={handleShow3PLTable}
            />
          )}
          {showAssignRiderFiltersTable && (
            <AssignRiderTableFilter ref={showRideAssignTBRef} />
          )}
           {showAssign3PLFiltersTable && (
            
            <Assign3PLTableFilter ref={show3plAssignTBRef} />
          )}
        </div>
      </div>
    </div>
  );
}
