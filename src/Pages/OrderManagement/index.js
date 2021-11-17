import React from "react";
import OrdersTable from "../../Components/Common/Table/OrdersTable/OrdersTable";
import { ReactComponent as OrderIcon } from "../../Assets/Icon/order.svg";
import "./OrderManagement.scss";

const OrderManagement = () => {
  return (
    <>
      <div className="page-heading d-flex align-items-center p-4">
        <OrderIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">Order Management</h3>
      </div>
      <div className="orders-table-container">
        <OrdersTable />
      </div>
    </>
  );
};

export default OrderManagement;
