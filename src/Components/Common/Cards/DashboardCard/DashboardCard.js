import React, {useEffect, useState} from "react";
import { DashboardCardData } from "./DashboardCardData";
import "./DashboardCard.scss";
import { dashboardService } from "../../../../Services/dashService";
import CountUp from "react-countup";
import {ReactComponent as TotalOrder} from '../../../../Assets/Icon/totalOrder.svg'
import {ReactComponent as TotalDelivered} from '../../../../Assets/Icon/orderDelivered.svg'
import {ReactComponent as TotalCancelled} from '../../../../Assets/Icon/orderCancelled.svg'
import {ReactComponent as TotalRevenue} from '../../../../Assets/Icon/Revenue.svg'
import {ReactComponent as TotalChef} from '../../../../Assets/Icon/Chef.svg'
import {ReactComponent as TotalCustomer} from '../../../../Assets/Icon/totalCustomer.svg'
import {ReactComponent as Orderinprogress} from '../../../../Assets/Icon/orderinprogress.svg'
import {ReactComponent as ApprovedOrder} from '../../../../Assets/Icon/Approved.svg' 
import {ReactComponent as RejectedOrder} from '../../../../Assets/Icon/Rejected.svg' 

export const DashboardCard = () => {
  const [totalOrder, setOrder] = useState();
  const [totalDeliveries, setDelivery] = useState();
  const [totalCancelled, setCancel] = useState();
  const [totalRevenue, setRevenue] = useState();
  const [totalChef, setChef] = useState();
  const [totalCustomer, setCustomer] = useState();
  const [totalOrderInProgress, setOrderInProgress] = useState();
  const [totalApproved, setApproved] = useState();
  const [totalRejected, setRejected] = useState();
  const [totalPending, setPending] = useState();

  useEffect(() => {
    data()
},[])
  const data = () => {
    dashboardService()
    .then((response) => {
      console.log(response.data.data)
        setOrder(response.data.data.totalOrders);
        setDelivery(response.data.data.totalCompleted);
        setApproved(response.data.data.totalApproved);
        setRejected(response.data.data.totalRejected);
        setPending(response.data.data.totalPending);
        setCancel(response.data.data.totalCancelled);
        setRevenue(response.data.data.totalRevenue);
        setChef(response.data.data.totalChefs);
        setCustomer(response.data.data.totalCustomers);
        setOrderInProgress(response.data.data.orderInProgress);
    })
    .catch(error => {
        console.log(error)
    })
}
  return (
    <div className="container">
      <div className="row">
        {/* Total Orders */}
            

<div
              className="dashboard-card col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <div
                className="card h-100 w-100 py-2"
                style={{ maxWidth: "250px" }}
              >
                <div className="row p-3">
                  <div className="col-4">
                    <div className=" svg-icon d-flex mt-1"><ApprovedOrder /></div>
                  </div>
                  <div className="col-8">
                    <div className="card-body p-0">
                      <p className="card-text cardTitle">Accepted orders by chef</p>
                      <h3 className="cardNumber">
                      {totalApproved}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>


<div
              className="dashboard-card col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <div
                className="card h-100 w-100 py-2"
                style={{ maxWidth: "250px" }}
              >
                <div className="row p-3">
                  <div className="col-4">
                    <div className=" svg-icon d-flex mt-1"><Orderinprogress /></div>
                  </div>
                  <div className="col-8">
                    <div className="card-body p-0">
                      <p className="card-text cardTitle">Total orders in progress</p>
                      <h3 className="cardNumber">
                      {totalPending}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            




            <div
              className="dashboard-card col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <div
                className="card h-100 w-100 py-2"
                style={{ maxWidth: "250px" }}
              >
                <div className="row p-3">
                  <div className="col-4">
                    <div className=" svg-icon d-flex mt-1"><TotalDelivered/></div>
                  </div>
                  <div className="col-8">
                    <div className="card-body p-0">
                      <p className="card-text cardTitle">Delivered orders by meyu
                      {" "}
                      </p>
                      <h3 className="cardNumber">
                      {totalDeliveries}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           



            <div
              className="dashboard-card col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <div
                className="card h-100 w-100 py-2"
                style={{ maxWidth: "250px" }}
              >
                <div className="row p-3">
                  <div className="col-4">
                    <div className=" svg-icon d-flex mt-1"><RejectedOrder/></div>
                  </div>
                  <div className="col-8">
                    <div className="card-body p-0">
                      <p className="card-text cardTitle">Rejected orders by chef</p>
                      <h3 className="cardNumber">
                      {totalRejected}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>







            <div
              className="dashboard-card col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <div
                className="card h-100 w-100 py-2"
                style={{ maxWidth: "250px" }}
              >
                <div className="row p-3">
                  <div className="col-4">
                    <div className=" svg-icon d-flex mt-1"><TotalCancelled /></div>
                  </div>
                  <div className="col-8">
                    <div className="card-body p-0">
                      <p className="card-text cardTitle">Cancelled orders by customer</p>
                      <h3 className="cardNumber">
                      {totalCancelled}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>


<div
              className="dashboard-card col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <div
                className="card h-100 w-100 py-2"
                style={{ maxWidth: "250px" }}
              >
                <div className="row p-3">
                  <div className="col-4">
                    <div className=" svg-icon d-flex mt-1"><TotalOrder /></div>
                  </div>
                  <div className="col-8">
                    <div className="card-body p-0">
                      <p className="card-text cardTitle">Total orders completed</p>
                      <h3 className="cardNumber">
                        {totalOrder}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="dashboard-card col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <div
                className="card h-100 w-100 py-2"
                style={{ maxWidth: "250px" }}
              >
                <div className="row p-3">
                  <div className="col-4">
                    <div className=" svg-icon d-flex mt-1"><TotalChef /></div>
                  </div>
                  <div className="col-8">
                    <div className="card-body p-0">
                      <p className="card-text cardTitle">Total chef's available</p>
                      <h3 className="cardNumber">
                      {totalChef}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>






            <div
              className="dashboard-card col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <div
                className="card h-100 w-100 py-2"
                style={{ maxWidth: "250px" }}
              >
                <div className="row p-3">
                  <div className="col-4">
                    <div className=" svg-icon d-flex mt-1"><TotalCustomer /></div>
                  </div>
                  <div className="col-8">
                    <div className="card-body p-0">
                      <p className="card-text cardTitle">Total customer's available</p>
                      <h3 className="cardNumber">
                      {totalCustomer}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            <div
              className="dashboard-card col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <div
                className="card h-100 w-100 py-2"
                style={{ maxWidth: "250px" }}
              >
                <div className="row p-3">
                  <div className="col-4">
                    <div className=" svg-icon d-flex mt-1"><TotalRevenue /></div>
                  </div>
                  <div className="col-8">
                    <div className="card-body p-0">
                      <p className="card-text cardTitle">Total revenue generated</p>
                      <h3 className="cardNumber">
                      {Math.floor(totalRevenue)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>





            




           
      </div>
    </div>
  );
};
