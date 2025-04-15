import { useState } from 'react';
import { useNavigate,NavLink  } from "react-router";

import "./SideLink.css";

//import components
// import DashBoardLogo from "../Assets/icons/dashboard.png";



export default function ({ icon, name, url, isActive, setActive }) {
  const navigate = useNavigate();
  
  function clickedTab(){
      navigate(url)
      setActive(url)

  }
  return (
    <div className={isActive?"Link-active":"Link"} onClick={clickedTab}>
      <div className={isActive?"active-logo" : ""} >
        <img src={icon} alt={name}/>
      </div>
      <NavLink to={url}> {name} </NavLink>
    </div>
  );
}
