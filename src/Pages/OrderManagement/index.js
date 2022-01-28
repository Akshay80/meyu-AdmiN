import React from "react";
import OrdersTable from "../../Components/Common/Table/OrdersTable/OrdersTable";
import { ReactComponent as OrderIcon } from "../../Assets/Icon/order.svg";
import "./OrderManagement.scss";

const OrderManagement = () => {
  return (
    <div>
      <div className="page-heading d-flex align-items-center p-4  ">
        <div className="page-heading-wapper d-flex">
          <OrderIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Order Management</h3>
        </div>
      </div>
      <div className="orders-table-container">
        <div className="card">
          <OrdersTable />
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
