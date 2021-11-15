import React from "react";
import { DashboardCard } from "../../Components/Common/Cards/DashboardCard/DashboardCard";
import { ReactComponent as Home } from '../../Assets/Icon/home.svg'

const Dashboard = () => {
  return (
    <>
      <div className="page-heading d-flex align-items-center p-4" style={{color: "#5e5e5e"}}>
        <Home style={{height: "36px", width:"36px", marginRight: "10px"}} />
          <h3 className="m-1">
          Dashboard </h3>
      </div>
      <div >
        <DashboardCard />
      </div>
      
    </>
  );
};

export default Dashboard;
