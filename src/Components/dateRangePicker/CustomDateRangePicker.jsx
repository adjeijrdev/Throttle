import React, { useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

import "./CustomDateRangePicker.css"



export default function CustomDateRangePicker({stateDateRingeState,setDateRingeState}) {
//  const [range, setRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);

const handleSelect = (ranges) => {
    let { startDate, endDate } = ranges.selection;

    if (endDate) {
      endDate = new Date(endDate);
      endDate.setHours(23, 59, 59, 999);
    }

    setDateRingeState([
      {
        startDate,
        endDate,
        key: "selection",
      },
    ]);
  };
  
  return (

        <DateRangePicker
        ranges={stateDateRingeState}
        onChange={handleSelect}
        color="#f3f"
      />
    
  );
}
