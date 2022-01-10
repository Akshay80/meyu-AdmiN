import React from "react";
import { DashboardCard } from "../../Components/Common/Cards/DashboardCard/DashboardCard";
import { ReactComponent as Home } from "../../Assets/Icon/home.svg";
import "./Dashboard.scss";
import Week from "../../Components/Common/DatePicker/Week";
import Month from "../../Components/Common/DatePicker/Month";
import Year from "../../Components/Common/DatePicker/Year";
import "../../Components/Common/DatePicker/Datepickbutton.scss";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-wrapper d-flex justify-content-between align-items-center">
        <div className="page-heading d-flex p-4">
          <div className="page-heading-wapper align-items-center d-flex">
            <Home className="page-icon m-0" />
            <h3 className="page-sec-heading m-0 mx-2">Dashboard BRO </h3>
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
