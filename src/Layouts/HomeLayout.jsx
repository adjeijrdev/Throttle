import { Outlet, useNavigate } from "react-router";
import "./HomeLayout.css";

import Logo from "../Assets/logos/LOGO-img.png";
import SideLink from "../Components/SideLink";
import { SideNavLinks } from "../items/Links";

export default function HomeLayout() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="left-side-bar">
        <div className="logo" onClick={() => navigate("/login")}>
          <img src={Logo} alt="" />
        </div>
        <div className="links">
          {SideNavLinks.map((Nav) => (
            <SideLink
              key={Nav.id}
              icon={Nav.icon}
              name={Nav.name}
              url={Nav.url}
            />
          ))}
        </div>
      </div>
      <div className="main-working-space">
        <div className="header">
          <div className="user-card">
            <div className="text">
              <h4>John Doe </h4>
              <p>Manager</p>
            </div>
            <div className="image"></div>
          </div>
        </div>
        <div className="working-box">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
