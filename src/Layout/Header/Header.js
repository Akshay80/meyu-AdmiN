import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Hamburger } from "../../Assets/Icon/hamburger.svg";
import UserDropdown from "../../Components/Common/UserInfo/UserDropdown";
import { viewprofileService } from "../../Services/userService";
import "./Header.scss";

const Header = ({ menuToggleState, toggleMenu }) => {
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  // eslint-disable-next-line no-unused-vars
  const [url, setURL] = useState();
  const baseUrl = "http://meyu.sg:8082";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) navigate("/login");

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = () => {
    viewprofileService()
      .then((response) => {
        if (response?.statusText === "OK") {
          setEmail(response?.data?.data?.Profile?.email);
          setURL(baseUrl + response?.data?.data?.Profile.profileUrl);
          setFullName(
            response?.data?.data?.Profile?.firstName +
              " " +
              response?.data?.data?.Profile?.lastName
          );
        }
      })
      .catch((error) => {});
  };

  return (
    <div
      className={`header-wrapper d-flex ${menuToggleState ? "full-width" : ""}`}
    >
      <span className="hamburger-menu">
        <Hamburger onClick={toggleMenu} />
      </span>
      <div className="user-container d-flex">
        <div className="user-info">
          <h6 className="pb-0 mb-0 fw-bold">{fullName}</h6>
          {email}
          {/* <img
            src={url}
            alt="user_Image"
            width="50"
            height="50"
            style={{ borderRadius: "50%", objectFit: "cover" }}
          /> */}
        </div>
        <UserDropdown />
      </div>
    </div>
  );
};

export default Header;
