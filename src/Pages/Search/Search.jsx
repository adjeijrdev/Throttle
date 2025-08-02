import { useState } from "react";
import styles from "./Search.module.css";
import NewDelivery from "./NewDelivery";
import reseticon from '../../Assets/icons/reseticon.png';
import searchicon from '../../Assets/icons/searchicon.png';
import locationIcon from '../../Assets/icons/location.png';
import boxIcon from '../../Assets/icons/smallbox.png';
import { ChevronDown, Eye, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Pagination from "../Dashboard/Pagination";
// Reusing your order data structure from dashboard
 const allOrders = [
  {
    orderId: 'A0M600',
    dateTime: '2024-12-10, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Completed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-12-10',
    orderimg:'',
  },
  {
    orderId: 'A0M601',
    dateTime: '2024-12-10, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Rejected',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-12-10',
    orderimg:'',
  },
   {
    orderId: 'A0M602',
    dateTime: '2024-12-10, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'In Progress',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-12-10',
    orderimg:'',
  },
   {
    orderId: 'A0M603',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Completed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M604',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Failed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M605',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Assigned',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M606',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Returned',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M607',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Completed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
  {
    orderId: 'A0M608',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Rejected',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M609',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'In Progress',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M610',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Completed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M611',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Failed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M612',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Assigned',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M613',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Returned',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M614',
    dateTime: '2024-12-10, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Order Placed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-12-10',
    orderimg:'',
  },
  {
    orderId: 'A0M615',
    dateTime: '2024-12-10, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Order Placed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-12-10',
    orderimg:'',
  },
   {
    orderId: 'A0M616',
    dateTime: '2024-12-10, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'In Progress',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-12-10',
    orderimg:'',
  },
   {
    orderId: 'A0M617',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Order Placed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M618',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Failed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M619',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Assigned',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M620',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Returned',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M621',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Completed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
  {
    orderId: 'A0M622',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Rejected',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M623',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'In Progress',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M624',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Completed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M625',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Failed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M626',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Assigned',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
   {
    orderId: 'A0M627',
    dateTime: '2024-10-30, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    payAmount: 'GHC350.00',
    status: 'Returned',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     deliveryAmount: 'GHC350.00',
    orderdate:'2024-10-30',
    orderimg:'',
  },
  // Add more data...
];


export default function AddOrder() {
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 5;
   const [searchParams, setSearchParams] = useState({
    orderId: '',
    recipient: '',
    vendor: '',
    location: '',
    tpl: '',
    rider: ''
  });
  const [pickupDateFrom, setPickupDateFrom] = useState('');
  const [pickupDateTo, setPickupDateTo] = useState('');
  const [deliveryDateFrom, setDeliveryDateFrom] = useState('');
  const [deliveryDateTo, setDeliveryDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showColsDropdown, setShowColsDropdown] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isHeaderSelected, setIsHeaderSelected] = useState(false);
const [filter, setFilter] = useState('All');
  const handleSearchParamsChange = (params) => {
    setSearchParams(params);
  };

  // Filter orders based on search criteria
  const filteredOrders = allOrders.filter(order => {
    // Search parameters
    const matchesOrderId = searchParams.orderId === '' || 
      order.orderId.toLowerCase().includes(searchParams.orderId.toLowerCase());
    
    const matchesRecipient = searchParams.recipient === '' || 
      order.recipient.toLowerCase().includes(searchParams.recipient.toLowerCase());
    
    const matchesVendor = searchParams.vendor === '' || 
      order.vendor.toLowerCase().includes(searchParams.vendor.toLowerCase());
    
    const matchesLocation = searchParams.location === '' || 
      order.destination.toLowerCase().includes(searchParams.location.toLowerCase());
    
    const matchesTpl = searchParams.tpl === '' || 
      order.tpl.toLowerCase().includes(searchParams.tpl.toLowerCase());

      const matchesRider = searchParams.rider === '' || 
      order.tpl.toLowerCase().includes(searchParams.rider.toLowerCase()); // Assuming rider is same as tpl

    // Date and status filters (keep as before)
    const pickupDate = new Date(order.dateTime.split(',')[0].trim());
    const pickupFrom = pickupDateFrom ? new Date(pickupDateFrom) : null;
    const pickupTo = pickupDateTo ? new Date(pickupDateTo) : null;
    
    const matchesPickupDate = (
      (!pickupFrom || pickupDate >= pickupFrom) && 
      (!pickupTo || pickupDate <= pickupTo)
    );

    const deliveryDate = new Date(order.orderdate);
    const deliveryFrom = deliveryDateFrom ? new Date(deliveryDateFrom) : null;
    const deliveryTo = deliveryDateTo ? new Date(deliveryDateTo) : null;
    
    const matchesDeliveryDate = (
      (!deliveryFrom || deliveryDate >= deliveryFrom) && 
      (!deliveryTo || deliveryDate <= deliveryTo)
    );

    // Modified status filter logic
  const matchesStatus = 
    (statusFilter === '' && filter === 'All') || // Show all when no filters
    (statusFilter === '' && filter !== 'All' && order.status === filter) || // Button filter
    (statusFilter !== '' && order.status.toLowerCase().includes(statusFilter.toLowerCase())); // Dropdown filter


    return (
      matchesOrderId &&
      matchesRecipient &&
      matchesVendor &&
      matchesLocation &&
      matchesTpl &&
      matchesRider &&
      matchesPickupDate &&
      matchesDeliveryDate &&
      matchesStatus
    );
  });

  const filterOptions = [
  'All',
  'Order Placed',
  'In Progress',
  'Assigned',
  'Completed',
  'Returned',
  'Failed',
  'Rejected',
];
  // Reusing your column structure from dashboard
  const allColumns = [
    {
      key: 'box',
      label: (
        <img
          src={boxIcon}
          alt="box"
          style={{ width: '14px', height: '14px', verticalAlign: 'middle' }}
        />
      ),
    },
    { key: 'map', label: 'Map' },
    { key: 'dateTime', label: 'Pickup Date, Time' },
    { key: 'orderId', label: 'Order ID' },
    { key: 'destination', label: 'Destination' },
    { key: 'recipient', label: 'Recipient' },
    { key: 'phone', label: 'Recipient Tel' },
    { key: 'payAmount', label: 'Payment Amt' },
    { key: 'status', label: 'Status' },
    { key: 'vendor', label: 'Vendor' },
    { key: 'tpl', label: '3PLs' },
    { key: 'deliveryAmount', label: 'Delivery Fee' },
    { key: 'orderdate', label: 'Delivery Date' },
    { key: 'orderimg', label: 'Order Image' },
  ];

  const [visibleCols, setVisibleCols] = useState(
    allColumns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );

  // Status class mapping from your dashboard
const statusClass = {
  Completed: styles.completed,
  Rejected: styles.rejected,
  'In Progress': styles.inProgress,
  Failed: styles.failed,
  Assigned: styles.assigned,
  Returned: styles.returned,
  'Order Placed': styles.inProgress,
};
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };



  const handleReset = () => {
    setSearchParams({
      orderId: '',
      recipient: '',
      vendor: '',
      location: '',
      tpl: '',
      rider: ''
    });
    setPickupDateFrom('');
    setPickupDateTo('');
    setDeliveryDateFrom('');
    setDeliveryDateTo('');
    setStatusFilter('');
    setCurrentPage(3);
  };

  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const toggleColDropdown = () => setShowColsDropdown(prev => !prev);

  const handleColChange = (key) => {
    setVisibleCols(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleRowSelection = (orderId, e) => {
    if (e && e.target.type === 'checkbox') {
      e.stopPropagation();
    }
    
    setSelectedRows(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  };

  // Export functions (similar to your dashboard)
  const exportToCSV = () => {
    const rows = filteredOrders.map((o) => ({
      'Pickup Date, Time': o.dateTime,
      'Order ID': o.orderId,
      Destination: o.destination,
      Recipient: o.recipient,
      "Recipient's Tel": o.phone,
      'Payment Amt': o.payAmount,
      Status: o.status,
      Vendor: o.vendor,
      '3PLs': o.tpl,
      'Delivery Fee': o.deliveryAmount,
      'Delivery Date': o.orderdate,
      'Order Image': o.orderimg,
    }));

    const header = Object.keys(rows[0]);
    const csv = [
      header.join(','),
      ...rows.map(row => header.map(field => `"${row[field]}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'orders.csv');
    setShowDropdown(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'orders.xlsx');
    setShowDropdown(false);
  };

  const exportToPDF = () => {
    try {
      if (!filteredOrders || filteredOrders.length === 0) {
        alert('No orders to export');
        setShowDropdown(false);
        return;
      }

      const doc = new jsPDF({
        orientation: 'landscape'
      });

      doc.setFontSize(16);
      doc.text('Orders Report', 14, 15);

      const headers = [
        'Date/Time',
        'Order ID',
        'Destination',
        'Recipient',
        'Phone',
        'Amount',
        'Status',
        'Vendor',
        '3PL',
        'Delivery Fee',
        'Delivery Date'
      ];

      const data = filteredOrders.map(order => [
        order.dateTime || '',
        order.orderId || '',
        order.destination || '',
        order.recipient || '',
        order.phone || '',
        order.payAmount || '',
        order.status || '',
        order.vendor || '',
        order.tpl || '',
        order.deliveryAmount || '',
        order.orderdate || ''
      ]);

      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 20,
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak'
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        }
      });

      doc.save('orders-report.pdf');
      setShowDropdown(false);
    } catch (error) {
      console.error('PDF export error:', error);
      alert('Failed to generate PDF. Please check console for details.');
      setShowDropdown(false);
    }
  };
try{
  return (
    <div className="dashboard-content">
       <div style={{maxWidth:'100%', display:'flex', justifyContent:'space-between', borderBottom:' 0.25rem solid #ddd', marginBottom:'1.5rem'}} >
    <div style={{display:'grid'}}>
      <div className={styles.overview}>Search Order</div>
     <div className={styles.overviewtext}>Visual summary of key sales performance metrics and your data</div>
     </div>
     </div>

      <div className={styles.searchcontent}>
        <NewDelivery onSearch={handleSearchParamsChange}/>

        <div className={styles.controlRight}>
          <div className={styles.control_container}>
            <div className={styles.date__controls}>
               <label>Pickup Date</label>
              <div className={styles.pickdate}>
                <div className={styles.calendar}>
                  <input
                    type="date"
                    value={pickupDateFrom}
                    onChange={(e) => setPickupDateFrom(e.target.value)}
                  />
                </div>
                <div className={styles.to}>To</div>
                <div className={styles.calendar}>
                  <input
                    type="date"
                    value={pickupDateTo}
                    onChange={(e) => setPickupDateTo(e.target.value)}
                  />
                </div>
              </div>
                    <label>Delivery Date</label>
              <div className={styles.pickdate}>
                <div className={styles.calendar}>
                  
                  <input
                    type="date"
                    value={deliveryDateFrom}
                    onChange={(e) => setDeliveryDateFrom(e.target.value)}
                  />
                </div>
                <div className={styles.to}>To</div>
                <div className={styles.calendar}>
                  <input
                    type="date"
                    value={deliveryDateTo}
                    onChange={(e) => setDeliveryDateTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.status__controls}>
            <div className={styles.status__control}>
              <label>Order Status</label>
              <select
                value={statusFilter}
               onChange={(e) => {
               setStatusFilter(e.target.value);
              setFilter(e.target.value === '' ? 'All' : e.target.value);
               }} >
                <option value="">Choose Status</option>
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
      </div>

      <div className={styles.btncontainer}>
        <button className={styles.resetbtn} onClick={handleReset}>
          <img src={reseticon} alt="reset Icon" style={{ width: '16px', height: '16px' }} /> Reset
        </button>
        <button className={styles.searchbtn} onClick={() => setCurrentPage(3)}>
          <img src={searchicon} alt="search Icon" style={{ width: '16px', height: '16px' }} /> Search
        </button>
      </div>

    <div style={{maxWidth:'100%', display:'flex', justifyContent:'space-between', borderBottom:' 0.25rem solid #ddd', marginBottom:'1.5rem',marginTop:'1.5rem'}} >
    <div style={{display:'grid'}}>
      <div className={styles.overview}>Search Results</div>
     <div className={styles.overviewtext}>Visual summary of key sales performance metrics and your data</div>
     </div>
    
    {/* Export and Column Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', margin: '1rem 0' }}>
        <div className={styles.exportContainer}>
          <button onClick={toggleDropdown} className={styles.columnButton}>
            <Upload size={16} /> Export <ChevronDown size={16} />
          </button>
          {showDropdown && (
            <div className={styles.dropdownMenu}>
             <div className={styles.dropdownItem} onClick={exportToCSV}>Export CSV</div>
                     <div className={styles.dropdownItem} onClick={exportToExcel}>Export Excel</div>
                     <div className={styles.dropdownItem} onClick={exportToPDF}>Export PDF</div>
            </div>
          )}
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
      </div>
    
  
    </div>
      

     
{/* Orders Table */}
<div className={styles.tableContainerOuter}>
  <div className={styles.tableContainer}>
    {/* Filter Row - matches dashboard styling */}
    <div className={styles.filters}>
      {filterOptions.map((option) => (
        <button
          key={option}
         onClick={() => {
        setFilter(option);
        setStatusFilter(option === 'All' ? '' : option);}}
          className={`${styles.filterButton} ${
            filter === option ? styles.activeFilter : ''
          }`}
        >
          {option}
        </button>
      ))}
    </div>

    {filteredOrders.length > 0 ? (
      <table className={styles.table}>
        <thead className={styles.tableheader}>
          <tr 
            onClick={() => setIsHeaderSelected(!isHeaderSelected)}
            className={`${styles.headerRow} ${isHeaderSelected ? styles.selectedHeader : ''}`}
          >
            {visibleCols.box && 
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
            }
            {visibleCols.map && <th className={styles.thSmall}>Map</th>}
            {visibleCols.dateTime && <th className={styles.th}>Pickup Date, Time</th>}
            {visibleCols.orderId && <th className={styles.th}>Order ID</th>}
            {visibleCols.destination && <th className={styles.th}>Destination</th>}
            {visibleCols.recipient && <th className={styles.th}>Recipient</th>}
            {visibleCols.phone && <th className={styles.th}>Recipient's Tel</th>}
            {visibleCols.payAmount && <th className={styles.th}>Payment Amt</th>}
            {visibleCols.status && <th className={styles.th}>Status</th>}
            {visibleCols.vendor && <th className={styles.th}>Vendor</th>}
            {visibleCols.tpl && <th className={styles.th}>3PLs</th>}
            {visibleCols.deliveryAmount && <th className={styles.th}>Delivery Fee</th>}
            {visibleCols.orderdate && <th className={styles.th}>Delivery Date</th>}
            {visibleCols.orderimg && <th className={styles.th}>Order Image</th>}
          </tr>
        </thead>
        
        <tbody>
          {filteredOrders.map((order) => (
            <tr 
              key={order.orderId}
              onClick={(e) => {
                if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                  toggleRowSelection(order.orderId);
                }
              }}
              className={`${styles.tableRow} ${selectedRows.includes(order.orderId) ? styles.selectedRow : ''}`}
            >
              {visibleCols.box && (
                <td className={styles.td} onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(order.orderId)}
                    onChange={(e) => {
                      toggleRowSelection(order.orderId, e);
                    }}
                  />
                </td>
              )}
              {visibleCols.map && <td className={styles.td}> <img src={locationIcon} alt="Location Icon" style={{ width: '16px', height: '16px' }} /></td>}
              {visibleCols.dateTime && <td className={styles.td}>{order.dateTime}</td>}
              {visibleCols.orderId && <td className={styles.td}>{order.orderId}</td>}
              {visibleCols.destination && <td className={styles.td}>{order.destination}</td>}
              {visibleCols.recipient && <td className={styles.td}>{order.recipient}</td>}
              {visibleCols.phone && <td className={styles.td}>{order.phone}</td>}
              {visibleCols.payAmount && <td className={styles.td}>{order.payAmount}</td>}
              {visibleCols.status && (
                <td className={styles.td}>
                  <span className={`${styles.status} ${statusClass[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              )}
              {visibleCols.vendor && <td className={styles.td}>{order.vendor}</td>}
              {visibleCols.tpl && <td className={styles.td}>{order.tpl}</td>}
              {visibleCols.deliveryAmount && <td className={styles.td}>{order.deliveryAmount}</td>}
              {visibleCols.orderdate && <td className={styles.td}>{order.orderdate}</td>}
              {visibleCols.orderimg && <td className={styles.td}>{order.orderimg}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className={styles.noResults}>
        No orders match your search criteria
      </div>
    )}
  </div>
</div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
} catch (error) {
  console.error("Render error:", error);
  return <div>Error loading content</div>;
}
}