import { useState } from "react";
import styles from"./Dashboard.module.css";
import Pagination from "./Pagination";

import StatCard from './StatCard';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { Download,Eye, ChevronDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DateFilter from './DateFilter';

export default function Dashboard(props) {
  const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

   const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

 const allOrders = [
  {
    orderId: 'A0M600',
    dateTime: '21-12-2024, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    amount: 'GHC350.00',
    status: 'Completed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     amount: 'GHC350.00',
    orderdate:'21-12-2024',
    orderimg:'',
  },
  {
    orderId: 'A0M600',
    dateTime: '21-12-2024, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    amount: 'GHC350.00',
    status: 'Rejected',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     amount: 'GHC350.00',
    orderdate:'21-12-2024',
    orderimg:'',
  },
   {
    orderId: 'A0M600',
    dateTime: '21-12-2024, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    amount: 'GHC350.00',
    status: 'In Progress',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     amount: 'GHC350.00',
    orderdate:'21-12-2024',
    orderimg:'',
  },
   {
    orderId: 'A0M600',
    dateTime: '21-12-2024, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    amount: 'GHC350.00',
    status: 'Completed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     amount: 'GHC350.00',
    orderdate:'21-12-2024',
    orderimg:'',
  },
   {
    orderId: 'A0M600',
    dateTime: '21-12-2024, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    amount: 'GHC350.00',
    status: 'Failed',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     amount: 'GHC350.00',
    orderdate:'21-12-2024',
    orderimg:'',
  },
   {
    orderId: 'A0M600',
    dateTime: '21-12-2024, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    amount: 'GHC350.00',
    status: 'Assigned',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     amount: 'GHC350.00',
    orderdate:'21-12-2024',
    orderimg:'',
  },
   {
    orderId: 'A0M600',
    dateTime: '21-12-2024, 01:53',
    destination: 'Tema newton, Hse No 36b, Greater Accra',
    recipient: 'Ama Nelson',
    phone: '+233 54 786 6565',
    amount: 'GHC350.00',
    status: 'Returned',
    vendor: 'Ishtari Ghana',
    tpl: 'Robert',
     amount: 'GHC350.00',
    orderdate:'21-12-2024',
    orderimg:'',
  },
  // Add more data...
];

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

const statusClass = {
  Completed: styles.completed,
  Rejected: styles.rejected,
  'In Progress': styles.inProgress,
  Failed: styles.failed,
  Assigned: styles.assigned,
  Returned: styles.returned,
};

  const [enteredDate,setEnteredDate]= useState('');

  const dateChangeHandler = (event) =>{
    setEnteredDate(event.target.value); 
};

const [filter, setFilter] = useState('All');

  const filteredOrders =
    filter === 'All'
      ? allOrders
      : allOrders.filter((order) => order.status === filter);

      const [showDropdown, setShowDropdown] = useState(false);

const toggleDropdown = () => setShowDropdown((prev) => !prev);

const exportToCSV = () => {
  const rows = filteredOrders.map((o) => ({
    'Order Date, Time': o.dateTime,
    'Order ID': o.orderId,
    Destination: o.destination,
    Recipient: o.recipient,
    "Recipient's Tel": o.phone,
    'Payment Amt': o.amount,
    Status: o.status,
    Vendor: o.vendor,
    '3PLs': o.tpl,
    'Delivery Fee': o.amount,
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


const allColumns = [
  { key: 'map', label: 'Map' },
  { key: 'dateTime', label: 'Order Date, Time' },
  { key: 'orderId', label: 'Order ID' },
  { key: 'destination', label: 'Destination' },
  { key: 'recipient', label: 'Recipient' },
  { key: 'phone', label: 'Recipient Tel' },
  { key: 'amount', label: 'Payment Amt' },
  { key: 'status', label: 'Status' },
  { key: 'vendor', label: 'Vendor' },
  { key: 'tpl', label: '3PLs' },
   { key: 'amount', label: 'Delivery Fee' },
    { key: 'orderdate', label: 'Delivery Date' },
     { key: 'orderimg', label: 'Order Image' },
];

const [visibleCols, setVisibleCols] = useState(
  allColumns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
);

const [showColsDropdown, setShowColsDropdown] = useState(false);

const toggleColDropdown = () => setShowColsDropdown(prev => !prev);

const handleColChange = (key) => {
  setVisibleCols(prev => ({ ...prev, [key]: !prev[key] }));
};

const clearFilters = () => {
  setEnteredDate('');
  setFilter('All');
};

const countByStatus = (status) => {
  if (!status) return allOrders.length;
  return allOrders.filter(o => o.status === status).length;
};

const [showDateFilter, setShowDateFilter] = useState(false);

// Handle filter action
const handleFilter = (selectedDate) => {
  console.log('Selected date:', selectedDate);
  setShowDateFilter(false);
};

// Handle cancel action
const handleCancel = () => {
  setShowDateFilter(false);
};

  return  (
  <div className="dashboard-content">
    <div style={{maxWidth:'100%', display:'flex', justifyContent:'space-between', borderBottom:' 0.25rem solid #ddd'}} >
    <div style={{display:'grid'}}>
      <div className={styles.overview}>Overview</div>
     <div className={styles.overviewtext}>Visual summary of key sales performance metrics and your data</div>
     </div>
    {/* <div className={styles.date__control}>
                    <input type='date' min= "2019-01-01" max="2050-12-31"
                    value={enteredDate} 
                     onChange={dateChangeHandler}/>
    </div> */}

    <div>
    <button  className={styles.date__control} onClick={() => setShowDateFilter(true)}>
      mm/dd/yyyy
    </button>
    
    {showDateFilter && (
      <div className="modal-overlay">
        <DateFilter 
          onFilter={handleFilter} 
          onCancel={handleCancel} 
        />
      </div>
    )}
  </div>
    </div>
         


 <div style={{ display: 'flex', gap: '3rem', marginTop:'2%', marginBottom:'2%' }}>
      <StatCard
        title="All Orders"
        value={countByStatus()}
        icon={HiOutlineClipboardList}
        change="+5.4% this week"
        bgColor="white"
      />
       <StatCard
        title="Order Completed"
        value={countByStatus('Completed')}
        icon={HiOutlineClipboardList}
        change="+5.4% this week"
        bgColor="#C3F9D5"
      />
       <StatCard
        title="Order Failed"
        value={countByStatus('Failed')}
        icon={HiOutlineClipboardList}
        change="+5.4% this week"
        bgColor="#FF9ABA"
      />
       <StatCard
        title="Order Rejected"
        value={countByStatus('Rejected')}
        icon={HiOutlineClipboardList}
        change="+5.4% this week"
        bgColor="#FFC9C9"
      />
       <StatCard
        title="Order in Progress"
        value={countByStatus('In Progress')}
        icon={HiOutlineClipboardList}
        change="+5.4% this week"
        bgColor="#88AEF1"
      />
       <StatCard
        title="Order Assigned"
        value={countByStatus('Assigned')}
        icon={HiOutlineClipboardList}
        change="+5.4% this week"
        bgColor="#FFEC8B"
      />
       <StatCard
        title="Order Returned"
        value={countByStatus('Returned')}
        icon={HiOutlineClipboardList}
        change="+5.4% this week"
        bgColor="#AFAFAF"
      />
    </div>

    <div style={{maxWidth:'100%', display:'flex', justifyContent:'space-between', borderBottom:' 0.25rem solid #ddd', marginBottom:'1.5rem'}} >
    <div style={{display:'grid'}}>
      <div className={styles.overview}>Daily Orders</div>
     <div className={styles.overviewtext}>Visual summary of key sales performance metrics and your data</div>
     </div>
   
     <div style={{ display: 'flex', gap: '2rem', padding:'1rem'}}>
    <button  onClick={clearFilters}  style={{borderRadius:'1rem',border:'none', backgroundColor:'white', padding:'0.8rem', width:'15rem'}}> Clear All Filters</button>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div className={styles.exportContainer}>
    <button onClick={toggleDropdown} className={styles.exportButton}>
      <Download size={16} /> Export <ChevronDown size={16} />
    </button>
    {showDropdown && (
      <div className={styles.dropdownMenu}>
        <div className={styles.dropdownItem} onClick={exportToCSV}>Export CSV</div>
        <div className={styles.dropdownItem} onClick={exportToExcel}>Export Excel</div>
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

  <button style={{borderRadius:'1rem',border:'none', backgroundColor:'#065f46', color:'white', padding:'0.8rem',  width:'20rem'}}>Add Order +</button>
  </div>
    </div>
          
          
{/* Orders Table */}

 <div className={styles.tableContainer}>
      {/* Filter Row */}
      <div className={styles.filters}>
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`${styles.filterButton} ${
              filter === option ? styles.activeFilter : ''
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead className={styles.header}>
           <tr>
   {visibleCols['map'] && <th className={styles.thSmall}>Map</th>}
    {visibleCols.dateTime && <th className={styles.th}>Order Date, Time</th> }
    {visibleCols.orderId && <th className={styles.th}>Order ID</th> }
    {visibleCols.destination &&  <th className={styles.th}>Destination</th>}
    {visibleCols.recipient && <th className={styles.th}>Recipient</th>}
    {visibleCols.phone && <th className={styles.th}>Recipient's Tel</th> }
    {visibleCols.amount && <th className={styles.th}>Payment Amt</th>}
    {visibleCols.status && <th className={styles.th}>Status</th> }
    {visibleCols.vendor &&  <th className={styles.th}>Vendor</th>}
    {visibleCols.tpl &&   <th className={styles.th}>3PLs</th>}
    {visibleCols.amount && <th className={styles.th}>Delivery Fee</th>}
    {visibleCols.orderdate &&   <th className={styles.th}>Delivery Date</th>}
    {visibleCols.orderimg &&   <th className={styles.th}>Order Image</th>}
          </tr>
      </thead>
        <tbody>
       {filteredOrders.map((order, index) => (
       <tr key={index}>
      {visibleCols.map && <td className={styles.td}>📍</td>}
      {visibleCols.dateTime && <td className={styles.td}>{order.dateTime}</td>}
      {visibleCols.orderId && <td className={styles.td}>{order.orderId}</td>}
      {visibleCols.destination && <td className={styles.td}>{order.destination}</td> }
      {visibleCols.recipient && <td className={styles.td}>{order.recipient}</td>}
      {visibleCols.phone && <td className={styles.td}>{order.phone}</td> }
      {visibleCols.amount && <td className={styles.td}>{order.amount}</td>}
      {visibleCols.status &&  <td className={styles.td}>
                <span className={`${styles.status} ${statusClass[order.status]}`}>
                  {order.status}
                </span>
              </td>}
      {visibleCols.vendor && <td className={styles.td}>{order.vendor}</td> }
      {visibleCols.tpl && <td className={styles.td}>{order.tpl}</td> }
      {visibleCols.amount && <td className={styles.td}>{order.amount}</td>}
      {visibleCols.orderdate && <td className={styles.td}>{order.orderdate}</td> }
      {visibleCols.orderimg && <td className={styles.td}>{order.orderimg}</td> }
    </tr>
  ))}
      </tbody>
      </table>
    </div>


<Pagination className='pagination'
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}/>
</div>
);
}
