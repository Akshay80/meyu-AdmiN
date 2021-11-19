import React from "react";
import { DashboardCardData } from "./DashboardCardData";
import './DashboardCard.scss'

export const DashboardCard = () => {
  return (
    <div className="container">
    <div className="row">
      {DashboardCardData.map((val, key) => {
        return (
          <div className="dashboard-card col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3 h-100">
        <div className="card h-100" style={{ maxWidth: "200px" }}>
            <div key={key} className="row p-3">
              <h6 className="card-title d-flex align-items-center">
                {val.title}
              </h6>
              <div className=" d-flex align-items-center justify-content-center">
                <div className="col-md-4 col-sm-6 col-xs-12">
                {val.icon}
                </div>
             
              <div className="col-md-8 col-sm-6 col-xs-12">
                <div className="card-body">
                  <p className="card-text">{val.number}</p>
                </div>
              </div>
              </div>
            </div>
          </div>
    </div>
        );
      })}
    </div>
    </div>
  );
};
