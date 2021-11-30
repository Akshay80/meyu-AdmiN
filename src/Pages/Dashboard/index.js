import React from "react";
import { DashboardCard } from "../../Components/Common/Cards/DashboardCard/DashboardCard";
import { ReactComponent as Home } from "../../Assets/Icon/home.svg";
import "./Dashboard.scss";
import Week from "../../Components/Common/DatePicker/Week";
import Month from "../../Components/Common/DatePicker/Month";
import Year from "../../Components/Common/DatePicker/Year";
import  "../../Components/Common/DatePicker/Datepickbutton.scss";
import Login from "../../Components/Auth/Login/Login";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
const token = localStorage.getItem('token');
  return (
    <>
    <div className="dashboard-wrapper d-flex justify-content-between align-items-center">
      <div className="page-heading d-flex p-4">
        <div className="page-heading-wapper d-flex">
          <Home className="page-icon m-0"/>
          <h3 className="page-sec-heading m-0 ms-2">Dashboard </h3>
        </div>
      </div>
        <div className="date-filters d-flex">
          <Week />
          <Month />
          <Year />
        </div>
    </div>
      <div className="dashboard-content">
        <DashboardCard />
      </div>
    </>
  );
};

export default Dashboard;
