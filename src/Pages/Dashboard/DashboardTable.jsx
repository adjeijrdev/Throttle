import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import toast from "react-hot-toast";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { format, parseISO } from "date-fns";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import { Upload, Eye, ChevronDown } from "lucide-react";

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
  {
    orderId: "A0M620",
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
    orderId: "A0M621",
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
    orderId: "A0M622",
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
    orderId: "A0M623",
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
    orderId: "A0M624",
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
    orderId: "A0M625",
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
    orderId: "A0M626",
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
    orderId: "A0M627",
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

const allColumns = [
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

export default function DashboardTable() {
  const [filter, setFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showColsDropdown, setShowColsDropdown] = useState(false);
  const [visibleCols, setVisibleCols] = useState(
    allColumns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );

  const handleColChange = (key) => {
    setVisibleCols((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleColDropdown = () => setShowColsDropdown((prev) => !prev);

  const clearFilters = () => {
    // setEnteredDate("");
    // setFilter("All");
    // setDateRange({ start: null, end: null });
    // setSelectionPhase("start");
  };

  const exportToCSV = () => {
    //   const rows = filteredOrders.map((o) => ({
    //     "Pickup Date, Time": o.dateTime,
    //     "Order ID": o.orderId,
    //     Destination: o.destination,
    //     Recipient: o.recipient,
    //     "Recipient's Tel": o.phone,
    //     "Payment Amt": o.payAmount,
    //     Status: o.status,
    //     Vendor: o.vendor,
    //     "3PLs": o.tpl,
    //     "Delivery Fee": o.deliveryAmount,
    //     "Delivery Date": o.orderdate,
    //     "Order Image": o.orderimg,
    //   }));
    //   const header = Object.keys(rows[0]);
    //   const csv = [
    //     header.join(","),
    //     ...rows.map((row) => header.map((field) => `"${row[field]}"`).join(",")),
    //   ].join("\n");
    //   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    //   saveAs(blob, "orders.csv");
    //   setShowDropdown(false);
  };

  const exportToExcel = () => {
    // const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    // const excelBuffer = XLSX.write(workbook, {
    //   bookType: "xlsx",
    //   type: "array",
    // });
    // const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    // saveAs(blob, "orders.xlsx");
    // setShowDropdown(false);
  };

  const exportToPDF = () => {
    //   try {
    //     // Check if there's data to export
    //     if (!filteredOrders || filteredOrders.length === 0) {
    //       alert("No orders to export");
    //       setShowDropdown(false);
    //       return;
    //     }
    //     // Initialize PDF document
    //     const doc = new jsPDF({
    //       orientation: "landscape",
    //     });
    //     // Add title
    //     doc.setFontSize(16);
    //     doc.text("Orders Report", 14, 15);
    //     // Prepare table data
    //     const headers = [
    //       "Date/Time",
    //       "Order ID",
    //       "Destination",
    //       "Recipient",
    //       "Phone",
    //       "Amount",
    //       "Status",
    //       "Vendor",
    //       "3PL",
    //       "Delivery Fee",
    //       "Delivery Date",
    //     ];
    //     const data = filteredOrders.map((order) => [
    //       order.dateTime || "",
    //       order.orderId || "",
    //       order.destination || "",
    //       order.recipient || "",
    //       order.phone || "",
    //       order.payAmount || "",
    //       order.status || "",
    //       order.vendor || "",
    //       order.tpl || "",
    //       order.deliveryAmount || "",
    //       order.orderdate || "",
    //     ]);
    //     // Generate the table
    //     autoTable(doc, {
    //       head: [headers],
    //       body: data,
    //       startY: 20,
    //       styles: {
    //         fontSize: 8,
    //         cellPadding: 2,
    //         overflow: "linebreak",
    //       },
    //       headStyles: {
    //         fillColor: [41, 128, 185],
    //         textColor: [255, 255, 255],
    //         fontStyle: "bold",
    //       },
    //     });
    //     // Save the PDF
    //     doc.save("orders-report.pdf");
    //     setShowDropdown(false);
    //   } catch (error) {
    //     console.error("PDF export error:", error);
    //     alert("Failed to generate PDF. Please check console for details.");
    //     setShowDropdown(false);
    //   }
  };

const tableTheme = useTheme([
  getTheme(),
  {
    Table: `
      border-radius: 0px 8px 0rem 0rem;
      border: 0.1rem solid #979595;

    
      --data-table-library_grid-template-columns: 
        50px 100px 160px 200px 160px 160px 160px 140px 140px 160px 140px 160px 160px;

      min-width: 1200px;
    `,
    BaseCell: `
      height: 47px;
    `,
    BaseRow: `
    `,
    Cell: `
      color:#06264D;
      height:56px;
      font-size: 1.4rem;
      font-weight:500;
      font-family: "Poppins", sans-serif;

      & input {
        width:15.98px;
        height:15.09px;
        border-radius:4px;
        outline:1px solid green;
        border:1px solid green !important;
      }

      & .btn-container {
        display: flex;
        gap: 0.5rem;

        & button {
          padding: 0.7rem 3rem;
          border-radius: 0.8rem;
          border: 0.1rem solid #cdd4db;
          background-color: transparent;
          cursor: pointer;
          color: #003627;
          transition-duration: 250ms;
          transition-property: background-color, color, border;
          transition-timing-function: ease-in-out;
        }
      }
    `,
    HeaderRow: `
      background-color: #17654F;
      border-color: #003627;
      height: 56px;
      padding:25px;
    `,
    HeaderCell: `
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 1.6rem;
      color: #FFFFFF;

      & input {
        border-color:#fff;
        width:15.98px;
        height:15.09px;
        border-radius:4px;
        outline:1px solid green;
      }

      & .header-action {
        padding-left:6rem;
      }
    `,
    Body: `
      /* Optional custom scrollbars */
      &::-webkit-scrollbar {
        height: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }
    `,
    Row: `
      cursor: pointer;
      transition-duration: 250ms;
      transition-property: background-color;
      transition-timing-function: ease-in-out;

      &:hover {
        background-color:#D6E3E0;
        border-color:#979595;
      }
    `,
  },
]);



  return (
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

          <button
            className={styles.addorder}
            //   onClick={toggleAddOrderDropdown}
          >
            Add Order +
          </button>
        </div>
      </div>

      <div className={styles.tableContainerOuter}>
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
         <div style={{ overflowX: "auto", width: "100%" }}>
 <Table
          data={{ nodes: [...(allOrders || [])] }}
          theme={tableTheme}
          layout={{ custom: true, horizontalScroll: true }}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>
                    <input type="checkbox" />
                  </HeaderCell>

                  {visibleCols["map"] && <HeaderCell>Map</HeaderCell>}

                  {visibleCols?.orderId && <HeaderCell>Order ID</HeaderCell>}

                  {visibleCols?.dateTime && (
                    <HeaderCell>Pickup Date,Time</HeaderCell>
                  )}

                  {visibleCols?.destination && (
                    <HeaderCell>Destintion</HeaderCell>
                  )}

                  {visibleCols?.recipient && (
                    <HeaderCell>Recipient's Tel</HeaderCell>
                  )}

                  {visibleCols?.payAmount && (
                    <HeaderCell>Payment Amt</HeaderCell>
                  )}

                  {visibleCols?.status && <HeaderCell>Status</HeaderCell>}

                  {visibleCols?.vendor && <HeaderCell>Vendor</HeaderCell>}

                  {visibleCols?.tpl && <HeaderCell>Assigned To</HeaderCell>}

                  {visibleCols?.deliveryAmount && (
                    <HeaderCell>Delivery Fee</HeaderCell>
                  )}

                  {visibleCols?.orderdate && (
                    <HeaderCell>Delivery Date</HeaderCell>
                  )}

                  {visibleCols?.orderimg && (
                    <HeaderCell>Order Image</HeaderCell>
                  )}
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item._id} item={item}>
                    <Cell>
                      <input type="checkbox" />
                    </Cell>
                   
                  {visibleCols["map"] && <Cell>Map</Cell>}

                  {visibleCols?.orderId && <Cell>Order ID</Cell>}

                  {visibleCols?.dateTime && (
                    <Cell>Pickup Date,Time</Cell>
                  )}

                  {visibleCols?.destination && (
                    <Cell>Destintion</Cell>
                  )}

                  {visibleCols?.recipient && (
                    <Cell>Recipient's Tel</Cell>
                  )}

                  {visibleCols?.payAmount && (
                    <Cell>Payment Amt</Cell>
                  )}

                  {visibleCols?.status && <Cell>Status</Cell>}

                  {visibleCols?.vendor && <Cell>Vendor</Cell>}

                  {visibleCols?.tpl && <Cell>Assigned To</Cell>}

                  {visibleCols?.deliveryAmount && (
                    <Cell>Delivery Fee</Cell>
                  )}

                  {visibleCols?.orderdate && (
                    <Cell>Delivery Date</Cell>
                  )}

                  {visibleCols?.orderimg && (
                    <Cell>Order Image</Cell>
                  )}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
         </div>
       
      </div>
    </div>
  );
}
