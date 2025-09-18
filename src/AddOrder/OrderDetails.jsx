import { useRef, useState, useEffect } from "react";
import AssignModal from "./assignModal/AssignModal";
import styles from "./orderDetails.module.css";
import { useClickOutside } from "../CustomHooks/useClickOutSide";
import AssignRiderTableFilter from "./AssignOrderFilterTB/AssignRiderFilter";
import Assign3PLTableFilter from "./AssignOrderFilterTB/T3PLTBFilter";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import {
  assignOrderAPI,
  deleteSingleOrderdAPI,
  OrderInTransitAPI,
} from "../api/order";
import { GET_ORDER } from "../graphql/generalQueries";
import { useQuery } from "@apollo/client";
import { formatDateTime } from "../utils/formateDateTime";
import orderAsignIcon from "../Assets/icons/OrderAssign.png";
import { BeatLoader } from "react-spinners";
import ChangeOrderStatusModal from "./changeOrder/ChangeOrderState";
import DeliveredOTPModal from "./DeliveredOTP/DeliveredOTP";
import { FailedModal } from "./failedModal/FailedModal";
import { RejectedModal } from "./rejectedModal/RejectedModal";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAssignRiderFiltersTable, setShowAssignRiderFilterTable] =
    useState(false);
  const [showAssign3PLFiltersTable, setShowAssign3PLFilterTable] =
    useState(false);
  const [orderInTransit, setOrderInTransit] = useState(false);
  const { id } = useParams();
  const [deliveryFee, setDeliveryFee] = useState("");
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [showChangeOrderStatusModal, setChangeOrderStatusModal] =
    useState(false);
  const [showOrderCompletedOTPModal, setShowOrderCompletedOTPModal] =
    useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showRejectedModal, setShowRejectedModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const viewAbleTabs = useSelector((state) => state.staffAuth?.viewAbleTabs);

  const navigate = useNavigate();

  const showRejectedModalRef = useRef(null);
  useClickOutside(
    showRejectedModalRef,
    () => setShowRejectedModal(false)
    // buttonAddOrderRef
  );
  const showFailedModalRef = useRef(null);
  useClickOutside(
    showFailedModalRef,
    () => setShowFailedModal(false)
    // buttonAddOrderRef
  );

  const showOrderCompletedOTPModalRef = useRef(null);
  useClickOutside(
    showOrderCompletedOTPModalRef,
    () => setShowOrderCompletedOTPModal(false)
    // buttonAddOrderRef
  );

  const showChangeOrderStatusModalRef = useRef(null);
  useClickOutside(
    showChangeOrderStatusModalRef,
    () => setChangeOrderStatusModal(false)
    // buttonAddOrderRef
  );

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

  const handleShowRidersTable = () => {
    setShowAssignModal(false);
    setShowAssignRiderFilterTable(true);
  };

  const show3plAssignTBRef = useRef(null);
  useClickOutside(
    show3plAssignTBRef,
    () => setShowAssign3PLFilterTable(false)
    // buttonAddOrderRef
  );

  const handleShow3PLTable = () => {
    setShowAssignModal(false);
    setShowAssign3PLFilterTable(true);
  };

  const {
    loading: orderLoading,
    data: orderData,
    error: orderError,
    reset: orderReset,
    refetch: refetchOrder,
  } = useQuery(GET_ORDER, {
    variables: {
      orderId: id,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setDeliveryFee(orderData?.order?.deliveryFee);
  }, [orderData]);

  const handleAssignOrder = async ({ assignToID, assignToModelName }) => {
    try {
      if (deliveryFee.length < 1) {
        toast.error("Delivery fee is required", {
          style: {
            border: "1px solid oklch(88.5% 0.062 18.334)",
            // backgroundColor:"oklch(88.5% 0.062 18.334)",
            color: "oklch(39.6% 0.141 25.723)",
            fontSize: "16px",
            width: "500px",
          },
        });
        return;
      }

      const result = await assignOrderAPI({
        orderId: id,
        deliveryFee: Number.parseFloat(deliveryFee),
        assignToID,
        assignToModelName,
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
    setShowAssignRiderFilterTable(false);
  };

  const handleOrderToTransit = async () => {
    try {
      setOrderInTransit(true);

      const result = await OrderInTransitAPI(id);

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
    setOrderInTransit(false);
  };

  const handleDeleteOrder = async () => {
    try {
      setIsDeleting(true);

      const result = await deleteSingleOrderdAPI(id);

      toast.success(result?.data?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });
      navigate(-1);
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
    setIsDeleting(false);
  };

  const assignOrderStatusBackground = (status) => {
    switch (status) {
      case "ORDER PLACED":
        return "#A6CFFF";

      case "ASSIGNED":
        return "#FFEC8B";

      case "IN TRANSIT":
        return "#88AFF1";

      case "COMPLETED":
        return "#C3F9D5";
      case "RETURNED":
        return "#AFAFAF";
      case "FAILED":
        return "#FF9ABA";
      case "REJECTED":
        return "#FFCACA";
    }
  };

  return (
    <div>
      <div>
        <div className={styles.orderDetailsHeader}>
          <div className={styles.orderHeaderContainer}>
            <div>
              <div className={styles.orderDetailsTitle}>Order Details</div>
              <div className={styles.orderDetailsDescription}>
                View and manage orders.
              </div>
            </div>

            {
              !viewAbleTabs?.includes("Vendor") && (
                 <button
              className={styles.deleteOrder}
              onClick={() => handleDeleteOrder()}
            >
              {isDeleting ? <BeatLoader color="white" /> : <span>Delete</span>}
            </button>
              )
            }
           
          </div>
        </div>

        <div className={styles.orderDetails}>
          <div className={styles.orderDetailMain}>
            <div className={styles.detailsLeft}>
              <div
                className={styles.productImge}
                style={{
                  backgroundImage: `url(${orderData?.order?.productImage})`,
                  width: "90%",
                  height: "90%",
                  backgroundSize: "contain",
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {!orderData?.order?.productImage && "Product Image"}
              </div>
              <div className={styles.detailsLeftRight}>
                <div className={styles.detailsLeftTitle}>
                  {orderData?.order?.productDescription}
                </div>
                <div className={styles.Detailstotal}>
                  <span className={styles.totalCostTitle}>Total Cost:</span>
                  <span className={styles.totalConstValue}>
                    {orderData?.order?.paymentAmount &&
                      `GHC ${
                        orderData?.order?.paymentAmount +
                        orderData?.order?.deliveryFee
                      }`}
                  </span>
                </div>

                <div className={styles.border_b}>
                  <p className={styles.smallText}>Vendor Information:</p>
                  <p>
                    <span className={styles.smallTextBold}>Vendor Name:</span>
                    <span className={styles.smallText}>
                      {" "}
                      {orderData?.order?.source?.type == "SELF" && "Throttle"}
                    </span>{" "}
                  </p>
                  {orderData?.order?.source?.type != "SELF" && (
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
                  )}
                </div>
                <div>
                  <p className={styles.smallTextBold}>Delivery Status</p>
                  <p
                    className={[styles.orderStatusPlaces]}
                    style={{
                      backgroundColor: assignOrderStatusBackground(
                        orderData?.order?.status
                      ),
                    }}
                  >
                    {orderData?.order?.status}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.detailsRight}>
              <div className={styles.con1}>
                <p className={styles.con_title}>Order Information</p>
                <div className={styles.con_content}>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Order ID</p>
                    <p className={styles.con_box_value}>
                      {orderData?.order?.orderId}
                    </p>
                  </div>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Pickup Date & Time</p>
                    <p className={styles.con_box_value}>
                      {formatDateTime(orderData?.order?.orderDate || "")}
                    </p>
                  </div>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Delivery Date</p>
                    <p className={styles.con_box_value}>
                      {formatDateTime(orderData?.order?.deliveryDate || "")}
                    </p>
                  </div>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Unity Quantity</p>
                    <p className={styles.con_box_value}>
                      {orderData?.order?.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.con1}>
                <p className={styles.con_title}>Recipient Information</p>
                <div className={styles.con_content}>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Recipient Name</p>
                    <p className={styles.con_box_value}>
                      {orderData?.order?.recipientName}
                    </p>
                  </div>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Recipient Contact</p>
                    <p className={styles.con_box_value}>
                      {orderData?.order?.recipientNumber}
                    </p>
                  </div>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Alternate Contact</p>
                    <p className={styles.con_box_value}></p>
                  </div>

                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Delivery Address</p>
                    <p className={styles.con_box_value}>
                      {orderData?.order?.destination}
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
                  <p className={styles.payment}>
                    {orderData?.order?.paymentStatus}
                  </p>
                </div>

                {orderData?.order?.status !== "ORDER PLACED" && (
                  <div className={styles.down_con1_down}>
                    <div className={styles.con_box}>
                      <p className={styles.con_box_title}>Remittant(GHC)</p>
                      <p className={styles.con_box_value}>
                        {orderData?.order?.paymentAmount}
                      </p>
                    </div>
                    <div>
                      <p className={styles.con_box_title}>Delivery fee(GHC)</p>
                      <p className={styles.con_box_value}>
                        {orderData?.order?.deliveryFee}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {orderData?.order?.status === "ORDER PLACED" && (
              <div className={styles.detailsDownRight}>
                <div className={styles.down_title}>Cost</div>
                <div className={styles.cost}>
                  <div className={styles.con_box}>
                    <p className={styles.con_box_title}>Remittant(GHC)</p>
                    <p className={styles.con_box_value}>
                      {orderData?.order?.paymentAmount}
                    </p>
                  </div>
                  {!viewAbleTabs?.includes("Vendor") && (
                    <div className={styles.con_box}>
                      <p className={styles.con_box_title}>Delivery fee(GHC)</p>
                      <input
                        type="number"
                        className={styles.con_box_value}
                        value={deliveryFee}
                        onChange={(e) => setDeliveryFee(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}


            {orderData?.order?.status !== "ORDER PLACED" &&
              !viewAbleTabs?.includes("Vendor")? (
                <div className={styles.recipientBox}>
                  <p className={styles.con_title}>
                    <span>Rider</span>
                    {orderData?.order?.status === "ASSIGNED" && (
                      <button
                        onClick={() => setShowAssignModal((prev) => !prev)}
                      >
                        Reassign
                      </button>
                    )}
                  </p>

                  <div className={styles.con_content}>
                    <div className={styles.con_box}>
                      <p className={styles.con_box_title}>Rider Name</p>
                      <p className={styles.con_box_value}>
                        {orderData?.order?.assignedTo?.userProfile?.fullName}
                      </p>
                    </div>
                    <div className={styles.con_box}>
                      <p className={styles.con_box_title}>Rider Contact</p>
                      <p className={styles.con_box_value}>
                        {
                          orderData?.order?.assignedTo?.contactDetails
                            ?.phoneNumber
                        }
                      </p>
                    </div>
                    <div className={styles.con_box}>
                      <p className={styles.con_box_title}>Alternate Contact</p>
                      <p className={styles.con_box_value}>
                        {
                          orderData?.order?.assignedTo?.contactDetails
                            ?.additionalPhoneNumber
                        }
                      </p>
                    </div>

                    <div className={styles.con_box}>
                      <p className={styles.con_box_title}>Vehicle </p>
                      <p className={styles.con_box_value}>
                        {orderData?.order?.assignedTo?.vehicleInfo?.vehicleType}
                      </p>
                    </div>
                  </div>
                </div>
              )
            :
            orderData?.order?.rejectedReasons ? (
              <div className={styles.bottom_con1}>
                <p className={styles.down_title}>Remark</p>
                <textarea
                  className={styles.remarkValue}
                  value={orderData?.order?.rejectedReasons}
                  style={{
                    height:"200px"
                  }}
                ></textarea>
              </div>
            ) : (
              <div></div>
            )
            
            }
          </div>

            {
              !viewAbleTabs?.includes("Vendor")&&(
  <div className={styles.detailsBottomDown}>
            {orderData?.order?.rejectedReasons ? (
              <div className={styles.bottom_con1}>
                <p className={styles.down_title}>Remark</p>
                <textarea
                  className={styles.remarkValue}
                  value={orderData?.order?.rejectedReasons}
                ></textarea>
              </div>
            ) : (
              <div></div>
            )}

            {!viewAbleTabs?.includes("Vendor") && (
              
              <div className={styles.changeStatusContainer}>
                <div className={styles.down_title}>
                  {orderData?.order?.status === "ORDER PLACED"
                    ? "Rider/3PL"
                    : "Change status"}
                </div>
                {orderData?.order?.status === "ORDER PLACED" && (
                  <button
                    className={styles.assignBtn}
                    onClick={() => setShowAssignModal((prev) => !prev)}
                  >
                    <img src={orderAsignIcon} />
                    Assign
                  </button>
                )}

                {orderData?.order?.status === "ASSIGNED" && (
                  <button
                    className={styles.assignBtn}
                    onClick={() => handleOrderToTransit()}
                  >
                    {orderInTransit ? (
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
                        <img src={orderAsignIcon} /> In Transit
                      </span>
                    )}
                  </button>
                )}

                {orderData?.order?.status !== "ASSIGNED" &&
                  orderData?.order?.status !== "ORDER PLACED" &&( viewAbleTabs?.includes("T3PL") || viewAbleTabs?.includes("RIDER"))  && (
                    <button
                      className={styles.assignBtn}
                      onClick={() => setChangeOrderStatusModal(true)}
                    >
                      {isChangingStatus ? (
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
                          <img src={orderAsignIcon} /> Change to
                        </span>
                      )}
                    </button>
                  )}

                  {orderData?.order?.status !== "ASSIGNED" &&
                  orderData?.order?.status !== "ORDER PLACED" && viewAbleTabs?.includes("SELF")  && (
                    <button
                    className={styles.assignBtn}
                    disabled={true}
                    style={{
                      backgroundColor:"gray",
                      cursor:" not-allowed"
                    }}
                  >
                    In Transit
                    
                  </button>
                  )}
              </div>
            )}
          </div>
              )
            }
        

          {showAssignModal && (
            <AssignModal
              ref={showAssignModalRef}
              handleShowRiders={handleShowRidersTable}
              handleShow3PLTable={handleShow3PLTable}
            />
          )}
          {showAssignRiderFiltersTable && (
            <AssignRiderTableFilter
              ref={showRideAssignTBRef}
              handleAssignOrder={handleAssignOrder}
            />
          )}
          {showAssign3PLFiltersTable && (
            <Assign3PLTableFilter ref={show3plAssignTBRef}  handleAssignOrder={handleAssignOrder} />
          )}
          {showChangeOrderStatusModal && (
            <ChangeOrderStatusModal
              ref={showChangeOrderStatusModalRef}
              closeSelfHandler={setChangeOrderStatusModal}
              setShowOrderCompletedOTPModal={setShowOrderCompletedOTPModal}
              setShowFailedModal={setShowFailedModal}
              setShowRejectedModal={setShowRejectedModal}
            />
          )}

          {showOrderCompletedOTPModal && (
            <DeliveredOTPModal
              orderId={id}
              refetchOrder={refetchOrder}
              ref={showOrderCompletedOTPModalRef}
              setShowOrderCompletedOTPModal={setShowOrderCompletedOTPModal}
            />
          )}

          {showFailedModal && (
            <FailedModal
              setShowFailedModal={setShowFailedModal}
              ref={showFailedModalRef}
              refetchOrder={refetchOrder}
              orderId={id}
            />
          )}

          {showRejectedModal && (
            <RejectedModal
              setShowRejectedModal={setShowRejectedModal}
              ref={showRejectedModalRef}
              refetchOrder={refetchOrder}
              orderId={id}
            />
          )}
        </div>
      </div>
    </div>
  );
}
