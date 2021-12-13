import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserInfo } from "./UserInfo";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import "./userDropDown.css";
import Path from "../../../Constant/RouterConstant";
import "../Buttons/buttons.scss";
import { logoutFun } from "../../../Services/authService";
import { clearToken } from "../../helper/uitility";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const UserDropdown = () => {
  let navigate = useNavigate();

  const logoutFunction = () => {
    logoutFun()
      .then((res) => {
        setTimeout(() => {
        clearToken(); 
        navigate("/login");
        }, 2000);
        toast.success(res.data.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      })
      .catch(function (error) {
        console.log("error logout", error);
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
                <Link to={user.changePassword}>{user.changePasswordText}</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button className="logout" onClick={logoutFunction}>
                  {user.signout}
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      })}
         <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};

export default UserDropdown;
