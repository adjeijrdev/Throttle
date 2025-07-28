import { Outlet, useNavigate, Link } from "react-router";
import { useState } from "react";
import "./HomeLayout.css";

import Logo from "../Assets/logos/LOGO-img.png";
import Logout from "../Assets/icons/logout.png";
import SideLink from "../Components/SideLink";
import { SideNavLinks } from "../items/Links";
import dp from "../Assets/Models/dp.webp";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
//LINKS
import DashBoardLogo from "../Assets/icons/dashboard.png";
import { logoutAPI } from "../api/authentication";
import { clearCache } from "../graphql/graphqlConfiguration";

export default function HomeLayout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("/");
  const [closeSideBar, setCloseSideBar] = useState(false);
  const [isLoginOut, setIsLoginOut] = useState(false);
  // console.log(activeTab)

   const onLogout = async () => {
    try {
     setIsLoginOut(true)
      const result = await logoutAPI();

      toast.success(result?.data?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });

        await clearCache()
      navigate(`/login`);
    } catch (error) {
      toast.error(error?.message, {
        style: {
          border: "1px solid oklch(88.5% 0.062 18.334)",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "oklch(39.6% 0.141 25.723)",
          fontSize: "16px",
          width: "500px",
        },
      });
    }
        setIsLoginOut(false)
  };

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
        < div className="logout-botton" onClick={()=>onLogout()}>
            <img src={Logout} alt="logout" />
            {isLoginOut ? <BeatLoader color="white" /> : "Logout"}
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
