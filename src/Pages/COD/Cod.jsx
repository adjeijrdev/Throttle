import styles from "./Cod.module.css";
import funnelIcon from "../../Assets/icons/funnel.png";
import greencheckIcon from "../../Assets/icons/greencheck.png";
import moneyIcon from "../../Assets/icons/money.png";
import cashIcon from "../../Assets/icons/cash.png";
import redclockIcon from "../../Assets/icons/redclock.png";
import payIcon from "../../Assets/icons/pay.png";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import CustomDatePicker from "../../Components/datePicker/CustomDatePicker";
import Select from "react-select";
import CustomSelector2 from "../../Components/form/selector/CustomSelecter2";

import { useClickOutside } from "../../CustomHooks/useClickOutSide";
import { MdOutlineArrowDropDown } from "react-icons/md";
import {useRef,useEffect} from "react"
import RightItemSelectTB from "../../Components/RightItemSelectTB/RightItemSelectTB";


export default function Cod() {
  const [orderIds, setOrderIds] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
 
 

  const filterOptions = [
    "All",
    "Order Placed",
    "In Transit",
    "Assigned",
    "Completed",
    "Returned",
    "Failed",
    "Rejected",
  ];


  // Mock data - replace with your actual data fetching logic
  const mockOrderData = [
    {
      dateTime: "2024-12-10, 01:53",
      id: "A0M600",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Add",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",

    },
    {
      dateTime: "2024-12-10, 01:53",
      id: "A0M601",
      vendor: "Ishtari Ghana",
     status: "Completed",
      action: "Add",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-12-10, 01:53",
      id: "A0M602",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Add",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      date: "2024-10-30, 01:53",
      id: "A0M603",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Add",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30, 01:53",
      id: "A0M604",
      vendor: "Ishtari Ghana",
     status: "Completed",
      action: "Add",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30,01:53",
      id: "A0M605",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Add",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30, 01:53",
      id: "A0M6306",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Add",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30, 01:53",
      id: "A0M6057",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Add",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30, 01:53",
      id: "A0M6078",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Add",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30, 01:53",
      id: "A0M5609",
      vendor: "Ishtari Ghana",
     status: "Completed",
      action: "Add",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
  ];


  const data = mockOrderData.map(order => [
      order.dateTime || '',
      order.id || '',
      order.vendor || '',
      order.status || '',
      order.action || '',
      order.orderprice || '',
      order.deliveryfee || '',
      order.rider || ''
    
    ]);
  const handleSearch = () => {
    if (!orderIds.trim()) {
      alert("Please enter at least one order ID");
      return;
    }

    // Split the input by commas or newlines and trim whitespace
    const ids = orderIds
      .split(/[\n,]+/)
      .map((id) => id.trim())
      .filter((id) => id);

    // In a real app, you would make an API call here
    // For now, we'll filter the mock data
    const results = mockOrderData.filter((order) => ids.includes(order.id));

    setSearchResults(results);
    setShowTable(true);
  };

  const handleReset = () => {
    setOrderIds("");
    setSearchResults([]);
    setShowTable(false);
    setStatusFilter("");
  };

  const handleAddAction = (orderId) => {
    // Handle the add action for the specific order
    console.log(`Add action triggered for order ${orderId}`);
    alert(`Add action triggered for order ${orderId}`);
  };

  const toggleTable = () => {
    setShowTable(!showTable);
  };
  const statusClass = {
    Completed: styles.completed,
    Rejected: styles.rejected,
    "In Transit": styles.inProgress,
    Failed: styles.failed,
    Assigned: styles.assigned,
    Returned: styles.returned,
    "Order Placed": styles.inProgress,
  };

  const deliveryStatusOptions = [
    { value: "all", label: "All" },
    { value: "delivered", label: "Delivered" },
    { value: "pending", label: "Pending Remittance" },
    { value: "remitted", label: "Remitted" },
  ];



 

  return (
    <div className="dashboard-content">
      <div>
        <div
          style={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: " 0.25rem solid #ddd",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ display: "grid" }}>
            <div className={styles.overview}>Cash on Delivery</div>
            <div className={styles.overviewtext}>
              Filter Cash on Delivery records by vendor, 3pl or date
            </div>
          </div>
        </div>

        <div className={styles.filed1}>
          <div className={styles.filed1_in1}>
            <div className={styles.detailstitle}>Filters <img
                src={funnelIcon}
                alt="funnel Icon"
                style={{ width: "16px", height: "16px" }}
              /></div>
            <div className={styles.filed1_in1}>
            <div className={styles.detailstitleR}> Date Range</div>
            <div className={styles.OutercontainerRight}>
              <div className={styles.filed1_in2_con1}>
                <label>From</label>
                <CustomDatePicker/>
              </div>
              <div className={styles.filed1_in2_con1}>
                <label>To</label>
                <CustomDatePicker/>
              </div>
            </div>
          </div>
             <div className={styles.Outercontainertwo}>
            <div className={styles.remarks}>
              <label>Vendor</label>
              <CustomSelector2
                  options={deliveryStatusOptions}
                  selectedValue={deliveryStatus}
                  setSelectedValue={setDeliveryStatus}
                  placeholder={"All Vendors"}
                  width="490px"
                
                />
                
            </div>
            <div className={styles.remarks}>
              <label>3PL</label>
             <CustomSelector2
                  options={deliveryStatusOptions}
                  selectedValue={deliveryStatus}
                  setSelectedValue={setDeliveryStatus}
                  placeholder={"All 3PLs"}
                   width="490px"
                 
                />
            </div>
            <div className={styles.remarks}>
              <label>Rider</label>
              <CustomSelector2
                  options={deliveryStatusOptions}
                  selectedValue={deliveryStatus}
                  setSelectedValue={setDeliveryStatus}
                  placeholder={"All Riders"}
                   width="490px"
                 
                />
            </div>
          </div>
          </div>
          

          {/* <button className={styles.verticalButton} onClick={toggleTable} >
            <ChevronLeft
              size={18}
              style={{
                transform: showTable ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

       
          <div className={ showTable ? styles.showTabe_st : styles.dontShowTb_st}>
          <RightItemSelectTB showTable={ showTable} toggleTable={toggleTable}/>
          </div> */}

          
        </div>

<div className={styles.carditem}>
  <button className={styles.carditem_1}>
     <span className={styles.iconwrap_1}>
      <img src={greencheckIcon} alt="check" size={12}/>
      </span><div style={{display:"flex",flexDirection:"column"}}>
        <text style={{color:"#17654F"}}>Completed Orders</text>
        <text style={{fontWeight:"600", fontSize:"2.5rem", display:"inline-flex"}}>1,308</text>
        </div></button>

  <button  className={styles.carditem_1}>
    <span className={styles.iconwrap_2}>
      <img src={moneyIcon} alt="moneybag" size={12} />
      </span><div style={{display:"flex",flexDirection:"column"}}>
        <text style={{color:"#AD7611"}}>Total Revenue</text>
        <text style={{fontWeight:"600", fontSize:"2.5rem", display:"inline-flex"}}>GHC2,394.70</text>
        </div></button>

  <button className={styles.carditem_1}>
    <span className={styles.iconwrap_3}>
      <img src={cashIcon} alt="cash" size={12} />
      </span><div style={{display:"flex",flexDirection:"column"}}>
        <text style={{color:"#115FAD"}}> Total Delivery Fees</text>
        <text style={{fontWeight:"600", fontSize:"2.5rem", display:"inline-flex"}}>GHC1,227.30</text>
        </div></button>

  <button className={styles.carditem_1}>
    <span className={styles.iconwrap_4}>
      <img src={redclockIcon} alt="redclock" size={12}/>
      </span><div style={{display:"flex",flexDirection:"column"}}>
        <text style={{color:"#E11515"}}>Pending Remittance</text>
         <text style={{fontWeight:"600", fontSize:"2.5rem", display:"inline-flex"}}>GHC1,167.40</text>
      </div>
      </button>

  <button className={styles.carditem_1}>
    <span className={styles.iconwrap_5}>
      <img src={payIcon} alt="money" size={12} />
      </span><div style={{display:"flex",flexDirection:"column"}}>
         <text style={{color:"#43A047"}}>Paid to Vendor</text>
         <text style={{fontWeight:"600", fontSize:"2.5rem", display:"inline-flex"}}>GHC0.00</text>
      </div>
      </button>
</div>

 <div className={styles.tableContainer}>
                <table className={styles.orderTable}>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Vendor</th>
                        <th>Delivery Date & Time</th>
                        <th>Order Price</th>
                        <th>Delivery Fee</th>
                        <th>3PL/Rider</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
  {mockOrderData.map((order) => (
    
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.vendor}</td>
      <td>{order.dateTime}</td>
      <td style={{color:"red"}}>{order.orderprice}</td>
      <td style={{color:"blue"}}>{order.deliveryfee}</td>
      <td>{order.rider}</td>
      <td>
        <span className={`${styles.statusPill} ${statusClass[order.status] || ''}`}>
          {order.status}
        </span>
      </td>
      <td>
        <button 
          className={styles.actionButton}
          onClick={() => handleAddAction(order.id)}
        >
          {order.action}
        </button>
      </td>
    </tr>
  ))}
</tbody>

                </table>
              </div>
      </div>
    </div>
  );
}

