import React from "react";
import ChefTable from "../../../Components/Common/Table/ChefTable/ChefTable";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";

const Chef = () => {
  return (
    <div>
      <div className="page-heading d-flex align-items-center p-4">
        <div className="page-heading-wapper d-flex">
          <UserIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Chef </h3>
        </div>
      </div>
      <div className="card">
        <ChefTable />
      </div>
    </div>
  );
};

export default Chef;
