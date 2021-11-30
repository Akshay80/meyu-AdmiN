import React from "react";
import CustomerTable from "../../../Components/Common/Table/CustomerTable/CustomerTable";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";

const Customer = () => {
  return (
    <div className="pt-2">
      <div className="page-heading d-flex align-items-center p-4">
        <UserIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">Customer </h3>
      </div>
      <div className="card">
        <CustomerTable />
      </div>
    </div>
  );
};

export default Customer;
