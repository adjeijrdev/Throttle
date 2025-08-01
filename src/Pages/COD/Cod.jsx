import styles from "./Cod.module.css";
import reseticon from "../../Assets/icons/reseticon.png";
import searchicon from "../../Assets/icons/searchicon.png";
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
      date: "2024-12-10",
      id: "A0M600",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Add",
    },
    {
      date: "2024-12-10",
      id: "A0M601",
      vendor: "Ishtari Ghana",
      status: "Rejected",
      action: "Add",
    },
    {
      date: "2024-12-10",
      id: "A0M602",
      vendor: "Ishtari Ghana",
      status: "In Transit",
      action: "Add",
    },
    {
      date: "2024-10-30",
      id: "A0M603",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Add",
    },
    {
      date: "2024-10-30",
      id: "A0M604",
      vendor: "Ishtari Ghana",
      status: "Failed",
      action: "Add",
    },
    {
      date: "2024-10-30",
      id: "A0M605",
      vendor: "Ishtari Ghana",
      status: "Assigned",
      action: "Add",
    },
    {
      date: "2024-10-30",
      id: "A0M6306",
      vendor: "Ishtari Ghana",
      status: "Returned",
      action: "Add",
    },
    {
      date: "2024-10-30",
      id: "A0M6057",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Add",
    },
    {
      date: "2024-10-30",
      id: "A0M6078",
      vendor: "Ishtari Ghana",
      status: "Rejected",
      action: "Add",
    },
    {
      date: "2024-10-30",
      id: "A0M5609",
      vendor: "Ishtari Ghana",
      status: "In Transit",
      action: "Add",
    },
  ];

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
            <div className={styles.detailstitle}>Filters</div>
            <div className={styles.filed1_in1}>
            <div className={styles.detailstitle}> Date Range</div>
            <div className={styles.OutercontainerRight}>
              <div className={styles.filed1_in2_con1}>
                <label>From</label>
                <CustomDatePicker />
              </div>
              <div className={styles.filed1_in2_con1}>
                <label>To</label>
                <CustomDatePicker />
              </div>
              {/* <div className={styles.statusControl}>
                <label>Delivery Status</label>
                <CustomSelector2
                  options={deliveryStatusOptions}
                  selectedValue={deliveryStatus}
                  setSelectedValue={setDeliveryStatus}
                  placeholder={"Select Delivery Status"}
                />
                
              </div> */}
            </div>
          </div>
          </div>
          

          <button className={styles.verticalButton} onClick={toggleTable} >
            <ChevronLeft
              size={18}
              style={{
                transform: showTable ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

       
          <div className={ showTable ? styles.showTabe_st : styles.dontShowTb_st}>
          <RightItemSelectTB showTable={ showTable} toggleTable={toggleTable}/>
          </div>
          
        </div>

              

        <div>
          <div className={styles.Outercontainertwo}>
            <div className={styles.remarks}>
              <label>Vendor</label>
              <CustomSelector2
                  options={deliveryStatusOptions}
                  selectedValue={deliveryStatus}
                  setSelectedValue={setDeliveryStatus}
                  placeholder={"Select Delivery Status"}
                  width="400px"
                
                />
                
            </div>
            <div className={styles.remarks}>
              <label>3PL</label>
             <CustomSelector2
                  options={deliveryStatusOptions}
                  selectedValue={deliveryStatus}
                  setSelectedValue={setDeliveryStatus}
                  placeholder={"Select Delivery Status"}
                   width="400px"
                 
                />
            </div>
            <div className={styles.remarks}>
              <label>Rider</label>
              <CustomSelector2
                  options={deliveryStatusOptions}
                  selectedValue={deliveryStatus}
                  setSelectedValue={setDeliveryStatus}
                  placeholder={"Select Delivery Status"}
                   width="400px"
                 
                />
            </div>
          </div>

          <div className={styles.btncontainer}>
            <button className={styles.resetbtn} onClick={handleReset}>
              <img
                src={reseticon}
                alt="reset Icon"
                style={{ width: "16px", height: "16px" }}
              />{" "}
              Reset
            </button>
            <button className={styles.searchbtn} onClick={handleSearch}>
              <img
                src={searchicon}
                alt="search Icon"
                style={{ width: "16px", height: "16px" }}
              />{" "}
              Search
            </button>
          </div>
        </div>
      </div>

      <div className={styles.result_con}>

        <div className={styles.result_con_field1}>
          <div className={styles.result_field_label}>Total Amount Collected (GH₵)</div>
          <div className={styles.result_field_value}>200</div>
        </div>

        <div className={styles.result_con_field1}>
          <div className={styles.result_field_label}>Total Amount Collected (GH₵)</div>
          <div className={styles.result_field_value}>200</div>
        </div>

        <div className={styles.result_con_field1}>
          <div className={styles.result_field_label}>Total Amount Collected (GH₵)</div>
          <div className={styles.result_field_value}>200</div>
        </div>

        <div className={styles.result_con_field1}>
          <div className={styles.result_field_label}>Total Amount Collected (GH₵)</div>
          <div className={styles.result_field_value}>200</div>
        </div>

      </div>
    </div>
  );
}

