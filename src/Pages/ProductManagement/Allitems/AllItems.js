import React from "react";
import ItemChefCard from "./ItemChefCard";
import ItemDetails from "./ItemDetails";
import { ReactComponent as AllItemsIcon } from "../../../Assets/Icon/Categories.svg";

const AllItems = () => {
  return (
    <div>
      <div className="page-heading d-flex justify-content-between flex-column p-4 pb-0">
        <div className="d-flex align-items-center">
          <AllItemsIcon
            style={{ height: "36px", width: "36px", marginRight: "10px" }}
          />
          <div className="d-block">
            <h5 className="mb-0">All Items - Item Details </h5>
            <h6>
              Chef ID <b>#543210</b>
            </h6>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <ItemChefCard />
        <ItemDetails />
      </div>
    </div>
  );
};

export default AllItems;
