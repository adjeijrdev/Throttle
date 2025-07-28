import { useState } from "react";

import styles from "./DailyDelivery.module.css";
import { Upload, Eye, ChevronDown } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DateFilter from "../Dashboard/DateFilter";
import locationIcon from "../../Assets/icons/location.png";
import boxIcon from "../../Assets/icons/smallbox.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import PaginatedTabs from "../../Components/paginationTab/paginationTabs";
import CustomSearchInput from "../../Components/searchInputBox/CustomSearchInput";
import TableFilter from "./TableFilter";

export default function DailyDelivery(props) {
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 50;

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
  const [show3PlFilter,setShow3PlFilter] = useState(false);
  const [showBulkUpldate, setShowUpdateFilter] =useState(false)
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

  const allOrders = [
    {
      orderId: "A0M600",
      dateTime: "2024-12-10, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Completed",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-12-10",
      orderimg: "",
    },
    {
      orderId: "A0M601",
      dateTime: "2024-12-10, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Rejected",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-12-10",
      orderimg: "",
    },
    {
      orderId: "A0M602",
      dateTime: "2024-12-10, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "In Progress",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-12-10",
      orderimg: "",
    },
    {
      orderId: "A0M603",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Completed",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M604",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Failed",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M605",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Assigned",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M606",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Returned",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M607",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Completed",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M608",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Rejected",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M609",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "In Progress",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M610",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Completed",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M611",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Failed",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M612",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Assigned",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M613",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Returned",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M614",
      dateTime: "2024-12-10, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Order Placed",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-12-10",
      orderimg: "",
    },
    {
      orderId: "A0M615",
      dateTime: "2024-12-10, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Order Placed",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-12-10",
      orderimg: "",
    },
    {
      orderId: "A0M616",
      dateTime: "2024-12-10, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "In Progress",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-12-10",
      orderimg: "",
    },
    {
      orderId: "A0M617",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Order Placed",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M618",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Failed",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    {
      orderId: "A0M619",
      dateTime: "2024-10-30, 01:53",
      destination: "Tema newton, Hse No 36b, Greater Accra",
      recipient: "Ama Nelson",
      phone: "+233 54 786 6565",
      payAmount: "GHC350.00",
      status: "Assigned",
      vendor: "Ishtari Ghana",
      tpl: "Robert",
      deliveryAmount: "GHC350.00",
      orderdate: "2024-10-30",
      orderimg: "",
    },
    // ,
    // {
    //   orderId: "A0M620",
    //   dateTime: "2024-10-30, 01:53",
    //   destination: "Tema newton, Hse No 36b, Greater Accra",
    //   recipient: "Ama Nelson",
    //   phone: "+233 54 786 6565",
    //   payAmount: "GHC350.00",
    //   status: "Returned",
    //   vendor: "Ishtari Ghana",
    //   tpl: "Robert",
    //   deliveryAmount: "GHC350.00",
    //   orderdate: "2024-10-30",
    //   orderimg: "",
    // },
    // {
    //   orderId: "A0M621",
    //   dateTime: "2024-10-30, 01:53",
    //   destination: "Tema newton, Hse No 36b, Greater Accra",
    //   recipient: "Ama Nelson",
    //   phone: "+233 54 786 6565",
    //   payAmount: "GHC350.00",
    //   status: "Completed",
    //   vendor: "Ishtari Ghana",
    //   tpl: "Robert",
    //   deliveryAmount: "GHC350.00",
    //   orderdate: "2024-10-30",
    //   orderimg: "",
    // },
    // {
    //   orderId: "A0M622",
    //   dateTime: "2024-10-30, 01:53",
    //   destination: "Tema newton, Hse No 36b, Greater Accra",
    //   recipient: "Ama Nelson",
    //   phone: "+233 54 786 6565",
    //   payAmount: "GHC350.00",
    //   status: "Rejected",
    //   vendor: "Ishtari Ghana",
    //   tpl: "Robert",
    //   deliveryAmount: "GHC350.00",
    //   orderdate: "2024-10-30",
    //   orderimg: "",
    // },
    // {
    //   orderId: "A0M623",
    //   dateTime: "2024-10-30, 01:53",
    //   destination: "Tema newton, Hse No 36b, Greater Accra",
    //   recipient: "Ama Nelson",
    //   phone: "+233 54 786 6565",
    //   payAmount: "GHC350.00",
    //   status: "In Progress",
    //   vendor: "Ishtari Ghana",
    //   tpl: "Robert",
    //   deliveryAmount: "GHC350.00",
    //   orderdate: "2024-10-30",
    //   orderimg: "",
    // }
    // ,
    // {
    //   orderId: "A0M624",
    //   dateTime: "2024-10-30, 01:53",
    //   destination: "Tema newton, Hse No 36b, Greater Accra",
    //   recipient: "Ama Nelson",
    //   phone: "+233 54 786 6565",
    //   payAmount: "GHC350.00",
    //   status: "Completed",
    //   vendor: "Ishtari Ghana",
    //   tpl: "Robert",
    //   deliveryAmount: "GHC350.00",
    //   orderdate: "2024-10-30",
    //   orderimg: "",
    // },
    // {
    //   orderId: "A0M625",
    //   dateTime: "2024-10-30, 01:53",
    //   destination: "Tema newton, Hse No 36b, Greater Accra",
    //   recipient: "Ama Nelson",
    //   phone: "+233 54 786 6565",
    //   payAmount: "GHC350.00",
    //   status: "Failed",
    //   vendor: "Ishtari Ghana",
    //   tpl: "Robert",
    //   deliveryAmount: "GHC350.00",
    //   orderdate: "2024-10-30",
    //   orderimg: "",
    // },
    // {
    //   orderId: "A0M626",
    //   dateTime: "2024-10-30, 01:53",
    //   destination: "Tema newton, Hse No 36b, Greater Accra",
    //   recipient: "Ama Nelson",
    //   phone: "+233 54 786 6565",
    //   payAmount: "GHC350.00",
    //   status: "Assigned",
    //   vendor: "Ishtari Ghana",
    //   tpl: "Robert",
    //   deliveryAmount: "GHC350.00",
    //   orderdate: "2024-10-30",
    //   orderimg: "",
    // },
    // {
    //   orderId: "A0M627",
    //   dateTime: "2024-10-30, 01:53",
    //   destination: "Tema newton, Hse No 36b, Greater Accra",
    //   recipient: "Ama Nelson",
    //   phone: "+233 54 786 6565",
    //   payAmount: "GHC350.00",
    //   status: "Returned",
    //   vendor: "Ishtari Ghana",
    //   tpl: "Robert",
    //   deliveryAmount: "GHC350.00",
    //   orderdate: "2024-10-30",
    //   orderimg: "",
    // },
    // Add more data...
  ];

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

  console.log("Order dates valid:", validateOrderDates(allOrders));

  // Improved date filtering logic
  const filteredOrders = allOrders.filter((order) => {
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
    { key: "dateTime", label: "Pickup Date, Time" },
    { key: "orderId", label: "Order ID" },
    { key: "destination", label: "Destination" },
    { key: "recipient", label: "Recipient" },
    { key: "phone", label: "Recipient Tel" },
    { key: "payAmount", label: "Payment Amt" },
    { key: "status", label: "Status" },
    { key: "vendor", label: "Vendor" },
    { key: "tpl", label: "3PLs" },
    { key: "deliveryAmount", label: "Delivery Fee" },
    { key: "orderdate", label: "Delivery Date" },
    { key: "orderimg", label: "Order Image" },
  ];

  const [visibleCols, setVisibleCols] = useState(
    allColumns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );

  const [showColsDropdown, setShowColsDropdown] = useState(false);

  const toggleColDropdown = () => setShowColsDropdown((prev) => !prev);

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

  console.log("Filtering Debug:", {
    selectedDate: selectedDate?.toISOString(),
    filteredOrders: filteredOrders.map((o) => o.orderdate),
  });

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
            <button onClick={toggleColDropdown} className={styles.columnButton}>
              <Eye size={16} /> Columns <ChevronDown size={16} />
            </button>
            {showColsDropdown && (
              <div className={styles.columnDropdown}>
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
          <button className={styles.sortBtn} onClick={()=>setShowVendorFilter(!showVendorFilter)}>
            <MdRestore />
            Sort by Vendor
            {showVendorFilter  && (
  <div className={styles.filter_modal_overlay} onClick={() => setShowVendorFilter(false)}>
    <div className={styles.filter_modal_content} onClick={e => e.stopPropagation()}>
      <TableFilter
        tableTeadValues={["Vendor Name", "Order Count", "Status"]}
        onClose={() => setShowVendorFilter(false)}
      />
    </div>
  </div>
) ? <FaCaretUp /> : <FaCaretDown />}
          </button>
          <button className={styles.sortBtn}>
            <MdRestore />
            Sort by Rider
            {true ? <FaCaretUp /> : <FaCaretDown />}
          </button>

          <button className={styles.sortBtn}>
            <MdRestore />
            Sort by 3PL
            {true ? <FaCaretUp /> : <FaCaretDown />}
          </button>

          <button className={styles.sortBtn}>
            <MdRestore />
            Bulk Update
            {true ? <FaCaretUp /> : <FaCaretDown />}
          </button>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={styles.exportContainer}>
              <button onClick={toggleDropdown} className={styles.columnButton}>
                <Upload size={16} /> Export <ChevronDown size={16} />
              </button>
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownItem} onClick={exportToCSV}>
                    Export CSV
                  </div>
                  <div className={styles.dropdownItem} onClick={exportToExcel}>
                    Export Excel
                  </div>
                  <div className={styles.dropdownItem} onClick={exportToPDF}>
                    Export PDF
                  </div>
                </div>
              )}
            </div>
          </div>
         <button className={styles.sortBtn}>
            <MdRestore />
            Sort Date by
            {true ? <FaCaretUp /> : <FaCaretDown />}
          </button>

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
          {filteredOrders.length > 0 ? (
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
                        className={styles.checkbox_st}
                      />
                    </th>
                  )}
                  {visibleCols["map"] && (
                    <th className={styles.thSmall}>Map</th>
                  )}
                  {visibleCols.dateTime && (
                    <th className={styles.th}>Pickup Date, Time</th>
                  )}
                  {visibleCols.orderId && (
                    <th className={styles.th}>Order ID</th>
                  )}
                  {visibleCols.destination && (
                    <th className={styles.th}>Destination</th>
                  )}
                  {visibleCols.recipient && (
                    <th className={styles.th}>Recipient</th>
                  )}
                  {visibleCols.phone && (
                    <th className={styles.th}>Recipient's Tel</th>
                  )}
                  {visibleCols.payAmount && (
                    <th className={styles.th}>Payment Amt</th>
                  )}
                  {visibleCols.status && <th className={styles.th}>Status</th>}
                  {visibleCols.vendor && <th className={styles.th}>Vendor</th>}
                  {visibleCols.tpl && <th className={styles.th}>3PLs</th>}
                  {visibleCols.deliveryAmount && (
                    <th className={styles.th}>Delivery Fee</th>
                  )}
                  {visibleCols.orderdate && (
                    <th className={styles.th}>Delivery Date</th>
                  )}
                  {visibleCols.orderimg && (
                    <th className={styles.th}>Order Image</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr
                    key={order.orderId} // Use orderId as key instead of index
                    onClick={(e) => {
                      // Don't trigger row selection if clicking on a link or button
                      if (
                        e.target.tagName !== "A" &&
                        e.target.tagName !== "BUTTON"
                      ) {
                        toggleRowSelection(order.orderId);
                      }
                    }}
                    className={`${styles.tableRow} ${
                      selectedRows.includes(order.orderId)
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
                          checked={selectedRows.includes(order.orderId)}
                          onChange={(e) => {
                            toggleRowSelection(order.orderId, e);
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
                    {visibleCols.dateTime && (
                      <td className={styles.td}>{order.dateTime}</td>
                    )}
                    {visibleCols.orderId && (
                      <td className={styles.td}>{order.orderId}</td>
                    )}
                    {visibleCols.destination && (
                      <td className={styles.td}>{order.destination}</td>
                    )}
                    {visibleCols.recipient && (
                      <td className={styles.td}>{order.recipient}</td>
                    )}
                    {visibleCols.phone && (
                      <td className={styles.td}>{order.phone}</td>
                    )}
                    {visibleCols.payAmount && (
                      <td className={styles.td}>{order.payAmount}</td>
                    )}
                    {visibleCols.status && (
                      <td className={styles.td}>
                        <span
                          className={`${styles.status} ${
                            statusClass[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    )}
                    {visibleCols.vendor && (
                      <td className={styles.td}>{order.vendor}</td>
                    )}
                    {visibleCols.tpl && (
                      <td className={styles.td}>{order.tpl}</td>
                    )}
                    {visibleCols.deliveryAmount && (
                      <td className={styles.td}>{order.deliveryAmount}</td>
                    )}
                    {visibleCols.orderdate && (
                      <td className={styles.td}>{order.orderdate}</td>
                    )}
                    {visibleCols.orderimg && (
                      <td className={styles.td}>{order.orderimg}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.noResults}>
              {selectedDate
                ? `No orders found for ${selectedDate.toLocaleDateString()}`
                : "No orders match your filters"}
            </div>
          )}

          {/* <div className="pagination-tab">
            <PaginatedTabs pageCount={30} setItemOffset={setItemOffset} />
          </div> */}
        </div>

        
        <div className={showVendorFilter ? styles.pop_up_table_filter : styles.hide_table_filter}>
          <TableFilter
            tableTeadValues={["Role Title", "Description", "Number of Staffs"]}
          />
        </div>
      </div>

    
    </div>
  );
}
