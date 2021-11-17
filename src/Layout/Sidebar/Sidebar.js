import React from "react";
import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.scss";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const Sidebar = ({ menuToggleState }) => {
  return (
    <div className={`sidebar ${menuToggleState ? "hide-menu" : ""}`}>
      <div className="sidebar-menu">
        <span className="logo"> MEYU</span>
        <span className="logo-text">Meyu Admin</span>
      </div>
      <ul className="sidebarList">
        {SidebarData.map((val, key) => {
          if (val.subMenus != undefined) {
            return (
              <ProSidebar>
                <Menu key={key + 1} iconShape="square">
                    <SubMenu icon={val.icon} title={val.title}>
                      <MenuItem>
                        {val.subMenus.map((submenu, i) => {
                          return (
                            <MenuItem i={i + 1}>
                            <NavLink className="sidebar-menu-links" to={submenu.link}>
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
              <ProSidebar>
                <Menu key={key + 1} iconShape="square">
                  <NavLink to={val.link}>
                    <MenuItem icon={val.icon}>{val.title}</MenuItem>
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
