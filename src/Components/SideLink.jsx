import { useState } from "react";
import { useNavigate, NavLink } from "react-router";

import "./SideLink.css";

//import components
// import DashBoardLogo from "../Assets/icons/dashboard.png";

export default function ({ icon, name, url, isActive, setActive, childrens }) {
  const [showChildren, setShowChildren] = useState(false);
  const navigate = useNavigate();

  function clickedTab() {
    navigate(url);
    setActive(url);
  }

  if (childrens) {
    return (
      <>
        <div className={isActive ? "Link-active" : "Link"} onClick={clickedTab}>
          <div className={isActive ? "active-logo" : ""}>
            <img src={icon} alt={name} />
          </div>
          <NavLink to={url}> {name} </NavLink>
          <div className="spacer" />
          <div
            className="chevron-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowChildren(!showChildren);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={`down-icon ${showChildren ? "rotate" : ""}`}
              viewBox="0 0 16 16"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   setShowChildren(!showChildren);
              // }}
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 
          .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
        </div>
        {showChildren && (
          <div className="children-container">
            {childrens.map((child) => (
              <NavLink
                key={child.id}
                to={child.url}
                className="child-link"
                onClick={() => setActive(`${url}/${child.url}`)}
              >
                {child.name}
              </NavLink>
            ))}
          </div>
        )}
      </>
    );
  } else {
    return (
      <div className={isActive ? "Link-active" : "Link"} onClick={clickedTab}>
        <div className={isActive ? "active-logo" : ""}>
          <img src={icon} alt={name} />
        </div>
        <NavLink to={url}> {name} </NavLink>
      </div>
    );
  }
}
