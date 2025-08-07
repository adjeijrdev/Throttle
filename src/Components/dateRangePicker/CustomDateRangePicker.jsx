import React, { useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

import "./CustomDateRangePicker.css"



export default function CustomDateRangePicker({stateDateRingeState,setDateRingeState}) {


  
  return (

        <DateRangePicker
        ranges={stateDateRingeState}
        onChange={item => setDateRingeState([item.selection])}
        color="#f3f"
      />
    
  );
}
