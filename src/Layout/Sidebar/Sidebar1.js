import React, { useState } from "react";
import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.scss";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import CloseMenu from "./../../Assets/Icon/close_white.svg";
import { Sidenav, Nav, Dropdown, Toggle } from "rsuite";
import GearIcon from "@rsuite/icons/Gear";
import AvatarIcon from "@rsuite/icons/Admin";
import "rsuite/dist/rsuite.min.css";
// import Avatar from "../../Assets/Images/21-avatar-outline.gif";

const Sidebar = ({ menuToggleState, toggleMenu }) => {
  const [sidebar, setSidebar] = useState("false");
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className={`sidebar ${menuToggleState ? "hide-menu" : ""}`}>
      <div className="sidebar-menu">
        <span className="logo"> MEYU</span>
        <span className="logo-text">Meyu Admin</span>
      </div>
      <img
        src={CloseMenu}
        onClick={toggleMenu}
        className="close-menu-mobile-btn"
        alt="close_btn"
      />
      <ul onClick={showSidebar} className="sidebarList">
        {SidebarData.map((val, key) => {
          if (val.subMenus !== undefined) {
            return (
              <div style={{ width: "100%" }}>
                <Sidenav
                  expanded={expanded}
                  onSelect={setActiveKey}
                  className="bg-transparent"
                >
                  <Sidenav.Body key={key} className="bg-transparent">
                    <Nav>
                      <Nav.Item
                        className="bg-transparent"
                        icon={val.icon}
                        title={val.title}
                      >
                      <Dropdown
                        placement="rightStart"
                        icon={val.icon}
                        title={val.title}
                      >
                        {val.subMenus.map((submenu, i) => {
                          return (
                            <Nav>
                              <Dropdown.Item>
                                {submenu.title}
                              </Dropdown.Item>
                            </Nav>
                          );
                        })}
                      </Dropdown>
                      </Nav.Item>
                    </Nav>
                  </Sidenav.Body>
                </Sidenav>
              </div>
            );
          } else {
            <Sidenav
              key={key}
              expanded={expanded}
              onSelect={setActiveKey}
              className="bg-transparent"
            >
              <Sidenav.Body key={key} className="bg-transparent">
                <Nav>
                  <Nav.Item
                    className="bg-transparent"
                    icon={val.icon}
                  >
                    {val.title}
                  </Nav.Item>
                </Nav>
              </Sidenav.Body>
            </Sidenav>;
          }
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
