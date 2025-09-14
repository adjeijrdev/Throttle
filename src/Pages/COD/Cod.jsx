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
import { useRef, useEffect } from "react";
import RightItemSelectTB from "../../Components/RightItemSelectTB/RightItemSelectTB";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { Upload } from "lucide-react";
import ExcelIcon from "../../Assets/icons/excel.png";
import PdfIcon from "../../Assets/icons/pdf.png";
import CsvIcon from "../../Assets/icons/csv.png";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useOrderCODSearch } from "../../graphql/graphqlConfiguration";
import {
  GET_ALL_ORDERS_COD,
  GET_ALL_RIDERS,
  GET_ALL_VENDORS,
} from "../../graphql/generalQueries";
import { formatDateTime } from "../../utils/formateDateTime";
import { useQuery } from "@apollo/client";
import CustomSearchInput from "../../Components/searchInputBox/CustomSearchInput";
import { payToVendrAPI } from "../../api/order";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
export default function Cod() {
  // const [orderIds, setOrderIds] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [filterByVendor, setFilterByVendor] = useState(null);
  const [filterByRider, setFilterByRider] = useState(null);
  const [tplStatus, setTplStatus] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filterOptions = ["Paid to Vendor", "Completed"];

  const actionOptions = ["Paid to Vendor", "Undo Paid to Vendor"];

  const [pickupDateFrom, setPickupDateFrom] = useState("");
  const [pickupDateTo, setPickupDateTo] = useState("");

  const [deliveryDateFrom, setDeliveryDateFrom] = useState("");
  const [deliveryDateTo, setDeliveryDateTo] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);

  const [orders, setOrders] = useState();

  const itemsPerPage = 15;
  const [itemOffset, setItemOffset] = useState(0);
  const {
    debouncedSearch,
    data: orderData,
    loading: orderLoading,
    error: orderError,
    fetchMore: fetchMoreOrder,
    refetch: refetchOrders,
  } = useOrderCODSearch(GET_ALL_ORDERS_COD, itemOffset, itemsPerPage);

  const totalNumberOfOrders = orderData?.cod?.totalCount;

  const [ridersOptions, setRidersOptions] = useState();
  const {
    loading: riderLoading,
    data: riderData,
    error: riderError,
    fetchMore: fetchMoreRider,
    refetch: refetchRider,
  } = useQuery(GET_ALL_RIDERS, {
    variables: {
      offset: 0,
      limit: 100,
      search: "",
      status: "APPROVED",
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const riders = riderData?.riders?.data?.map((rider) => {
      return {
        value: rider?._id,
        label: rider?.userProfile?.fullName,
      };
    });
    setRidersOptions(riders);
  }, [riderData]);

  const [vendorOption, setVendorOption] = useState();

  const {
    loading: vendorLoading,
    data: vendorData,
    error: vendorError,
    fetchMore: fetchMoreVendors,
    refetch: refetchVendors,
  } = useQuery(GET_ALL_VENDORS, {
    variables: {
      offset: 0,
      limit: 100,
      status: "APPROVED",
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const vendorsOpt = [{ value: "SELF", label: "Throttle" }];

    const vdOpt = vendorData?.vendors?.data?.map((vendor) => {
      return {
        value: vendor?._id,
        label: vendor?.businessInfo?.companyName,
      };
    });

    if (vdOpt) {
      setVendorOption([...vendorsOpt, ...vdOpt]);
    }
  }, [vendorData]);

  useEffect(() => {
    refetchVendors();
  }, []);

  useEffect(() => {
    console.log(orderData);
    setOrders(orderData?.cod);
  }, [orderData]);

  useEffect(() => {
    let orderIds = [];
    if (search) {
      let searchedIds = search.split(",");
      orderIds = [...searchedIds];
    }

    debouncedSearch(
      "",
      orderIds,
      pickupDateFrom,
      pickupDateTo,
      deliveryDateFrom,
      deliveryDateTo,

      filterByVendor?.value, //vendorId
      filterByRider?.value // riderId
    );
  }, [
    pickupDateFrom,
    pickupDateTo,
    deliveryDateFrom,
    deliveryDateTo,
    filterByVendor,
    filterByRider,
    search,
  ]);

  const handleReset = () => {
    setPickupDateFrom("");
    setPickupDateTo("");
    setDeliveryDateFrom("");
    setDeliveryDateTo("");
    setFilterByVendor(null)
    setFilterByRider(null)

    setSelectedOrders([]);
    setOrders([]);
    setSearch("")
    // refetchOrders({
    //   variables:{
    //     orderIds:[],
    //     pickupDateFrom:"",
    //     pickupDateTo:"",
    //     deliveryDateFrom:"",
    //     deliveryDateTo:"",
    //     vendorId:null,
    //     assignedTo:null
    //   }
    // })
  };



  const toggleTable = () => {
    setShowTable(!showTable);
  };
  const statusClass = {
    Completed: styles.completed,
    "Paid to Vendor": styles.paidtovendor,
  };

  const actionClass = {
    "Paid to Vendor": styles.paidto,
    "Undo Paid to Vendor": styles.undopaid,
  };

  const tplStatusOptions = [
    { value: "all", label: "All 3PLs" },
    { value: "delivered", label: "One Ghana Delivery" },
    { value: "pending", label: "Watson Delivery Company" },
    { value: "remitted", label: "Russell Delivery Ghana" },
    { value: "remitted", label: "Mckinney Delivery Company" },
    { value: "remitted", label: "No 3PL Select" },
  ];

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

  const handleSetSelectedOrders = (id) => {
    setSelectedOrders((prevOrders) => {
      let newOrders;

      if (!prevOrders?.includes(id)) {
        newOrders = [...prevOrders, id];
      } else {
        newOrders = prevOrders?.filter((_id) => _id !== id);
      }

      return newOrders;
    });
  };

  const [unPaidOrderLength, setUnPaidOrderLength] = useState(0);
  const handleSelectAllOrders = (e) => {
    let ordersIds = [];

    let _odrs = orders?.data?.filter((d) => {
      return d?.paymentStatus !== "PAID";
    });
    _odrs = _odrs?.map((d) => {
      return d?._id;
    });

    if (e.target?.checked == true) {
      ordersIds = _odrs;
    } else {
      ordersIds = [];
    }
    setUnPaidOrderLength(_odrs?.length);
    setSelectedOrders(ordersIds);
  };
  useEffect(() => {
    console.log(selectedOrders);
  }, [selectedOrders]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleBulkPayment = async (id) => {
    setIsSubmitting(true);
    try {
      const result =id?  await payToVendrAPI(id):payToVendrAPI(selectedOrders)

      toast.success(result.data.message, {
        style: {
          border: "1px solid #17654F",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });
      refetchOrders();
    } catch (error) {
      toast.error(error.message, {
        style: {
          border: "1px solid oklch(88.5% 0.062 18.334)",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "oklch(39.6% 0.141 25.723)",
          fontSize: "16px",
          width: "500px",
        },
      });
    }
    setIsSubmitting(false);
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

          <div className={styles.search_filter_con}>
            <button
              className={styles.columnButton}
              onClick={()=>handleReset()}
            >
              {" "}
              Clear All Filters
            </button>

            <CustomSearchInput
              bgColor={"white"}
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>

        <div className={styles.filed1}>
          <div className={styles.filed1_in1}>
            <div className={styles.detailstitle}>
              Filters{" "}
              <img
                src={funnelIcon}
                alt="funnel Icon"
                style={{ width: "16px", height: "16px" }}
              />
            </div>
            <div className={styles.filed1_in1}>
              <div className={styles.dateFilterContainer}>
                <div className={styles.dateFilterContainerTitle}>
                  Pickup Date
                </div>
                <div className={styles.OutercontainerRight}>
                  <div className={styles.filed1_in2_con1}>
                    <label>From</label>
                    <CustomDatePicker
                      date={pickupDateFrom}
                      setDate={setPickupDateFrom}
                    />
                  </div>
                  <div className={styles.filed1_in2_con1}>
                    <label>To</label>
                    <CustomDatePicker
                      date={pickupDateTo}
                      setDate={setPickupDateTo}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.dateFilterContainer}>
                <div className={styles.dateFilterContainerTitle}>
                  Delivery Date
                </div>

                <div className={styles.OutercontainerRight}>
                  <div className={styles.filed1_in2_con1}>
                    <label>From</label>
                    <CustomDatePicker
                      date={deliveryDateFrom}
                      setDate={setDeliveryDateFrom}
                    />
                  </div>
                  <div className={styles.filed1_in2_con1}>
                    <label>To</label>
                    <CustomDatePicker
                      date={deliveryDateTo}
                      setDate={setDeliveryDateTo}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.Outercontainertwo}>
              <div className={styles.remarks}>
                <label>Vendor</label>
                <CustomSelector2
                  options={vendorOption}
                  selectedValue={filterByVendor}
                  setSelectedValue={setFilterByVendor}
                  placeholder={"All Vendors"}
                  width="37rem"
                />
              </div>
              <div className={styles.remarks}>
                <label>3PL</label>
                <CustomSelector2
                  options={tplStatusOptions}
                  selectedValue={tplStatus}
                  setSelectedValue={setTplStatus}
                  placeholder={"All 3PLs"}
                  width="37rem"
                />
              </div>
              <div className={styles.remarks}>
                <label>Rider</label>
                <CustomSelector2
                  options={ridersOptions}
                  selectedValue={filterByRider}
                  setSelectedValue={setFilterByRider}
                  placeholder={"All Riders"}
                  width="37rem"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.carditem}>
          <button className={styles.carditem__1}>
            <span className={styles.iconwrap_1}>
              <img src={greencheckIcon} alt="check" size={12} />
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <text style={{ color: "#17654F" }}>Completed Orders</text>
              <text
                style={{
                  fontWeight: "600",
                  fontSize: "2.5rem",
                  display: "inline-flex",
                }}
              >
                {orders?.completedOrderNum || 0}
              </text>
            </div>
          </button>

          <button className={styles.carditem__2}>
            <span className={styles.iconwrap_2}>
              <img src={moneyIcon} alt="moneybag" size={12} />
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <text style={{ color: "#AD7611" }}>Total Revenue</text>
              <text
                style={{
                  fontWeight: "600",
                  fontSize: "2.5rem",
                  display: "inline-flex",
                }}
              >
                GHC {orders?.totalRevenue || 0}
              </text>
            </div>
          </button>

          <button className={styles.carditem__3}>
            <span className={styles.iconwrap_3}>
              <img src={cashIcon} alt="cash" size={12} />
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <text style={{ color: "#115FAD" }}> Total Delivery Fees</text>
              <text
                style={{
                  fontWeight: "600",
                  fontSize: "2.5rem",
                  display: "inline-flex",
                }}
              >
                GHC {orders?.totalDeliveryFee || 0}
              </text>
            </div>
          </button>

          <button className={styles.carditem__4}>
            <span className={styles.iconwrap_4}>
              <img src={redclockIcon} alt="redclock" size={12} />
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <text style={{ color: "#E11515" }}>Pending Remittance</text>
              <text
                style={{
                  fontWeight: "600",
                  fontSize: "2.5rem",
                  display: "inline-flex",
                }}
              >
                GHC {orders?.pendingRemittance || 0}
              </text>
            </div>
          </button>

          <button className={styles.carditem__5}>
            <span className={styles.iconwrap_5}>
              <img src={payIcon} alt="money" size={12} />
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <text style={{ color: "#43A047" }}>Paid to Vendor</text>
              <text
                style={{
                  fontWeight: "600",
                  fontSize: "2.5rem",
                  display: "inline-flex",
                }}
              >
                GHC {orders?.paidToVendor || 0}
              </text>
            </div>
          </button>
        </div>
        <div className={styles.btncontainercod}>
          <button
            className={styles.sortBtn}
            onClick={() => handleBulkPayment()}
          >
            {/* <MdRestore /> */}

            {isSubmitting ? <BeatLoader color="white" /> : " Paid to Vendor"}
            {/* <FaCaretDown /> */}
          </button>
          <button className={styles.sortBtn}>
            <MdRestore />
            Remove Paid to Vendor
            <FaCaretDown />
          </button>

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
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th className={styles.th}>
                  <input
                    type="checkbox"
                    style={{
                      width: "16px",
                      height: "16px",
                      verticalAlign: "middle",
                      filter: "invert(30%)",
                    }}
                    onChange={(e) => handleSelectAllOrders(e)}
                    checked={unPaidOrderLength === selectedOrders?.length}
                  />
                </th>
                <th>Order ID</th>
                <th>Vendor</th>
                <th>Pickup Date & Time</th>

                <th>Delivery Date & Time</th>
                <th>Paid Date & Time</th>
                <th>Order Price</th>
                <th>Delivery Fee</th>
                <th>3PL/Rider</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.data?.map((order) => (
                <tr key={order._id}>
                  <td className={styles.th}>
                    <input
                      type="checkbox"
                      style={{
                        width: "16px",
                        height: "16px",
                        verticalAlign: "middle",
                      }}
                      id={order._id}
                      disabled={order?.paymentStatus === "PAID"}
                      onChange={(e) => handleSetSelectedOrders(e.target.value)}
                      value={order._id}
                      checked={
                        selectedOrders?.includes(order?._id) &&
                        order?.paymentStatus !== "PAID"
                      }
                    />
                  </td>
                  <td>{order?.orderId}</td>
                  <td>{order?.source?.businessInfo?.companyName || "SELF"}</td>
                  <td>{formatDateTime(order?.orderDate)}</td>

                  <td>{formatDateTime(order?.orderDate)}</td>
                  <td>{formatDateTime(order?.paidDate)}</td>

                  <td style={{ color: "red" }}>{order?.paymentAmount}</td>
                  <td style={{ color: "blue" }}>{order?.deliveryFee}</td>
                  <td>{order?.assignedTo?.userProfile?.fullName}</td>
                  <td>
                    <span
                      className={`${styles.statusPill} ${
                        statusClass[order.status] || ""
                      }`}
                    >
                      {order?.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`${styles.actionButton} ${
                        actionClass[order.action] || ""
                      }`}
                      style={{
                        cursor:
                          order?.paymentStatus == "PAID"
                            ? "not-allowed"
                            : "pointer",
                      }}
                      disabled={order?.paymentStatus == "PAID" ? true : false}
                      // onClick={() => handleAddAction(order._id)}
                      onClick={() => handleBulkPayment([order?._id])}
                    >
            {isSubmitting ? <BeatLoader color="white" /> : "Pay"}

                    
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
