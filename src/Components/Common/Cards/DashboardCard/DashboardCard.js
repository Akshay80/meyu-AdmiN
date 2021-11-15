import React from "react";
import { DashboardCardData } from "./DashboardCardData";

export const DashboardCard = () => {
  return (
    <div className="d-flex justify-content-around">
      {DashboardCardData.map((val, key) => {
        return (
          <div className="card mb-3" style={{ maxWidth: "220px" }}>
            <div key={key} className="row p-3">
              <h5 className="card-title d-flex align-items-center">
                {val.title}
              </h5>
              <div className="col-md-4 d-flex align-items-center justify-content-center">
                {val.icon}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p className="card-text">{val.number}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
