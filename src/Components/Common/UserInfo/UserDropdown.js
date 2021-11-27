import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserInfo } from "./UserInfo";
import axiosConfig from "../APIConfig/axiosConfig";

const UserDropdown = () => {
  const logout = () => {
    axiosConfig
      .get("auth/logout", {
        headers: { "Content-Type": "application/json"}
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {UserInfo.map((user, key) => {
        return (
          <Dropdown key={key}>
            <Dropdown.Toggle className="btn-dropdown" />
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={user.profile}>{user.userInfo}</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                {/* <NavLink to={user.logout}>{user.signout}</NavLink> */}
                <button className="border-0 bg-grey p-0" onClick={logout}>
                  {user.signout}
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      })}
    </>
  );
};

export default UserDropdown;
s