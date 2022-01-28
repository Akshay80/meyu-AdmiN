import React from "react";
import { ReactComponent as MenuIcon } from "../../../Assets/Icon/Menu.svg";
import ChefOrderTable from "../../../Components/Common/Table/ChefOrderTable/ChefOrderTable";

const ChefOrderDetails = () => {
  return (
    <div>
      <div className="page-heading d-flex align-items-center p-4">
        <div className="page-heading-wapper d-flex">
          <MenuIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Order Details </h3>
        </div>
      </div>
      <div className="card">
        <ChefOrderTable />
      </div>
    </div>
  );
};

export default ChefOrderDetails;
