import React from "react";
import CustomerCard from "../../../Components/Common/Cards/PrimaryCard/CustomerDetailCard/Card";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";
import { ReactComponent as OrderIcon } from "../../../Assets/Icon/order.svg";
import OrderDetailCard from "../../../Components/Common/Cards/OrderDetailCard/OrderDetailCard";

const CustomerDetail = () => {
  return (
    <div>
      <div className="page-heading d-flex align-items-center justify-content-between p-4">
        <div className="page-heading-wapper d-flex">
          <UserIcon className="page-icon m-0" />
          <div className="d-block">
            <h3 className="page-sec-heading m-0 ms-2">Customer-Details </h3>
          </div>
        </div>
        <h6>
          Customer ID <b>#543210</b>
        </h6>
      </div>
      <div>
        <CustomerCard />
      </div>
      <div className="pb-3">
      <div className="page-heading d-flex align-items-center p-4  ">
      <div className="page-heading-wapper d-flex">
        <OrderIcon
          className="page-icon m-0"
        />
        <h3 className="page-sec-heading m-0 ms-2">Order Details</h3>
      </div>
      </div>
        <OrderDetailCard />
      </div>
    </div>
  );
};

export default CustomerDetail;
