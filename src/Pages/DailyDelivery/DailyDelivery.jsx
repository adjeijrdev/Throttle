import { useState, useEffect, useRef } from "react";
import styles from "./DailyDelivery.module.css";
import { Upload, Eye } from "lucide-react";
import ExcelIcon from "../../Assets/icons/excel.png";
import PdfIcon from "../../Assets/icons/pdf.png";
import CsvIcon from "../../Assets/icons/csv.png";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DateFilter from "../Dashboard/DateFilter";
import locationIcon from "../../Assets/icons/location.png";
import boxIcon from "../../Assets/icons/smallbox.png";
import cameraIcon from "../../Assets/icons/camera.png";
import imgIcon from "../../Assets/icons/img.png";
import { useNavigate } from "react-router";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import PaginatedTabs from "../../Components/paginationTab/paginationTabs";
import CustomSearchInput from "../../Components/searchInputBox/CustomSearchInput";
import TableFilter from "./TableFilter";
import MdContentVendor from "./MdContentVendor";
import MdContentRider from "./MdContentRider";
import MdContent3Pl from "./MdContent3Pl";
import { GET_ALL_ORDERS } from "../../graphql/generalQueries";
import { useOrderSearch } from "../../graphql/graphqlConfiguration";
import {
  MdEvent,
  MdEventNote,
  MdDirectionsTransit,
  MdDeliveryDining,
  MdLocalShipping,
  MdComment,
} from "react-icons/md";
import { Spin } from "antd";
import { formatDateTime } from "../../utils/formateDateTime";
import { useClickOutside } from "../../CustomHooks/useClickOutSide";
export default function DailyDelivery(props) {
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(2);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [filter, setFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });
  const [selectionPhase, setSelectionPhase] = useState("start");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showVendorFilter, setShowVendorFilter] = useState(false);
  const [showRiderFilter, setShowRiderFilter] = useState(false);
  const [show3PlFilter, setShow3PlFilter] = useState(false);
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [showSortDate, setShowSortDate] = useState(false);

  const [allOrders, setAllOrders] = useState();
  const navigate = useNavigate();

  const itemsPerPage = 15;

  const {
    debouncedSearch,
    data: orderData,
    loading: orderLoading,
    error: orderError,
    fetchMore: fetchMoreOrder,
    refetch: refetchOrders,
  } = useOrderSearch(GET_ALL_ORDERS, itemOffset, itemsPerPage);

  const totalNumberOfOrders = orderData?.orders?.totalCount;

  useEffect(() => {
    console.log("order ", orderData);

    setAllOrders(orderData);
  }, [orderData]);

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

  const handleBulkAction = (actionType) => {
    // Close the dropdown
    setShowBulkUpdate(false);

    // Handle the selected action
    switch (actionType) {
      case "pickup":
        // Handle pickup date change
        break;
      case "delivery":
        // Handle delivery date change
        break;
      case "transit":
        // Handle transit status change
        break;
      case "rider":
        // Handle rider assignment
        break;
      case "3pl":
        // Handle 3PL assignment
        break;
      case "remarks":
        // Handle remarks addition
        break;
      default:
        break;
    }
  };

  const handleSortDateAction = (actionType) => {
    // Close the dropdown
    setShowSortDate(false);

    // Handle the selected action
    switch (actionType) {
      case "pickup":
        // Handle pickup date change
        break;
      case "delivery":
        // Handle delivery date change
        break;
      default:
        break;
    }
  };

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

  const statusClass = {
    Completed: styles.completed,
    Rejected: styles.rejected,
    "In Transit": styles.inProgress,
    Failed: styles.failed,
    Assigned: styles.assigned,
    Returned: styles.returned,
    "Order Placed": styles.inProgress,
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const exportToCSV = () => {
    const rows = filteredOrders.map((o) => ({
      "Pickup Date, Time": o.dateTime,
      "Order ID": o.orderId,
      Destination: o.destination,
      Recipient: o.recipient,
      "Recipient's Tel": o.phone,
      "Payment Amt": o.payAmount,
      Status: o.status,
      Vendor: o.vendor,
      "3PLs": o.tpl,
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
        "3PL",
        "Delivery Fee",
        "Delivery Date",
      ];

      const data = filteredOrders.map((order) => [
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
    { key: "orderId", label: "Order ID" },
    { key: "description", label: "Description" },
    { key: "dateTime", label: "Pickup Date, Time" },
    { key: "destination", label: "Destination" },
    { key: "recipient", label: "Recipient" },
    { key: "phone", label: "Recipient Tel" },
    { key: "payAmount", label: "Payment Amount" },
    { key: "status", label: "Status" },
    { key: "vendor", label: "Vendor" },
    { key: "tpl", label: "Assigned To" },
    { key: "deliveryAmount", label: "Delivery Fee" },
    { key: "orderdate", label: "Delivery Date" },
    { key: "grantTotal", label: "Grand Total" },
  ];

  const [visibleCols, setVisibleCols] = useState(
    allColumns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );

  const [showColsDropdown, setShowColsDropdown] = useState(false);

  const toggleColDropdown = () => setShowColsDropdown((prev) => !prev);

  
    const toggleDropdownRef = useRef(null);
    const toggleDropdownIgnoreRef = useRef(null);
    useClickOutside(
      toggleDropdownRef ,
      () => toggleColDropdown(),
      toggleDropdownIgnoreRef
    );



  const handleColChange = (key) => {
    setVisibleCols((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  //  Update your clearFilters function
  const clearFilters = () => {
    setEnteredDate("");
    setFilter("All");
    setDateRange({ start: null, end: null }); // Clear both start and end dates
    setSelectionPhase("start"); // Reset selection phase
  };

  const countByStatus = (status) => {
    if (!status) return allOrders.length;
    return allOrders.filter((o) => o.status === status).length;
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

  const handleOrderStatusFilter = (filter_by) => {
    if (filter_by == "All") {
      return "";
    } else {
      return filter_by?.toUpperCase();
    }
  };
  return (
    <div className="dashboard-content">
      <div className={styles.header_continer_st}>
        <div className={styles.header_con_content1}>
          <div className={styles.overview_container}>
            <div className={styles.overview}>Orders</div>
            <div className={styles.overviewtext}>
              View and manage all orders
            </div>
          </div>
          <div className={styles.search_filter_con}>
            <button className={styles.columnButton} onClick={clearFilters}>
              {" "}
              Clear All Filters
            </button>
            <CustomSearchInput bgColor={"white"} />
          </div>
        </div>
        <div className={styles.header_con_content2}>
          <div className={styles.columnToggleContainer}>
            <button onClick={toggleColDropdown} className={styles.columnButton} ref={toggleDropdownIgnoreRef}>
              <Eye size={16} /> Columns <FaCaretDown />
            </button>
            {showColsDropdown && (
              <div className={styles.columnDropdown} ref={toggleDropdownRef}>
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
            className={styles.sortBtn}
            onClick={() => setShowVendorFilter(!showVendorFilter)}
          >
            <MdRestore />
            Sort by Vendor
            {showVendorFilter && (
              <div
                className={styles.filter_modal_overlay}
                onClick={() => setShowVendorFilter(false)}
              >
                <div
                  className={styles.filter_modal_content}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdContentVendor
                    tableTeadValues={["Vendor Name", "Order Count", "Status"]}
                    onClose={() => setShowVendorFilter(false)}
                  />
                </div>
              </div>
            ) ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )}
          </button>

          <button
            className={styles.sortBtn}
            onClick={() => setShowRiderFilter(!showRiderFilter)}
          >
            <MdRestore />
            Sort by Rider
            {showRiderFilter && (
              <div
                className={styles.filter_modal_overlay}
                onClick={() => setShowRiderFilter(false)}
              >
                <div
                  className={styles.filter_modal_content}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdContentRider
                    tableTeadValues={["Rider Name", "Order Count", "Status"]}
                    onClose={() => setShowRiderFilter(false)}
                  />
                </div>
              </div>
            ) ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )}
          </button>

          <button
            className={styles.sortBtn}
            onClick={() => setShow3PlFilter(!show3PlFilter)}
          >
            <MdRestore />
            Sort by 3PL
            {show3PlFilter && (
              <div
                className={styles.filter_modal_overlay}
                onClick={() => setShow3PlFilter(false)}
              >
                <div
                  className={styles.filter_modal_content}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdContent3Pl
                    tableTeadValues={["3Pl Name", "Order Count", "Status"]}
                    onClose={() => setShow3PlFilter(false)}
                  />
                </div>
              </div>
            ) ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )}
          </button>

          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              className={styles.bulkbtn}
              onClick={() => setShowBulkUpdate(!showBulkUpdate)}
            >
              <MdRestore />
              Bulk Update
              {showBulkUpdate ? <FaCaretUp /> : <FaCaretDown />}
            </button>

            {showBulkUpdate && (
              <div
                className={styles.bulk_update_dropdown}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleBulkAction("pickup")}
                >
                  <MdEvent size={16} className={styles.dropdown_icon} />
                  Change Pickup Date
                </div>
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleBulkAction("delivery")}
                >
                  <MdEventNote size={16} className={styles.dropdown_icon} />
                  Change Delivery Date
                </div>
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleBulkAction("transit")}
                >
                  <MdDirectionsTransit
                    size={16}
                    className={styles.dropdown_icon}
                  />
                  Change to Transit
                </div>
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleBulkAction("rider")}
                >
                  <MdDeliveryDining
                    size={16}
                    className={styles.dropdown_icon}
                  />
                  Assign to Rider
                </div>
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleBulkAction("3pl")}
                >
                  <MdLocalShipping size={16} className={styles.dropdown_icon} />
                  Assign to 3PL
                </div>
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleBulkAction("remarks")}
                >
                  <MdComment size={16} className={styles.dropdown_icon} />
                  Add Remarks
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={styles.exportContainer}>
              <button onClick={toggleDropdown} className={styles.columnButton}>
                <Upload size={16} /> Export <FaCaretDown />
              </button>
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownItem} onClick={exportToExcel}>
                    <img src={ExcelIcon} size={18} />
                    Excel
                  </div>
                  <div className={styles.dropdownItem} onClick={exportToPDF}>
                    <img src={PdfIcon} size={18} />
                    PDF
                  </div>
                  <div className={styles.dropdownItem} onClick={exportToCSV}>
                    <img src={CsvIcon} size={18} />
                    CSV
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <button className={styles.sortBtn}>
            <MdRestore />
            Sort Date by
            {true ? <FaCaretUp /> : <FaCaretDown />}
          </button> */}

          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              className={styles.bulkbtn}
              onClick={() => setShowSortDate(!showSortDate)}
            >
              <MdRestore />
              Sort Date by
              {showDateFilter ? <FaCaretUp /> : <FaCaretDown />}
            </button>

            {showSortDate && (
              <div
                className={styles.bulk_update_dropdown}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleSortDateAction("pickup")}
                >
                  <MdEvent size={16} className={styles.dropdown_icon} />
                  Pickup Date
                </div>
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleSortDateAction("delivery")}
                >
                  <MdEventNote size={16} className={styles.dropdown_icon} />
                  Delivery Date
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              className={styles.date__control}
              onClick={() => setShowDateFilter(true)}
            >
              {dateRange.start && dateRange.end
                ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`
                : "Select Date Range"}
            </button>

            {showDateFilter && (
              <div className="modal-overlay">
                <DateFilter onFilter={handleFilter} onCancel={handleCancel} />
              </div>
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
                onClick={() => {
                  setFilter(option),
                    debouncedSearch(handleOrderStatusFilter(option), "", []);
                }}
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
                  // onClick={() => setIsHeaderSelected(!isHeaderSelected)}
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
                  {visibleCols.description && (
                    <th className={styles.th}>Description</th>
                  )}
                  {visibleCols.dateTime && (
                    <th className={styles.th}>Pickup Date, Time</th>
                  )}

                  {visibleCols.destination && (
                    <th className={[styles.th]}>Destination</th>
                  )}
                  {visibleCols.recipient && (
                    <th className={styles.th}>Recipient</th>
                  )}
                  {visibleCols.phone && (
                    <th className={styles.th}>Recipient's Tel</th>
                  )}

                  {visibleCols.status && <th className={styles.th}>Status</th>}
                  {visibleCols.vendor && <th className={styles.th}>Vendor</th>}

                  {visibleCols.orderdate && (
                    <th className={styles.th}>Delivery Date, Time</th>
                  )}
                  {visibleCols.tpl && <th className={styles.th}>3PL/Rider</th>}

                  {visibleCols.payAmount && (
                    <th className={styles.th}>Payment Amount</th>
                  )}
                  {visibleCols.deliveryAmount && (
                    <th className={styles.th}>Delivery Fee</th>
                  )}
                  {visibleCols.grantTotal && (
                    <th className={styles.th}>Grand Total</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {orderLoading && !allOrders?.orders?.data && (
                  <tr>
                    <td
                      style={{
                        width: "100%",
                        textAlign: "center",
                        padding: "4rem 0rem",
                      }}
                      colSpan={12}
                    >
                      <Spin size="large" className="loading-spinner" />
                    </td>
                  </tr>
                )}

                {allOrders?.orders?.data?.map((order, index) => (
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
                      navigate(`/orders/${order?._id}`);
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
                    {visibleCols.description && (
                      <td className={styles.td}>{order?.productDescription}</td>
                    )}
                    {visibleCols.dateTime && (
                      <td className={styles.td}>
                        {formatDateTime(order?.orderDate)}
                      </td>
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

                    {visibleCols.status && (
                      <td className={styles.td}>
                        <span
                          className={`${styles.status} ${
                            statusClass[order.status]
                          }`}
                          style={{
                            backgroundColor: assignOrderStatusBackground(
                              order?.status
                            ),
                          }}
                        >
                          {order?.status}
                        </span>
                      </td>
                    )}
                    {visibleCols.vendor && (
                      <td className={styles.td}>{order?.source?.type}</td>
                    )}
                    {visibleCols.orderdate && (
                      <td className={styles.td}>
                        {formatDateTime(order?.deliveryDate)}
                      </td>
                    )}
                    {visibleCols.tpl && (
                      <td className={styles.td}>
                        {order?.assignedTo?.userProfile &&
                          order?.assignedTo?.userProfile?.fullName}
                      </td>
                    )}

                    {visibleCols.payAmount && (
                      <td className={styles.td}>GHC {order?.paymentAmount}</td>
                    )}
                    {visibleCols.deliveryAmount && (
                      <td className={styles.td}>
                        {order?.deliveryFee && `GHC ${order?.deliveryFee}`}
                      </td>
                    )}
                    {visibleCols.grantTotal && (
                      <td className={styles.td}>
                        GHC {order?.paymentAmount + order?.deliveryFee}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!orderLoading && !allOrders?.orders?.data && (
            <div className={styles.noResults}>No orders found </div>
          )}
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

        <div
          className={
            showVendorFilter
              ? styles.pop_up_table_filter
              : styles.hide_table_filter
          }
        >
          <MdContentVendor
            tableTeadValues={["Role Title", "Description", "Number of Staffs"]}
          />
        </div>
        <div
          className={
            showRiderFilter
              ? styles.pop_up_table_filter
              : styles.hide_table_filter
          }
        >
          <MdContentRider
            tableTeadValues={["Rider Name", "Number", "Status"]}
          />
        </div>
        <div
          className={
            show3PlFilter
              ? styles.pop_up_table_filter
              : styles.hide_table_filter
          }
        >
          <MdContent3Pl tableTeadValues={["3Pl Name", "Number", "Status"]} />
        </div>
      </div>
    </div>
  );
}
