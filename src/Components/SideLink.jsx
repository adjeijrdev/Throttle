// import { useState } from "react";
// import { useNavigate } from "react-router";

import { NavLink } from "react-router";
import "./SideLink.css";

//import components
// import DashBoardLogo from "../Assets/icons/dashboard.png";

export default function ({ icon, name, url }) {
  return (
    <div className="Link">
      <img src={icon} alt={name} />
      <NavLink to={url}> {name} </NavLink>
    </div>
  );
}
