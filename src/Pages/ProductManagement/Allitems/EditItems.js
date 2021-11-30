import React from "react";
import ItemChefCard from "./ItemChefCard";
import ItemDetails from "./ItemDetails";
import {ReactComponent as ShoppingCartIcon} from '../../../Assets/Icon/Shoppingbasket.svg'

const EditItems = () => {
  return (
    <div>
      <div className="page-heading d-flex align-items-center justify-content-between p-4">
        <div className="page-heading-wapper d-flex">
          <ShoppingCartIcon  className="page-icon m-0"  />
          <div className="d-block">
            <h3 className="page-sec-heading m-0 ms-2">All Items / Item Details </h3>
          </div>
        </div>
            <h6>
              Chef ID <b>#543210</b>
            </h6>
      </div>

      <div className="d-flex flex-column justify-content-around">
        <ItemChefCard />
        <ItemDetails />
      </div>
    </div>
  );
};

export default EditItems;
