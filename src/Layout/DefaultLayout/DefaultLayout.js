import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PrivateRoute from "../../Routes/PrivateRoute";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const DefaultLayout = () => {

    const [menuToggle, setMenuToggle] = useState(false);

    const menuToggleHandle =()=>{
        setMenuToggle(!menuToggle);
    }
  return (
    <>
      <div className="main-wrapper">
        <Sidebar menuToggleState={menuToggle} />
        <div className={`content-wrapper ${menuToggle ? "full-width" : ''}`}>
          <Header menuToggleState={menuToggle} toggleMenu={menuToggleHandle} />
          <div className="page-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
