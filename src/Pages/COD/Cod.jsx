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
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { Upload} from "lucide-react";
import ExcelIcon from "../../Assets/icons/excel.png";
import PdfIcon from "../../Assets/icons/pdf.png";
import CsvIcon from "../../Assets/icons/csv.png";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function Cod() {
  const [orderIds, setOrderIds] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
 
 

  const filterOptions = [
    "Paid to Vendor",
    "Completed",
  ];


  // Mock data - replace with your actual data fetching logic
  const mockOrderData = [
    {
      dateTime: "2024-12-10, 01:53",
      id: "A0M600",
      vendor: "Ishtari Ghana",
      status: "Paid to Vendor",
      action: "Undo Paid to Vendor",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",

    },
    {
      dateTime: "2024-12-10, 01:53",
      id: "A0M601",
      vendor: "Ishtari Ghana",
     status: "Completed",
      action: "Paid to Vendor",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-12-10, 01:53",
      id: "A0M602",
      vendor: "Ishtari Ghana",
      status: "Paid to Vendor",
       action: "Undo Paid to Vendor",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30, 01:53",
      id: "A0M603",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Paid to Vendor",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30, 01:53",
      id: "A0M604",
      vendor: "Ishtari Ghana",
     status: "Completed",
     action: "Paid to Vendor",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30,01:53",
      id: "A0M605",
      vendor: "Ishtari Ghana",
      status: "Completed",
   action: "Paid to Vendor",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30, 01:53",
      id: "A0M6306",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Paid to Vendor",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30, 01:53",
      id: "A0M6057",
      vendor: "Ishtari Ghana",
      status: "Completed",
     action: "Paid to Vendor",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30, 01:53",
      id: "A0M6078",
      vendor: "Ishtari Ghana",
      status: "Completed",
      action: "Paid to Vendor",
      orderprice:"GHC350.00",
      deliveryfee:"GHC22.00",
      rider:"Robert Trost",
    },
    {
      dateTime: "2024-10-30, 01:53",
      id: "A0M5609",
      vendor: "Ishtari Ghana",
     status: "Completed",
     action: "Paid to Vendor",
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
    "Paid to Vendor": styles.paidtovendor,
  };

  const deliveryStatusOptions = [
    { value: "all", label: "All" },
    { value: "delivered", label: "Delivered" },
    { value: "pending", label: "Pending Remittance" },
    { value: "remitted", label: "Remitted" },
  ];


//  const [showDropdown, setShowDropdown] = useState(false);

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
<div className={styles.btncontainercod}>
   <button className={styles.sortBtn}>
              <MdRestore />
              Remove Paid to Vendor<FaCaretDown />
            </button>
            <button className={styles.sortBtn}>
              <MdRestore />
               Paid to Vendor<FaCaretDown />
            </button>
             <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className={styles.exportContainer}>
                          <button onClick={toggleDropdown} className={styles.columnButton}>
                            <Upload size={16} /> Export <FaCaretDown />
                          </button>
                          {showDropdown && (
                            <div className={styles.dropdownMenu}>
                              <div className={styles.dropdownItem} onClick={exportToExcel}>
                               < img src = {ExcelIcon} size={18}/>Excel
                              </div>
                              <div className={styles.dropdownItem} onClick={exportToPDF}>
                                < img src = {PdfIcon} size={18}/>PDF
                              </div>
                               <div className={styles.dropdownItem} onClick={exportToCSV}>
                              < img src = {CsvIcon} size={18}/>CSV
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
</div>

 <div className={styles.tableContainer}>
                <table className={styles.orderTable}>
                  <thead>
                    <tr>
                          <th className={styles.th}><input type="checkbox"
                                style={{ width: "16px", height: "16px", verticalAlign: "middle",filter: "invert(30%)" }}/></th>
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
        <td className={styles.th}><input type="checkbox"
                                style={{ width: "16px", height: "16px", verticalAlign: "middle" }}/></td>
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

