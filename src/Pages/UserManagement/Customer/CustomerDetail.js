import React from "react";
import CustomerCard from "../../../Components/Common/Cards/PrimaryCard/CustomerDetailCard/Card";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";
import { ReactComponent as OrderIcon } from "../../../Assets/Icon/order.svg";
import OrderDetailCard from "../../../Components/Common/Cards/OrderDetailCard/OrderDetailCard";

const CustomerDetail = () => {
  return (
    <div>
      <div className="page-heading d-flex justify-content-between flex-column p-4 pb-0">
        <div className="d-flex align-items-center">
          <UserIcon
            style={{ height: "36px", width: "36px", marginRight: "10px" }}
          />
          <div className="d-block">
            <h4 className="mb-0">Customer / Customer-Details </h4>
            <h6>
              Customer ID <b>#543210</b>
            </h6>
          </div>
        </div>
      </div>
      <div>
        <CustomerCard />
      </div>
      <div className="pb-3">
        <div className=" main-heading d-flex align-items-center ps-4 mt-5 pb-1">
          <OrderIcon
            style={{ height: "24px", width: "24px", marginRight: "5px" }}
          />
          <h4 className="m-1">Order-Details </h4>
        </div>
        <OrderDetailCard />
      </div>
    </div>
  );
};

export default CustomerDetail;
