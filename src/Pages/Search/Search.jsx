import { useState } from "react";
import "./Search.css";
import NewDelivery from "./NewDelivery";
import reseticon from '../../Assets/icons/reseticon.png';
import searchicon from '../../Assets/icons/searchicon.png';

export default function Search() {
   const [currentPage, setCurrentPage] = useState(3);
    const totalPages = 5;

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  const [enteredDate, setEnteredDate] = useState('');
  const [enteredStatus, setEnteredStatus] = useState('');

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const statusChangeHandler = (event) => {
    setEnteredStatus(event.target.value);
  };

  return (
    <div className="dashboard-content">
      <div className="overview">Search Order</div>
      <div className="overviewtext">
        Visual summary of key sales performance metrics and your data
      </div>

      <div className="searchcontent">
          <NewDelivery />

        <div className="control-right">
        <div className="control_container">
          <div className="date__controls">
            <div className="pickdate">
              <div className="date__control">
                <label>Pickup Date</label>
                <input type="date" value={enteredDate} onChange={dateChangeHandler} />
              </div>
              <span className="to">To</span>
              <div className="date__control">
                <input type="date" value={enteredDate} onChange={dateChangeHandler} />
              </div>
            </div>

            <div className="pickdate">
              <div className="date__control">
                <label>Delivery Date</label>
                <input type="date" value={enteredDate} onChange={dateChangeHandler} />
              </div>
              <span className="to">To</span>
              <div className="date__control">
                <input type="date" value={enteredDate} onChange={dateChangeHandler} />
              </div>
            </div>
          </div>
        </div>
       
        <div className="status__controls">
            <div className="status__control">
              <label>Order Status</label>
              <input type="text" 
              placeholder='Assigned' value={enteredStatus}
               onChange={statusChangeHandler} />
            </div>
          </div>
        </div>
      </div>
        <div className="btncontainer">
            <button className="resetbtn"><img src={reseticon} alt="reset Icon" style={{ width: '16px', height: '16px' }} />Reset</button>
            <button className="searchbtn"><img src={searchicon} alt="search Icon" style={{ width: '16px', height: '16px' }} />Search</button>
          </div>
    </div>
  );
}




