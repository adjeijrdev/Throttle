// import { useState } from "react";
import { useNavigate } from "react-router";

import { NavLink } from "react-router";
import "./SideLink.css";

//import components
// import DashBoardLogo from "../Assets/icons/dashboard.png";

export default function ({ icon, name, url }) {
  const navigate = useNavigate();
  return (
    <div className="Link" onClick={() => nnnavigate(url) } >
      <img src={icon} alt={name}/>
      <NavLink to={url}>{name} </NavLink>
    </div>
  );
}
