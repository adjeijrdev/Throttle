import { useState } from "react";
import "./DailyDelivery.css";
import Pagination from "./Pagination";


export default function DailyDelivery(props) {
  const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };


  const orders = [
    { id: "ORD-001", date: "2023-10-01", destination: "Accra", vendor: "Vendor A", amount: "GHS 120", status: "Completed", recipient: "John Doe", deliveryDate: "2023-10-03" },
    { id: "ORD-002", date: "2024-08-21", destination: "Tema", vendor: "Vendor B", amount: "GHS 250", status: "Returned", recipient: "Zoe Doe", deliveryDate: "2024-08-23" },
    { id: "ORD-003", date: "2025-05-11", destination: "Teshie", vendor: "Vendor K", amount: "GHS 300", status: "In Progress", recipient: "Maya Doe", deliveryDate: "2025-06-11" },
    { id: "ORD-001", date: "2023-10-01", destination: "Accra", vendor: "Vendor A", amount: "GHS 120", status: "Failed", recipient: "John Doe", deliveryDate: "2023-10-03" },
    { id: "ORD-002", date: "2024-08-21", destination: "Tema", vendor: "Vendor B", amount: "GHS 250", status: "Rejected", recipient: "Zoe Doe", deliveryDate: "2024-08-23" },
    { id: "ORD-003", date: "2025-05-11", destination: "Teshie", vendor: "Vendor K", amount: "GHS 300", status: "Assigned", recipient: "Maya Doe", deliveryDate: "2025-06-11" },
    { id: "ORD-001", date: "2023-10-01", destination: "Accra", vendor: "Vendor A", amount: "GHS 120", status: "Completed", recipient: "John Doe", deliveryDate: "2023-10-03" },
    { id: "ORD-002", date: "2024-08-21", destination: "Tema", vendor: "Vendor B", amount: "GHS 250", status: "Returned", recipient: "Zoe Doe", deliveryDate: "2024-08-23" },
    { id: "ORD-003", date: "2025-05-11", destination: "Teshie", vendor: "Vendor K", amount: "GHS 300", status: "In Progress", recipient: "Maya Doe", deliveryDate: "2025-06-11" },
    { id: "ORD-001", date: "2023-10-01", destination: "Accra", vendor: "Vendor A", amount: "GHS 120", status: "Failed", recipient: "John Doe", deliveryDate: "2023-10-03" },
    { id: "ORD-002", date: "2024-08-21", destination: "Tema", vendor: "Vendor B", amount: "GHS 250", status: "Rejected", recipient: "Zoe Doe", deliveryDate: "2024-08-23" },
    { id: "ORD-003", date: "2025-05-11", destination: "Teshie", vendor: "Vendor K", amount: "GHS 300", status: "Assigned", recipient: "Maya Doe", deliveryDate: "2025-06-11" },
    // More rows...
  ];

  const [enteredDate,setEnteredDate]= useState('');

  const dateChangeHandler = (event) =>{
    setEnteredDate(event.target.value); 
};
  return  (
  <div className="dashboard-content">
     

<div className="subheader">
  <div className="overview_container">
  <div className="overview">Daily Orders</div> 
  <div className="button_container">
  <button className="export_button">Export</button>
  <button className="filter_button">Filter</button>
  <div className="date__control">
                    <input type='date' min= "2019-01-01" max="2050-12-31"
                    value={enteredDate} 
                     onChange={dateChangeHandler}/>
                </div>
  </div>
  </div>
          <div className="overviewtext">Visual summary of key sales performance metrics and your data</div>
          
      </div>
{/* Orders Table */}
<div className="table-container">
<table className="orders-table">
  <thead>
    
    <tr className="thead-row-one">
      <th>All</th>
      <th>Order Placed</th>
      <th>In Progress</th>
      <th>Assigned</th>
      <th>completed</th>
      <th>Returned</th>
      <th>Failed</th>
      <th>Rejected</th>
    </tr>
    
    <tr className="thead-row-two">
      <th>Order Date</th>
      <th>Order ID</th>
      <th>Destination</th>
      <th>Vendor</th>
      <th>Amount</th>
      <th>Status</th>
      <th>Recipient</th>
      <th>Delivery Date</th>
      {/* More headers... */}
    </tr>
  </thead>
  <tbody>
    {orders.map((order) => (
      <tr key={order.id}>
        <td>{order.date}</td>
        <td>{order.id}</td>
        <td>{order.destination}</td>
        <td>{order.vendor}</td>
        <td>{order.amount}</td>
        <td>{order.status}</td>
        <td>{order.recipient}</td>
        <td>{order.deliveryDate}</td>
        {/* More cells... */}
      </tr>
    ))}
  </tbody>
</table>
<Pagination className='pagination'
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}/>
</div>
</div>
);
}
