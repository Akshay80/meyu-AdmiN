import React from "react";
import ItemChefCard from "./ItemChefCard";
import ItemDetails from "./ItemDetails";
import {ReactComponent as ShoppingCartIcon} from '../../../Assets/Icon/Shoppingbasket.svg'

const EditItems = () => {
  return (
    <div>
      <div className="page-heading d-flex justify-content-between flex-column p-4">
        <div className="d-flex align-items-center">
          <ShoppingCartIcon
            style={{ height: "36px", width: "36px", marginRight: "10px" }}
          />
          <div className="d-block">
            <h4 className="mb-0">All Items / Item Details </h4>
            <h6>
              Chef ID <b>#543210</b>
            </h6>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column justify-content-around">
        <ItemChefCard />
        <ItemDetails />
      </div>
    </div>
  );
};

export default EditItems;
