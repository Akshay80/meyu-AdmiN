import React from "react";
import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = ({ menuToggleState }) => {
  return (
    <div className={`sidebar ${menuToggleState ? "hide-menu" : ""}`}>
      <div className="sidebar-menu">
        <span className="logo"> MEYU</span>
        <span className="logo-text">Meyu Admin</span>
      </div>
      <ul className="sidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li key={key} className="row">
              <NavLink className="sidebar-menu-links" to={val.link}>
                <span id="icon">{val.icon}</span>
                <span id="title">{val.title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
