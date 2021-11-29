import React from "react";
import { ReactComponent as Hamburger } from "../../Assets/Icon/hamburger.svg";
import UserDropdown from "../../Components/Common/UserInfo/UserDropdown";
import './Header.scss'

const Header = ({menuToggleState, toggleMenu}) => {
    var user = JSON.parse(localStorage.getItem('user'))

  return (  
        <div className={`header-wrapper d-flex ${menuToggleState?'full-width':''}`}>
            <span className="hamburger-menu">
                <Hamburger onClick={toggleMenu}/>
            </span>
            <div className="user-container d-flex">
                <div className="me-2">
                    <h6 className="pb-0 mb-0 fw-bold">{user.fullName === undefined? "Admin Full Name": user.fullName}</h6>
                    <p>{user.email === undefined? "Admin Email": user.email}</p>
                </div>
                <UserDropdown />
            </div>
        </div>
  );
};

export default Header;
