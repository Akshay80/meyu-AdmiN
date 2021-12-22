import React from "react";
import { Link } from "react-router-dom";
import { UserInfo } from "./UserInfo";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import "./userDropDown.css";
import "../Buttons/buttons.scss";
import { logoutFun } from "../../../Services/authService";
import { clearToken } from "../../helper/uitility";
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
        });
      })
      .catch(function (error) {});
  };

  return (
    <>
      {UserInfo.map((user, key) => {
        return (
          <div key={key} className="dropdown ">
            <button
              className="btn btn-dropdown dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li key={key}>
                <Link
                  className="dropdown-item dropdown-action"
                  to={user.profile}
                >
                  {user.userInfo}
                </Link>
              </li>
              <li key={key + 1}>
                <Link
                  className="dropdown-item dropdown-action"
                  to={user.changePassword}
                >
                  {user.changePasswordText}
                </Link>
              </li>
              <li key={key + 2}>
                <button
                  className="dropdown-item dropdown-action"
                  onClick={logoutFunction}
                >
                  {user.signout}{" "}
                </button>
              </li>
            </ul>
          </div>
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
