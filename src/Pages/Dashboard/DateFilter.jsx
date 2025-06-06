// import './Date.css'; 
// function
//  Date (props) {
//     const month = props.date.toLocaleString('en-US',{month:'long'}); 
//     const day = props.date.toLocaleString('en-US',{day:'2-digit'}); 
//     const year = props.date.getFullYear(); 
    
//     return(
//         <div className="filter-date">
//             <div className="filter-date__month">{month}</div>
//             <div className="filter-date__year">{year}</div>
//             <div className="filter-date__day">{day}</div>
//             </div>
//     );
// }
// export default Date;


import React, { useState } from 'react';
import './DateFilter.css'; // Create this CSS file for styling

const DateFilter = ({ onFilter, onCancel }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Get days in month
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month
  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate days for current month
  const generateDays = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysCount = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysCount; i++) {
      const date = new Date(year, month, i);
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push(
        <div 
          key={`day-${i}`} 
          className={`day ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          {i}
        </div>
      );
    }
    
    return days;
  };

  // Change month
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // Change year
  const changeYear = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + increment);
    setCurrentDate(newDate);
  };

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names abbreviations
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="date-filter-container">
      <div className="date-filter-header">
        <h3>Filter by date</h3>
      </div>
      
      <div className="date-display">
        <div 
          className="month-year-display"
          onClick={() => setShowMonthYearPicker(!showMonthYearPicker)}
        >
          {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
        </div>
        
        {showMonthYearPicker && (
          <div className="month-year-picker">
            <div className="month-picker">
              {monthNames.map((month, index) => (
                <div 
                  key={month} 
                  className="month-option"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(index);
                    setCurrentDate(newDate);
                    setShowMonthYearPicker(false);
                  }}
                >
                  {month}
                </div>
              ))}
            </div>
            <div 
              className="year-display"
              onClick={() => {
                setShowYearPicker(true);
                setShowMonthYearPicker(false);
              }}
            >
              {currentDate.getFullYear()}
            </div>
          </div>
        )}
        
        {showYearPicker && (
          <div className="year-picker">
            <div className="year-navigation">
              <button onClick={() => changeYear(-10)}>«</button>
              <span>{currentDate.getFullYear()}</span>
              <button onClick={() => changeYear(10)}>»</button>
            </div>
            <div className="year-options">
              {Array.from({ length: 12 }, (_, i) => currentDate.getFullYear() - 6 + i).map(year => (
                <div 
                  key={year}
                  className="year-option"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setFullYear(year);
                    setCurrentDate(newDate);
                    setShowYearPicker(false);
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="day-names">
        {dayNames.map(day => (
          <div key={day} className="day-name">{day}</div>
        ))}
      </div>
      
      <div className="days-grid">
        {generateDays()}
      </div>
      
      <div className="date-filter-actions">
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
        <button 
          className="filter-button" 
          onClick={() => onFilter(selectedDate)}
          disabled={!selectedDate}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default DateFilter;