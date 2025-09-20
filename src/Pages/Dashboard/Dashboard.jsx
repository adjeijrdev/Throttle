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
import { useOrderSearch, useSearch } from "../../graphql/graphqlConfiguration";
import { GET_ALL_ORDERS } from "../../graphql/generalQueries";
import PaginatedTabs from "../../Components/paginationTab/paginationTabs";
import { Spin } from "antd";
import { formatDateTime } from "../../utils/formateDateTime";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Dashboard(props) {
  const itemsPerPage = 15;
  const [itemOffset, setItemOffset] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  const [allOrders, setAllOrders] = useState();
  const [orderFilterBy, setOrderFilterBy] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate();
  const {
    debouncedSearch,
    data: orderData,
    loading: orderLoading,
    error: orderError,
    fetchMore: fetchMoreOrder,
    refetch: refetchOrders,
  } = useOrderSearch(GET_ALL_ORDERS, itemOffset, itemsPerPage);

  const totalNumberOfOrders = orderData?.orders?.totalCount;
  
  const viewAbleTabs = useSelector((state) => state.staffAuth?.viewAbleTabs);

  useEffect(() => {
    setAllOrders(orderData);
  }, [orderData]);

  const [filter, setFilter] = useState("All");

  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });
  const [selectionPhase, setSelectionPhase] = useState("start");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateFilterIsClick, setDateFilterIsClick] = useState(false);
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

  const [enteredDate, setEnteredDate] = useState("");

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

  const handleOrderStatusFilter = (filter_by) => {
    if (filter_by == "All") {
      return "";
    } else {
      return filter_by?.toUpperCase();
    }
  };

  useEffect(() => {
    
    if (dateFilterIsClick) {
      debouncedSearch(
        orderFilterBy.status,
        stateDateRingeState[0]?.startDate,
        stateDateRingeState[0]?.endDate,
        "",
        []
      );
    } else {
      debouncedSearch(orderFilterBy.status, "", "", "", []);
    }
  }, [orderFilterBy, stateDateRingeState]);

  const statusClass = {
    Completed: styles.completed,
    Rejected: styles.rejected,
    "In Progress": styles.inProgress,
    Failed: styles.failed,
    Assigned: styles.assigned,
    Returned: styles.returned,
    "Order Placed": styles.inProgress,
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const toggleDropdownRef = useRef(null);
  const toggleDropdownIgnoreRef = useRef(null);
  useClickOutside(
    toggleDropdownRef,
    () => toggleDropdown(),
    toggleDropdownIgnoreRef
  );

  const exportToCSV = () => {
    const rows = orderData?.orders?.data?.map((o) => ({
      "Order ID": o.orderId,
      Description: o.productDescription,
      "Pickup Date and Time": formatDateTime(o.orderDate),
      Destination: o.destination,
      Recipient: o.recipientName,
      "Recipient's Tel": o.recipientNumber,
      Status: o.status,
      Vendor: o.source?.type,
      "Assigned To":
        o.assignedTo?.userProfile?.fullName ||
        o.assignedTo?.businessInfo?.companyName,
      "Delivery Fee": o.deliveryFee,
      "Payment Amount": o.paymentAmount,
      "Total Payment": o.paymentAmount + o.deliveryFee,
      "Delivery Date": formatDateTime(o.deliveryDate),
      "Order Image": o.productImage,
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
    const data = orderData?.orders?.data?.map((o) => {
      return {
        "Order ID": o.orderId,
        Description: o.productDescription,
        "Pickup Date and Time": formatDateTime(o.orderDate),
        Destination: o.destination,
        Recipient: o.recipientName,
        "Recipient's Tel": o.recipientNumber,
        Status: o.status,
        Vendor: o.source?.type,
        "Assigned To":
          o.assignedTo?.userProfile?.fullName ||
          o.assignedTo?.businessInfo?.companyName,
        "Delivery Fee": o.deliveryFee,
        "Payment Amount": o.paymentAmount,
        "Total Payment": o.paymentAmount + o.deliveryFee,
        "Delivery Date": formatDateTime(o.deliveryDate),
        "Order Image": o.productImage,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(data);
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
      if (!orderData?.orders?.data) {
        toast.error("No orders to export", {
          style: {
            border: "1px solid oklch(88.5% 0.062 18.334)",
            // backgroundColor:"oklch(88.5% 0.062 18.334)",
            color: "oklch(39.6% 0.141 25.723)",
            fontSize: "16px",
            width: "500px",
          },
        });
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
        "Order ID",
        "Description",
        "Date/Time",
        "Destination",
        "Recipient",
        "Phone",
        "Status",
        "Vendor",
        "Assigned To",
        "Remittant",
        "Delivery Fee",
        "Total Payment",
        "Delivery Date",
      ];

      const data = orderData?.orders?.data?.map((order) => [
        order.orderId || "",
        order.productDescription || "",
        formatDateTime(order.orderDate) || "",
        order.destination || "",
        order.recipientName || "",
        order.recipientNumber || "",

        order.status || "",
        order.source?.type || "",
        order.assignedTo?.userProfile?.fullName ||
          order.assignedTo?.businessInfo?.companyName ||
          "",
        order.paymentAmount || "",
        order.deliveryFee || "",
        order.deliveryFee + order.paymentAmount || "",
        formatDateTime(order.deliveryDate) || "",
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
  const colsDropRef = useRef(null);
  const showColsDropDownRefIgnore = useRef(null);
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
    setFilter("All");
    setOrderFilterBy({
      status: "",
      startDate: "",
      endDate: "",
    });
    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    setDateFilterIsClick(false);
  };

  const [showAddOrderDropdown, setShowAddOrderDropdown] = useState(false);
  const showAddOrderDropdownRef = useRef(null);
  const buttonAddOrderRef = useRef(null);
  useClickOutside(
    showAddOrderDropdownRef,
    () => setShowAddOrderDropdown(false),
    buttonAddOrderRef
  );

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
                setDateFilterIsClick(true);
              }}
            >
              {dateFilterIsClick
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
          <div className={styles.sub_card_Container}>
            <StatCard
              title="All Orders"
              value={allOrders?.orders?.totalNumberOfOrders}
              img={staticon}
              change="+5.4% this week"
              bgColor="white"
              bordercolor="1px solid gray"
            />
            {
              !( ( viewAbleTabs?.includes("T3PL") || viewAbleTabs?.includes("RIDER"))) &&
            <StatCard
              title="Order PLACED (NEW)"
              value={allOrders?.orders?.totalNumOfOderPlaced}
              img={staticon}
              change="+5.4% this week"
              bgColor="#A6CFFF"
              bordercolor="1px solid #95bbe7ff"
            />
            }


            <StatCard
              title="Order Completed"
              value={allOrders?.orders?.totalNumberOfCompleted}
              img={staticon}
              change="+5.4% this week"
              bgColor="#C3F9D5"
              bordercolor="1px solid #19D256"
            />
            <StatCard
              title="Order Failed"
              value={allOrders?.orders?.totalNumberOfFailed}
              img={staticon}
              change="+5.4% this week"
              bgColor="#FF9ABA"
              bordercolor="1px solid #FF1861"
            />
            <StatCard
              title="Order Rejected"
              value={allOrders?.orders?.totalNumberOfRejected}
              img={staticon}
              change="+5.4% this week"
              bgColor="#FFC9C9"
              bordercolor="1px solid #FF8787"
            />
            <StatCard
              title="Order in Transit"
              value={allOrders?.orders?.totalNumOfInTransit}
              img={staticon}
              change="+5.4% this week"
              bgColor="#88AEF1"
              bordercolor="1px solid #1158D3"
            />
            <StatCard
              title="Order Assigned"
              value={allOrders?.orders?.totalNumberOfAssigned}
              img={staticon}
              change="+5.4% this week"
              bgColor="#FFEC8B"
              bordercolor="1px solid #DBBA11"
            />
            <StatCard
              title="Order Returned"
              value={allOrders?.orders?.totalNumberOfReturned}
              img={staticon}
              change="+5.4% this week"
              bgColor="#AFAFAF"
              bordercolor="1px solid #737373"
            />
          </div>
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
                  ref={toggleDropdownIgnoreRef}
                >
                  <Upload size={16} /> Export <ChevronDown size={16} />
                </button>
                {showDropdown && (
                  <div className={styles.dropdownMenu} ref={toggleDropdownRef}>
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
                <div
                  className={styles.columnDropdown}
                  ref={showColsDropDownRefIgnore}
                >
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
              onClick={() => navigate("/dashboard/addOrder")}
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
                onClick={() => {
                  setFilter(option),
                    setOrderFilterBy({
                      status: handleOrderStatusFilter(option),
                      startDate: stateDateRingeState[0]?.startDate,
                      endDate: stateDateRingeState[0]?.endDate,
                    });
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
                      navigate(`/dashboard/main/orders/${order?._id}`);
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
                      <td className={styles.td}>
                        {order?.source == null
                          ? "SELF"
                          : order?.source?.businessInfo?.companyName}
                      </td>
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
      </div>
    </div>
  );
}
