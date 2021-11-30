import React from "react";
import CustomerTable from "../../../Components/Common/Table/CustomerTable/CustomerTable";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";

const Customer = () => {
  return (
    <div className="pt-2">
      <div className="page-heading d-flex p-4">
      <div className="page-heading-wapper d-flex">
        <UserIcon className="page-icon m-0"     />
        <h3 className="page-sec-heading m-0 ms-2">Customer </h3>
      </div>
      </div>
      <div className="card">
        <CustomerTable />
      </div>
    </div>
  );
};

export default Customer;
