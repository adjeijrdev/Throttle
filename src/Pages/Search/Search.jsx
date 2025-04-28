import { useState } from "react";
import "./Search.css";
import Pagination from "./Pagination";
import NewDelivery from "./NewDelivery";



export default function Search(props) {
  const [currentPage, setCurrentPage] = useState(3);
    const totalPages = 5;

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

  const [enteredDate,setEnteredDate]= useState('');
  const [enteredstatus,setEnteredstatus]= useState('');

  const dateChangeHandler = (event) =>{
    setEnteredDate(event.target.value); 
};
const statusChangeHandler = (event) => {
  setEnteredstatus(event.target.value);
};

  return  (
  <div className="dashboard-content">
      <div className="overview">Search Order</div> 
          <div className="overviewtext">Visual summary of key sales performance metrics and your data</div>  
        <div className="searchcontent">
          <div className="orderdetails"><NewDelivery/></div>
<div className="control_container">
<div className="date__controls">
                <div className="date__control">
                    <label> Pickup Date </label>
                    <input type="date" 
                    value={enteredDate}
                     onChange={dateChangeHandler}/>
                </div>
                <span className="to">To</span> 
                <div className="date__control">
                  <label className="see">see</label>
                    <input type="date" 
                    value={enteredDate}
                     onChange={dateChangeHandler}/>
                </div>
                <div className="date__control">
                    <label> Delivery Date </label>
                    <input type="date" 
                    value={enteredDate}
                     onChange={dateChangeHandler}/>
                </div>
                <span className="to">To</span> 
                <div className="date__control">
                <label className="see">see</label>
                    <input type="date" 
                    value={enteredDate}
                     onChange={dateChangeHandler}/>
                </div>   
            </div>
            <div className="status__controls">
                <div className="status__control">
                    <label> Order Status </label>
                    <input type="text" 
                    value={enteredstatus}
                     onChange={statusChangeHandler}/>
                </div>
            </div>
            <div className="btncontainer"> <button className="resetbtn">Reset</button>
            <button className="searchbtn">Search</button></div>
            </div>
        </div>
       
    

<Pagination className='pagination'
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}/>
</div>
);
}

