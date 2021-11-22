import React from "react";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { UserInfo } from "./UserInfo";

const UserDropdown = () => {
  return (
    <>
      {UserInfo.map((user, key) => {
        return (
          <Dropdown key={key}>
            <Dropdown.Toggle className="btn-dropdown" />
            <Dropdown.Menu>
              {/* <Dropdown.Item>{user.name}</Dropdown.Item>
              <Dropdown.Item>{user.email}</Dropdown.Item> */}
              <Dropdown.Item>
                <NavLink to={user.profile}>{user.userInfo}</NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink to={user.logout}>{user.signout}</NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      })}
    </>
  );
};

export default UserDropdown;
