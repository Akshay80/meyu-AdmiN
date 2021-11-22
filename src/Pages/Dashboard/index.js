import React from "react";
import { DashboardCard } from "../../Components/Common/Cards/DashboardCard/DashboardCard";
import { ReactComponent as Home } from "../../Assets/Icon/home.svg";
import "./Dashboard.scss";
import Week from "../../Components/Common/DatePicker/Week";
import Month from "../../Components/Common/DatePicker/Month";
import Year from "../../Components/Common/DatePicker/Year";
import  "../../Components/Common/DatePicker/Datepickbutton.scss";

const Dashboard = () => {

  return (
    <div className="dashboard-wrapper">
      <div className="page-heading d-flex justify-content-between align-items-center p-4">
        <div className="main-heading d-flex">
          <Home
            style={{ height: "36px", width: "36px", marginRight: "10px" }}
          />
          <h3 className=" m-1">Dashboard </h3>
        </div>

        <div className="date-filters d-flex justify-content-around">
          <Week />
          <Month />
          <Year />
        </div>
      </div>
      <div className="dashboard-content">
        <DashboardCard />
      </div>
    </div>
  );
};

export default Dashboard;
