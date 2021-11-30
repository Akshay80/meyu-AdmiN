import React from "react";
import ChefTable from "../../../Components/Common/Table/ChefTable/ChefTable";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";

const Chef = () => {
  return (
    <div className="pt-2">
      <div className="page-heading d-flex align-items-center p-4">
        <UserIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">Chef </h3>
      </div>
      <div className="card">
        <ChefTable />
      </div>
    </div>
  );
};

export default Chef;
