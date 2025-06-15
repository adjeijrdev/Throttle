import React, { useState } from 'react';
import './DateFilter.css';

const DateFilter = ({ onFilter, onCancel }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectionPhase, setSelectionPhase] = useState('start'); // 'start' or 'end'
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

  // Check if a date is within the selected range
  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    const time = date.getTime();
    return time >= startDate.getTime() && time <= endDate.getTime();
  };

  // Generate days for current month with range highlighting
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
      const isStart = startDate && date.toDateString() === startDate.toDateString();
      const isEnd = endDate && date.toDateString() === endDate.toDateString();
      const isRange = isInRange(date);
      
      days.push(
        <div 
          key={`day-${i}`} 
          className={`day 
            ${isStart ? 'selected-start' : ''} 
            ${isEnd ? 'selected-end' : ''}
            ${isRange ? 'in-range' : ''}
          `}
          onClick={() => {
            if (selectionPhase === 'start') {
              setStartDate(date);
              setEndDate(null);
              setSelectionPhase('end');
            } else {
              // Ensure end date is after start date
              if (date >= startDate) {
                setEndDate(date);
              } else {
                setStartDate(date);
                setEndDate(null);
              }
              setSelectionPhase('start');
            }
          }}
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
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="date-filter-container">
      <div className="date-filter-header">
        <h3>Filter by date range</h3>
        <div className="range-selection-info">
          <div className={`selection-phase ${selectionPhase === 'start' ? 'active' : ''}`}>
            Start: {startDate ? startDate.toLocaleDateString() : 'Not selected'}
          </div>
          <div className={`selection-phase ${selectionPhase === 'end' ? 'active' : ''}`}>
            End: {endDate ? endDate.toLocaleDateString() : 'Not selected'}
          </div>
        </div>
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
                  key={`month-${index}`}
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
        {dayNames.map((day, index) => (
          <div key={`day-name-${index}`} className="day-name">{day}</div>
        ))}
      </div>
      
      <div className="days-grid">
        {generateDays()}
      </div>
      
      <div className="date-filter-actions">
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
        <button 
          className="filter-button" 
          onClick={() => onFilter({ start: startDate, end: endDate })}
          disabled={!startDate || !endDate}
        >
          Apply Range
        </button>
      </div>
    </div>
  );
};

export default DateFilter;