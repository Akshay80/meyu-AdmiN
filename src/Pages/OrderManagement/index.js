import React from "react";
import OrdersTable from "../../Components/Common/Table/OrdersTable/OrdersTable";
import { ReactComponent as OrderIcon } from "../../Assets/Icon/order.svg";
import "./OrderManagement.scss";

const OrderManagement = () => {
  return (
    <div>
      <div className="page-heading d-flex align-items-center p-4  ">
        <OrderIcon
          className="me-2"
        />
        <h4 className="m-1">Order Management</h4>
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
