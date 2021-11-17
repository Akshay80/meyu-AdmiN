import React, { useState } from "react";
import { DashboardCard } from "../../Components/Common/Cards/DashboardCard/DashboardCard";
import { ReactComponent as Home } from "../../Assets/Icon/home.svg";
import "./Dashboard.scss";
import DatePicker from "react-datepicker";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <div className="page-heading d-flex justify-content-between align-items-center p-4">
        <div className="d-flex">
          <Home
            style={{ height: "36px", width: "36px", marginRight: "10px" }}
          />
          <h3 className="m-1">Dashboard </h3>
        </div>
        <div className="me-3">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>
      <div className="dashboard-content">
        <DashboardCard />
      </div>
    </>
  );
};

export default Dashboard;
