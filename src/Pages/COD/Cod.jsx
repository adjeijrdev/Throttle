import styles from "./Cod.module.css";
import reseticon from "../../Assets/icons/reseticon.png";
import searchicon from "../../Assets/icons/searchicon.png";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import CustomDatePicker from "../../Components/datePicker/CustomDatePicker";

export default function Cod() {
  const [orderIds, setOrderIds] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [statusFilter, setStatusFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filterOptions = [
    "All",
    "Order Placed",
    "In Progress",
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
      status: "In Progress",
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
      id: "A0M606",
      vendor: "Ishtari Ghana",
      status: "Returned",
      action: "Add",
    },
    {
      date: "2024-10-30",
      id: "A0M607",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Add",
    },
    {
      date: "2024-10-30",
      id: "A0M608",
      vendor: "Ishtari Ghana",
      status: "Rejected",
      action: "Add",
    },
    {
      date: "2024-10-30",
      id: "A0M609",
      vendor: "Ishtari Ghana",
      status: "In Progress",
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
    "In Progress": styles.inProgress,
    Failed: styles.failed,
    Assigned: styles.assigned,
    Returned: styles.returned,
    "Order Placed": styles.inProgress,
  };

  return (
    <div className="dashboard-content">
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
            Search bulk orders by entering order ID
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "2.5rem" }}>
        <div className={styles.Outercontainer}>
          {!showTable ? (
            <div style={{ display: "flex", gap: "4rem" }}>
              <div style={{ display: "grid" }}>
                <div className={styles.detailstitle}>Enter/Search Order ID</div>
                <textarea
                  value={orderIds}
                  onChange={(e) => setOrderIds(e.target.value)}
                  rows={10}
                ></textarea>
              </div>
              <div className={styles.OutercontainerRight}>
                <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Date Range
                </span>
                <div>
                  <label>From</label>
                  <CustomDatePicker />
                </div>
                <div>
                  <label>To</label>
                  <CustomDatePicker />
                </div>
                <div className={styles.statusControl}>
                  <label>Delivery Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setFilter(e.target.value === "" ? "All" : e.target.value);
                    }}
                  >
                    <option value="">Choose Delivery Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Returned">Returned</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.orderTable}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Vendor</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.length > 0 ? (
                    searchResults.map((order) => (
                      <tr key={order.id}>
                        <td>{order.date}</td>
                        <td>{order.id}</td>
                        <td>{order.vendor}</td>
                        <td>
                          <span
                            className={`${styles.statusPill} ${
                              statusClass[order.status] || ""
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          {" "}
                          <button
                            className={styles.actionButton}
                            onClick={() => handleAddAction(order.id)}
                          >
                            {order.action}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {orderIds
                          ? "No orders found"
                          : "Enter order IDs and click Search"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <button className={styles.verticalButton} onClick={toggleTable}>
          <ChevronLeft
            size={18}
            style={{ transform: showTable ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </div>

      <div className={styles.Outercontainertwo}>
        <div className={styles.remarks}>
          <label>Delivery Vendor</label>
          <input type="text" placeholder="Choose Vendor"></input>
        </div>
        <div className={styles.remarks}>
          <label>3PL</label>
          <input type="text" placeholder="Choose 3PL"></input>
        </div>
        <div className={styles.remarks}>
          <label>Rider</label>
          <input type="text" placeholder="Choose Rider"></input>
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
  );
}
