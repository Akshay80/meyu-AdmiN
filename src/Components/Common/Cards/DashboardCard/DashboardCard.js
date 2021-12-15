import React from "react";
import { DashboardCardData } from "./DashboardCardData";
import "./DashboardCard.scss";
import CountUp from "react-countup";

export const DashboardCard = () => {
  return (
    <div className="container">
      <div className="row">
        {DashboardCardData.map((val, key) => {
          return (
            <div
              key={key}
              className="dashboard-card col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <div
                className="card h-100 w-100 py-2"
                style={{ maxWidth: "250px" }}
              >
                <div className="row p-3">
                  <div className="col-4">
                    <div className=" svg-icon d-flex mt-1">{val.icon}</div>
                  </div>
                  <div className="col-8">
                    <div className="card-body p-0">
                      <p className="card-text cardTitle">{val.title}</p>
                      <h3 className="cardNumber">
                        <CountUp start={0} end={val.number} duration={5} />
                      </h3>
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
