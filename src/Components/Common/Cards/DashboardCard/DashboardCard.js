import React from "react";
import { DashboardCardData } from "./DashboardCardData";
import "./DashboardCard.scss";

export const DashboardCard = () => {
  return (
    <div className="container">
      <div className="row">
        {DashboardCardData.map((val, key) => {
          return (
            <div className="dashboard-card col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
              <div className="card h-100 w-100 py-2" style={{ maxWidth: "250px" }}>
                <div key={key} className="row p-3">
                  <div className="col-md-4 ">
                    <div className=" svg-icon d-flex mt-1">{val.icon}</div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-0">
                      <p className="card-text">{val.title}</p>
                      <h3 className="card-title">{val.number}</h3>
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
