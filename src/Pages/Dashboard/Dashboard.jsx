import { useState } from "react";
import "./Dashboard.css";
import Pagination from "./Pagination";

export default function Dashboard(props) {
  const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

  const orderStats = [
    { title: "All Orders", count: 150 },
    { title: "Assigned", count: 120 },
    { title: "Completed", count: 90 },
    { title: "In Progress", count: 25 },
    { title: "Returned", count: 5 },
    { title: "Failed", count: 3 },
    { title: "Rejected", count: 2 },
    { title: "Total Orders", count: 332 },
    { title: "Total Orders", count: 252 }
  ];

  const orders = [
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
    <div className="overview_container">
    <div className="overview">Overview</div>
    <div className="date__control">
                    <input type='date' min= "2019-01-01" max="2050-12-31"
                    value={enteredDate} 
                     onChange={dateChangeHandler}/>
    </div>
    </div>
          <div className="overviewtext">Visual summary of key sales performance metrics and your data</div>
      
{/* Stats Cards */}
<div className="stats-grid">
  {orderStats.map((stat) => (
    <div key={stat.title} className="stats-card">
      <h4>{stat.title}</h4>
      <p>{stat.count}</p>
    </div>
  ))}
</div>

  <div className="overview_container">
  <div className="overview">Daily Orders</div> 
  <div className="button_container">
  <button className="export_button">Export</button>
  <button className="filter_button">Filter</button>
  <button className="addorder_button">Add Order +</button>
  </div>
  </div>
          <div className="overviewtext">Visual summary of key sales performance metrics and your data</div>
          
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
