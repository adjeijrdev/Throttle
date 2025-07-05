import { Outlet, useNavigate, Link } from "react-router";
import { useState } from "react";
import "./HomeLayout.css";

import Logo from "../Assets/logos/LOGO-img.png";
import Logout from "../Assets/icons/logout.png";
import SideLink from "../Components/SideLink";
import { SideNavLinks } from "../items/Links";
import dp from "../Assets/Models/dp.webp";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

//LINKS
import DashBoardLogo from "../Assets/icons/dashboard.png";

export default function HomeLayout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("/");
  const [closeSideBar, setCloseSideBar] = useState(false);
  // console.log(activeTab)

  return (
    <div className= {`${!closeSideBar ? "main-container" : " main-container-close-mode"}`} >
      <div className= {` ${!closeSideBar ? " left-side-bar " : "left-side-bar-close"} close-st-bar`}>
        <div className="logo">
         <img src={Logo} alt="Logo" /> 
          {
          
            !closeSideBar && <LuPanelLeftClose className="close-bar-st" onClick={()=>setCloseSideBar(true)}/>
          }
        </div>
        <div className= "link_container">
          <div className="links">
          {SideNavLinks.map((Nav) => (
            <SideLink
              key={Nav.id}
              icon={Nav.icon}
              name={Nav.name}
              url={Nav.url}
              childrens={Nav.childrens}
              setActive={setActiveTab}
              isActive={activeTab === Nav.url}
            />
          ))}
        </div>  
        </div>
        < div className="logout-botton" onClick={() => navigate("/login")}>
            <img src={Logout} alt="logout" />
            <Link to="/login"> Logout</Link>
        </div>
      </div>

      <div className="right-section">
        <div className="header">
          <LuPanelRightClose onClick={()=>setCloseSideBar(false)} className={`${closeSideBar? "close-bar-st" :"close-bar-st-hide" }`}   />
        
          <div className="user-card">
            
            <div className="text">
              <h4>John Doe </h4>
              <p>Manager</p>
            </div>
            <div className="image">
              <img src={dp} alt="dp" />
            </div>
          </div>
        </div>

        <div className="working-box">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
