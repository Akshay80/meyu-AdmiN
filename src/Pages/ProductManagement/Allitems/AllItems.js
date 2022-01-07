import React from "react";
import { ReactComponent as BagIcon } from "../../../Assets/Icon/Shoppingbasket.svg";
import AllItemsTable from "../../../Components/Common/Table/AllItemsTable/AllItemsTable";
const AllItems = () => {
  return (
    <div>
      <div className="page-heading d-flex p-4">
        <div className="page-heading-wapper d-flex">
          <BagIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">All Recipes </h3>
        </div>
      </div>
      <div className="card">
        <AllItemsTable />
      </div>
    </div>
  );
};

export default AllItems;
