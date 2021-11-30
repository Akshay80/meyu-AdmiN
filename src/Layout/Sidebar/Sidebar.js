import React, { useState } from "react";
import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.scss";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import CloseMenu from './../../Assets/Icon/close_white.svg'

const  Sidebar = ({ menuToggleState, toggleMenu }) => {

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
      <img src={CloseMenu} onClick={toggleMenu} className="close-menu-mobile-btn" alt="close_btn"/>
      <ul onClick={showSidebar} className="sidebarList">
        {SidebarData.map((val, key) => {
          if (val.subMenus !== undefined) {
            return (
              <ProSidebar>
                <Menu key={key + 1} iconShape="square">
                    <SubMenu key={key} icon={val.icon} title={val.title}>
                      <MenuItem >
                        {val.subMenus.map((submenu, i) => {
                          return (
                            <MenuItem  onClick={toggleMenu} i={i + 1}>
                            <NavLink className="sidebar-menu-links" to={submenu.link}>
                              <MenuItem key={key}>{submenu.title}</MenuItem>
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
              <ProSidebar>
                <Menu  key={key + 1} iconShape="square" >
                  <NavLink to={val.link}>
                    <MenuItem onClick={toggleMenu} style={{color:'white'}} icon={val.icon}>{val.title}</MenuItem>
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
