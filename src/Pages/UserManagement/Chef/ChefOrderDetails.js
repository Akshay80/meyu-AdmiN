import React from "react";
import { ReactComponent as MenuIcon } from "../../../Assets/Icon/Menu.svg";
import ChefOrderTable from "../../../Components/Common/Table/ChefOrderTable/ChefOrderTable";

const ChefOrderDetails = () => {
  return (
    <div>
      <div className="page-heading d-flex align-items-center p-3">
        <MenuIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">Order Details </h3>
      </div>
      <div className="card">
        <ChefOrderTable />
      </div>
    </div>
  );
};

export default ChefOrderDetails;
