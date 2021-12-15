import React, { useState } from "react";
import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.scss";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import CloseMenu from "./../../Assets/Icon/close_white.svg";

const Sidebar = ({ menuToggleState, toggleMenu }) => {
  const [sidebar, setSidebar] = useState("false");
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
              <ProSidebar key={key}>
                <Menu iconShape="square">
                  <SubMenu icon={val.icon} title={val.title}>
                    <MenuItem>
                      {val.subMenus.map((submenu, i) => {
                        return (
                          <MenuItem key={i} onClick={toggleMenu}>
                            <NavLink
                              className="sidebar-menu-links"
                              to={submenu.link}
                            >
                              <MenuItem>{submenu.title}</MenuItem>
                            </NavLink>
                          </MenuItem>
                        );
                      })}
                    </MenuItem>
                  </SubMenu>
                </Menu>
              </ProSidebar>
            );
          } else {
            return (
              <ProSidebar key={key}>
                <Menu iconShape="square">
                  <NavLink to={val.link}>
                    <MenuItem
                      onClick={toggleMenu}
                      style={{ color: "white" }}
                      icon={val.icon}
                    >
                      {val.title}
                    </MenuItem>
                  </NavLink>
                </Menu>
              </ProSidebar>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
