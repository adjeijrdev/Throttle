import { useState } from "react";
import Pagination from "./Pagination";
import styles from "./DailyDelivery.module.css";


export default function DailyDelivery(props) {
  const [currentPage, setCurrentPage] = useState(2);
    const totalPages = 5;

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
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
  return  (
  <div className="dashboard-content">
     

  <div  style={{ display: 'flex',gap:'3rem'}}>
  <div className="overview">Daily Orders</div> 
  {/* <div style={{ display: 'flex', float:'right', marginBottom:'2%'}}>
  <button className="export_button">Export</button>
  <button className="filter_button">Filter</button>
                    <input className="date" type='date' min= "2019-01-01" max="2050-12-31"
                    value={enteredDate} 
                     onChange={dateChangeHandler}/>
              
  </div> */}
  </div>
          <div className="overviewtext">Visual summary of key sales performance metrics and your data</div>
          
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
            <th className={styles.thSmall}>Map</th>
            <th className={styles.th}>Order Date, Time</th>
            <th className={styles.th}>Order ID</th>
            <th className={styles.th}>Destination</th>
            <th className={styles.th}>Recipient</th>
            <th className={styles.th}>Recipient's Tel</th>
            <th className={styles.th}>Payment Amt</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Vendor</th>
            <th className={styles.th}>3PLs</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index}>
              <td className={styles.td}>📍</td>
              <td className={styles.td}>{order.dateTime}</td>
              <td className={styles.td}>{order.orderId}</td>
              <td className={styles.td}>{order.destination}</td>
              <td className={styles.td}>{order.recipient}</td>
              <td className={styles.td}>{order.phone}</td>
              <td className={styles.td}>{order.amount}</td>
              <td className={styles.td}>
                <span className={`${styles.status} ${statusClass[order.status]}`}>
                  {order.status}
                </span>
              </td>
              <td className={styles.td}>{order.vendor}</td>
              <td className={styles.td}>{order.tpl}</td>
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
