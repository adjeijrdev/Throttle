import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

import "primereact/resources/themes/lara-light-teal/theme.css"; 
import "primereact/resources/primereact.min.css";

import "./CustomDatePicker.css"

import { PrimeReactProvider } from 'primereact/api';

export default function CustomDatePicker({date,setDate}) {
  
  return (

          <Calendar id="buttondisplay" className="cal-con-st" placeholder="DD/MM/YYYY" value={date} onChange={(e) => setDate(e.value)} showIcon  />
    
  );
}