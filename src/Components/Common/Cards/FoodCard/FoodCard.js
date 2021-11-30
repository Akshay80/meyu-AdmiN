import React from "react";
import { FoodCardData } from "./FoodCardData";
import { ReactComponent as ListIcon } from "../../../../Assets/Icon/Menu.svg";

const FoodCard = () => {
  return (
    <>
      <div className="page-heading d-flex align-items-center p-4">
      <div className="page-heading-wapper d-flex">
        <ListIcon className="page-icon m-0" />
        <h3 className="page-sec-heading m-0 ms-2">Foods</h3>
      </div>
      </div>
    <div className="row col-md-12">
      {FoodCardData.map((val, key) => {
        return (
          <div key={key} className="col-md-4 gy-3 gx-5 mb-3">
            <div className="card h-100">
              <img
                src="https://source.unsplash.com/random/60x60"
                className="card-img-top p-3 pb-0"
                alt="..."
              />
              <div className="card-body">
                <h6>{val.title}</h6>
                <p>{val.detail}</p>
                <p>{val.price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default FoodCard;
