import React, { useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

import "./CustomDateRangePicker.css"



export default function CustomDateRangePicker() {
   const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);


  const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  
  return (

        <DateRangePicker
        ranges={state}
        onChange={item => setState([item.selection])}
        color="#f3f"
      />
    
  );
}
