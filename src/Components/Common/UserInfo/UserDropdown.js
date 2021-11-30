import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserInfo } from "./UserInfo";
import axiosConfig from "../APIConfig/axiosConfig";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {useNavigate} from 'react-router-dom'
import './userDropDown.css'
import Path from "../../../Constant/RouterConstant";

let toastId = null;
const UserDropdown = () => {
  const navigate = useNavigate()
  const logout = () => {
    axiosConfig.get("auth/logout", {
        headers: { 
          'content-type': "application/json"
        }
      })
      .then(function (response) {
          if (!toast.isActive(toastId)) {
            toast.success(response.data.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
              toastId: "my_toast",
            });
          }
        localStorage.clear();
        setTimeout(() => {
          navigate("/login")
        }, 3000);
        console.log(response.data.data.message);
      })
      .catch(function (error) {
        if (!toast.isActive(toastId)) {
          toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        };
      });
  };

  return (
    <>
      {UserInfo.map((user, key) => {
        return (
          <Dropdown key={key}>
            <Dropdown.Toggle className="dropdown-button" />
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={user.profile}>{user.userInfo}</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={user.changePassword}>{user.changePasswordText}</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button className="logout" onClick={logout}>
                  {user.signout}
                </button>
              </Dropdown.Item>
              
            </Dropdown.Menu>
          </Dropdown>
        );
      })}
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip} />
    </>
  );
};

export default UserDropdown;