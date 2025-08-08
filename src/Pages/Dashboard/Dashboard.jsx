import { useState, useRef, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Pagination from "./Pagination";
import StatCard from "./StatCard";
import staticon from "../../Assets/icons/staticon.png";
import { Upload, Eye, ChevronDown } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DateFilter from "./DateFilter";
import locationIcon from "../../Assets/icons/location.png";
import boxIcon from "../../Assets/icons/smallbox.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CustomDateRangePicker from "../../Components/dateRangePicker/CustomDateRangePicker";
import { useClickOutside } from "../../CustomHooks/useClickOutSide";
import { format, parseISO } from "date-fns";
import { SlCalender } from "react-icons/sl";
import AddOrderModal from "./AddOrderModal";
import { useSearch } from "../../graphql/graphqlConfiguration";
import { GET_ALL_ORDERS } from "../../graphql/generalQueries";
import PaginatedTabs from "../../Components/paginationTab/paginationTabs";
import { Spin } from "antd";
import { formatDateTime } from "../../utils/formateDateTime";
import { useNavigate } from "react-router";

export default function Dashboard(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;
  
  const itemsPerPage = 15;
  const [itemOffset, setItemOffset] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  const [allOrders, setAllOrders] = useState();
  const navigate = useNavigate()
    const {
      debouncedSearch,
      data: orderData,
      loading: orderLoading,
      error: orderError,
      fetchMore: fetchMoreOrder,
    } = useSearch(GET_ALL_ORDERS, itemOffset, itemsPerPage);

  const totalNumberOfOrders = orderData?.orders?.totalCount;

  useEffect(()=>{
  console.log("order ",orderData)

    setAllOrders(orderData)
  },[orderData])
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const [filter, setFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);

  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });
  const [selectionPhase, setSelectionPhase] = useState("start");
  const [showDateFilter, setShowDateFilter] = useState(false);

  const [stateDateRingeState, setDateRingeState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const dateRangePickerRef = useRef(null);
  const buttonDateRangePickerRef = useRef(null);
  useClickOutside(
    dateRangePickerRef,
    () => setShowDateFilter(false),
    buttonDateRangePickerRef
  );

  const formatDate = (dateString) => {
    try {
      if (!dateString) return null;
      const [day, month, year] = dateString.split("-");
      return new Date(`${year}-${month}-${day}`);
    } catch (error) {
      console.error("Error formatting date:", error);
      return null;
    }
  };
  const [enteredDate, setEnteredDate] = useState("");

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const handleFilter = (range) => {
    if (range.start > range.end) {
      alert("End date must be after start date");
      return;
    }
    setDateRange(range);
    setShowDateFilter(false);
  };


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

  const statusClass = {
    Completed: styles.completed,
    Rejected: styles.rejected,
    "In Progress": styles.inProgress,
    Failed: styles.failed,
    Assigned: styles.assigned,
    Returned: styles.returned,
    "Order Placed": styles.inProgress,
  };

  // Add validation to your order data
  const validateOrderDates = (orders) => {
    return orders.every((order) => {
      const [d, m, y] = order.orderdate.split("-");
      return d && m && y && !isNaN(new Date(y, m - 1, d));
    });
  };


  // Improved date filtering logic
  const filteredOrders = allOrders?.orders?.data?.filter((order) => {
    // Status filter
    const statusMatch = filter === "All" || order.status === filter;

    // Skip date filtering if no range selected
    if (!dateRange.start || !dateRange.end) return statusMatch;

    try {
      const orderDate = new Date(order.orderdate);
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);

      // Normalize times for comparison
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      orderDate.setHours(0, 0, 0, 0);

      return statusMatch && orderDate >= start && orderDate <= end;
    } catch (e) {
      console.error("Date range error:", e);
      return statusMatch;
    }
  });

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const exportToCSV = () => {
    const rows = filteredOrders?.map((o) => ({
      "Pickup Date, Time": o.dateTime,
      "Order ID": o.orderId,
      Destination: o.destination,
      Recipient: o.recipient,
      "Recipient's Tel": o.phone,
      "Payment Amount": o.payAmount,
      Status: o.status,
      Vendor: o.vendor,
      "Assigned To": o.tpl,
      "Delivery Fee": o.deliveryAmount,
      "Delivery Date": o.orderdate,
      "Order Image": o.orderimg,
    }));

    const header = Object.keys(rows[0]);
    const csv = [
      header.join(","),
      ...rows.map((row) => header.map((field) => `"${row[field]}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "orders.csv");
    setShowDropdown(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "orders.xlsx");
    setShowDropdown(false);
  };

  const exportToPDF = () => {
    try {
      // Check if there's data to export
      if (!filteredOrders || filteredOrders.length === 0) {
        alert("No orders to export");
        setShowDropdown(false);
        return;
      }

      // Initialize PDF document
      const doc = new jsPDF({
        orientation: "landscape",
      });

      // Add title
      doc.setFontSize(16);
      doc.text("Orders Report", 14, 15);

      // Prepare table data
      const headers = [
        "Date/Time",
        "Order ID",
        "Destination",
        "Recipient",
        "Phone",
        "Amount",
        "Status",
        "Vendor",
        "Assigned To",
        "Delivery Fee",
        "Delivery Date",
      ];

      const data = filteredOrders?.map((order) => [
        order.dateTime || "",
        order.orderId || "",
        order.destination || "",
        order.recipient || "",
        order.phone || "",
        order.payAmount || "",
        order.status || "",
        order.vendor || "",
        order.tpl || "",
        order.deliveryAmount || "",
        order.orderdate || "",
      ]);

      // Generate the table
      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 20,
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: "linebreak",
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
      });

      // Save the PDF
      doc.save("orders-report.pdf");
      setShowDropdown(false);
    } catch (error) {
      console.error("PDF export error:", error);
      alert("Failed to generate PDF. Please check console for details.");
      setShowDropdown(false);
    }
  };

  const allColumns = [
    {
      key: "box",
      label: (
        <img
          src={boxIcon}
          alt="box"
          style={{ width: "14px", height: "14px", verticalAlign: "middle" }}
        />
      ),
    },
    { key: "map", label: "Map" },
    { key: "dateTime", label: "Pickup Date, Time" },
    { key: "orderId", label: "Order ID" },
    { key: "destination", label: "Destination" },
    { key: "recipient", label: "Recipient" },
    { key: "phone", label: "Recipient Tel" },
    { key: "payAmount", label: "Payment Amount" },
    { key: "status", label: "Status" },
    { key: "vendor", label: "Vendor" },
    { key: "tpl", label: "Assigned To" },
    { key: "deliveryAmount", label: "Delivery Fee" },
    { key: "orderdate", label: "Delivery Date" },
    { key: "orderimg", label: "Order Image" },
  ];

  const [visibleCols, setVisibleCols] = useState(
    allColumns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );

  const [showColsDropdown, setShowColsDropdown] = useState(false);
  const colsDropRef = useRef(null)
  const showColsDropDownRefIgnore = useRef(null)
  const toggleColDropdown = () => setShowColsDropdown((prev) => !prev);

   useClickOutside(
    colsDropRef,
    () => setShowColsDropdown(false),
    showColsDropDownRefIgnore
  );

  const handleColChange = (key) => {
    setVisibleCols((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Update your clearFilters function
  const clearFilters = () => {
    setEnteredDate("");
    setFilter("All");
    setDateRange({ start: null, end: null }); // Clear both start and end dates
    setSelectionPhase("start"); // Reset selection phase
  };

  const countByStatus = (status) => {
    if (!status) return allOrders?.orders?.data?.length;
    return allOrders?.orders?.data?.filter((o) => o.status === status).length;
  };

  const handleStatusFilter = (option) => {
    setFilter(option);
    setSelectedDate(null);
  };

  // In your handleCancel function
  const handleCancel = () => {
    setShowDateFilter(false);
    setSelectionPhase("start"); // Reset to start date selection
  };

  console.log("Filtering Debug:", {
    selectedDate: selectedDate?.toISOString(),
    filteredOrders: filteredOrders?.map((o) => o.orderdate),
  });

  const [showAddOrderDropdown, setShowAddOrderDropdown] = useState(false);
  const showAddOrderDropdownRef = useRef(null);
  const buttonAddOrderRef = useRef(null);
  useClickOutside(
    showAddOrderDropdownRef,
    () => setShowAddOrderDropdown(false),
    buttonAddOrderRef
  );

  const toggleAddOrderDropdown = () => setShowAddOrderDropdown((prev) => !prev);

  // Add these functions (you can implement the actual logic later)
  const handleManualAdd = () => {
    setShowAddOrderDropdown(false);
    // Your manual add order logic here
    console.log("Manual add order selected");
  };

  const handleImportFromFile = () => {
    setShowAddOrderDropdown(false);
    // Your import from file logic here
    console.log("Import from file selected");
  };
  const [selectedRows, setSelectedRows] = useState([]);
  const toggleRowSelection = (orderId, e) => {
    // Prevent event bubbling when clicking the checkbox
    if (e && e.target.type === "checkbox") {
      e.stopPropagation();
    }

    setSelectedRows((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const [isHeaderSelected, setIsHeaderSelected] = useState(false);

  return (
    <div className="dashboard-content">
      <div className={styles.dashboard_top}>
        <div className={styles.overViewContainer}>
          <div className={styles.text_header}>
            <span className={styles.overview}>Overview</span>
            <span className={styles.overviewtext}>
              Visual summary of key sales performance metrics and your data
            </span>
          </div>

          <div className={styles.date_Picker}>
            <button
              ref={buttonDateRangePickerRef}
              className={styles.date__control}
              onClick={(event) => {
                event.stopPropagation(), setShowDateFilter((prev) => !prev);
              }}
            >
              {stateDateRingeState[0]
                ? `${format(
                    stateDateRingeState[0]?.startDate,
                    "dd/MM/yyyy"
                  )} - ${format(stateDateRingeState[0]?.endDate, "dd/MM/yyyy")}`
                : "Select Date Range"}
              <SlCalender size={16} />
            </button>

            {showDateFilter && (
              <div className={styles.modal_overlay} ref={dateRangePickerRef}>
                <CustomDateRangePicker
                  stateDateRingeState={stateDateRingeState}
                  setDateRingeState={setDateRingeState}
                />
                {/* <DateFilter onFilter={handleFilter} onCancel={handleCancel} /> */}
              </div>
            )}
          </div>
        </div>

        <div className={styles.DashbD_head_container}>
          <StatCard
            title="All Orders"
            value={countByStatus()}
            img={staticon}
            change="+5.4% this week"
            bgColor="white"
            bordercolor="1px solid gray"
          />
          <StatCard
            title="Order Completed"
            value={countByStatus("Completed")}
            img={staticon}
            change="+5.4% this week"
            bgColor="#C3F9D5"
            bordercolor="1px solid #19D256"
          />
          <StatCard
            title="Order Failed"
            value={countByStatus("Failed")}
            img={staticon}
            change="+5.4% this week"
            bgColor="#FF9ABA"
            bordercolor="1px solid #FF1861"
          />
          <StatCard
            title="Order Rejected"
            value={countByStatus("Rejected")}
            img={staticon}
            change="+5.4% this week"
            bgColor="#FFC9C9"
            bordercolor="1px solid #FF8787"
          />
          <StatCard
            title="Order in Progress"
            value={countByStatus("In Progress")}
            img={staticon}
            change="+5.4% this week"
            bgColor="#88AEF1"
            bordercolor="1px solid #1158D3"
          />
          <StatCard
            title="Order Assigned"
            value={countByStatus("Assigned")}
            img={staticon}
            change="+5.4% this week"
            bgColor="#FFEC8B"
            bordercolor="1px solid #DBBA11"
          />
          <StatCard
            title="Order Returned"
            value={countByStatus("Returned")}
            img={staticon}
            change="+5.4% this week"
            bgColor="#AFAFAF"
            bordercolor="1px solid #737373"
          />
        </div>

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
            <div className={styles.overview}>Daily Orders</div>
            <div className={styles.overviewtext}>
              Visual summary of key sales performance metrics and your data
            </div>
          </div>

          <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
            <button className={styles.columnButton} onClick={clearFilters}>
              {" "}
              Clear All Filters
            </button>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={styles.exportContainer}>
                <button
                  onClick={toggleDropdown}
                  className={styles.columnButton}
                >
                  <Upload size={16} /> Export <ChevronDown size={16} />
                </button>
                {showDropdown && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownItem} onClick={exportToCSV}>
                      Export CSV
                    </div>
                    <div
                      className={styles.dropdownItem}
                      onClick={exportToExcel}
                    >
                      Export Excel
                    </div>
                    <div className={styles.dropdownItem} onClick={exportToPDF}>
                      Export PDF
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.columnToggleContainer}>
              <button
                onClick={toggleColDropdown}
                ref={colsDropRef}
                className={styles.columnButton}
              >
                <Eye size={16} /> Columns <ChevronDown size={16} />
              </button>
              {showColsDropdown && (
                <div className={styles.columnDropdown} ref={showColsDropDownRefIgnore}>
                  {allColumns.map((col) => (
                    <label key={col.key} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={visibleCols[col.key]}
                        onChange={() => handleColChange(col.key)}
                      />
                      {col.label}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button
              ref={buttonAddOrderRef}
              className={styles.addorder}
              onClick={toggleAddOrderDropdown}
            >
              Add Order +
            </button>

            {showAddOrderDropdown && (
              <AddOrderModal ref={showAddOrderDropdownRef} />
            )}
          </div>
        </div>
      </div>

      {/* Orders Table */}

      <div className={styles.tableContainerOuter}>
        <div className={styles.tableContainer}>
          {/* Filter Row */}
          <div className={styles.filters}>
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`${styles.filterButton} ${
                  filter === option ? styles.activeFilter : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Table */}
       
            <div className={styles.tableconMain}>
              <table className={styles.table}>
                <thead className={styles.tableheader}>
                  <tr
                    onClick={() => setIsHeaderSelected(!isHeaderSelected)}
                    className={`${styles.headerRow} ${
                      isHeaderSelected ? styles.selectedHeader : ""
                    }`}
                  >
                    {visibleCols.box && (
                      <th className={styles.th}>
                        <input
                          type="checkbox"
                          checked={isHeaderSelected}
                          onChange={(e) => {
                            setIsHeaderSelected(e.target.checked);
                            e.stopPropagation();
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </th>
                    )}
                    {visibleCols["map"] && (
                      <th className={styles.thSmall}>Map</th>
                    )}
                      {visibleCols.orderId && (
                      <th className={styles.th}>Order ID</th>
                    )}
                    {visibleCols.dateTime && (
                      <th className={styles.th}>Pickup Date, Time</th>
                    )}
                  
                    {visibleCols.destination && (
                      <th className={[styles.th]} >Destination</th>
                    )}
                    {visibleCols.recipient && (
                      <th className={styles.th}>Recipient</th>
                    )}
                    {visibleCols.phone && (
                      <th className={styles.th}>Recipient's Tel</th>
                    )}
                    {visibleCols.payAmount && (
                      <th className={styles.th}>Payment Amount</th>
                    )}
                    {visibleCols.status && (
                      <th className={styles.th}>Status</th>
                    )}
                    {visibleCols.vendor && (
                      <th className={styles.th}>Vendor</th>
                    )}
                    {visibleCols.tpl && <th className={styles.th}>3PL/Rider</th>}
                    {visibleCols.deliveryAmount && (
                      <th className={styles.th}>Delivery Fee</th>
                    )}
                    {visibleCols.orderdate && (
                      <th className={styles.th}>Delivery Date, Time</th>
                    )}
                    {visibleCols.orderimg && (
                      <th className={styles.th}>Order Image</th>
                    )}
                  </tr>
                </thead>

                
                <tbody>
                  {
                    
                      orderLoading &&(

                        <tr>
                          
                          <td style={{width:"100%", textAlign:"center",padding:"4rem 0rem"}} colSpan={12}>
                         <Spin size="large" className="loading-spinner" />

                          </td>

                    </tr>
                      ) 
                  }

                  {
                      
                  allOrders?.orders?.data?.map((order, index) => (
                    <tr
                      key={order?._id} // Use orderId as key instead of index
                      onClick={(e) => {
                        // Don't trigger row selection if clicking on a link or button
                        // if (
                        //   e.target.tagName !== "A" &&
                        //   e.target.tagName !== "BUTTON"
                        // ) {
                        //   toggleRowSelection(order?._id);
                        // }
                          navigate(`/orders/${order?._id}`)
                        
                      }}
                      
                      className={`${styles.tableRow} ${
                        selectedRows.includes(order?._id)
                          ? styles.selectedRow
                          : ""
                      }`}
                    >
                      {visibleCols.box && (
                        <td
                          className={styles.td}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(order?._id)}
                            onChange={(e) => {
                              toggleRowSelection(order?._id, e);
                            }}
                          />
                        </td>
                      )}
                      {visibleCols.map && (
                        <td className={styles.td}>
                          {" "}
                          <img
                            src={locationIcon}
                            alt="Location Icon"
                            style={{ width: "16px", height: "16px" }}
                          />
                        </td>
                      )}
                      {visibleCols.orderId && (
                        <td className={styles.td}>{order?.orderId}</td>
                      )}
                      {visibleCols.dateTime && (
                        <td className={styles.td}>{formatDateTime(order?.createdAt)}</td>
                      )}
                      
                      {visibleCols.destination && (
                        <td className={styles.td}>{order?.destination}</td>
                      )}
                     
                      {visibleCols.recipient && (
                        <td className={styles.td}>{order?.recipientName}</td>
                      )}
                      {visibleCols.phone && (
                        <td className={styles.td}>{order?.recipientNumber}</td>
                      )}
                      {visibleCols.payAmount && (
                        <td className={styles.td}>GHC {order?.paymentAmount}</td>
                      )}
                      {visibleCols.status && (
                        <td className={styles.td}>
                          <span
                            className={`${styles.status} ${
                              statusClass[order.status]
                            }`}
                          >
                            {order?.status}
                          </span>
                        </td>
                      )}
                      {visibleCols.vendor && (
                        <td className={styles.td}>{order?.source?.type}</td>
                      )}
                      {visibleCols.tpl && (
                        <td className={styles.td}>{order?.assignedTo?.userProfile &&  order?.assignedTo?.userProfile?.fullName}</td>
                      )}
                      {visibleCols.deliveryAmount && (
                        <td className={styles.td}>{order?.deliveryFee && `GHC ${order?.deliveryFee}` }</td>
                      )}
                      {visibleCols.orderdate && (
                        <td className={styles.td}>{formatDateTime(order?.orderDate) }</td>
                      )}
                      {visibleCols.orderimg && (
                        <td className={styles.td}>{order?.productImage}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          
          
           
              
              {  (!orderLoading && !allOrders?.orders?.data)
           
                      &&  <div className={styles.noResults}>No orders found  </div>
              }
          
        </div>
         <div className="pagination-tab">
         
          <PaginatedTabs
            totalRecords={totalNumberOfOrders}
            setItemOffset={setItemOffset}
            offSet={itemOffset}
            itemsPerPage={itemsPerPage}
            fetchMore={fetchMoreOrder}
          />
        </div>
      </div>

      
    </div>
  );
}
