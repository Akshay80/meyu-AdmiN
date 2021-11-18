import React from "react";
import { ReactComponent as Hamburger } from "../../Assets/Icon/hamburger.svg";
import { ReactComponent as UserIcon} from "../../Assets/Icon/user.svg";
import UserDropdown from "../../Components/Common/UserInfo/UserDropdown";
import './Header.scss'

const Header = ({menuToggleState, toggleMenu}) => {
  return (  
        <div className={`header-wrapper d-flex ${menuToggleState?'full-width':''}`}>
            <span className="hamburger-menu">
                <Hamburger onClick={toggleMenu}/>
            </span>
            <div className="user-container d-flex">
                <UserIcon style={{height: "36px", width: "36px"}}/>
                <UserDropdown />
            </div>
        </div>
  );
};

export default Header;
