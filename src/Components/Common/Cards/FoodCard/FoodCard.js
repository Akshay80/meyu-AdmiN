import React from "react";
import { FoodCardData } from "./FoodCardData";
import { ReactComponent as ListIcon } from "../../../../Assets/Icon/Menu.svg";

const FoodCard = () => {
  return (
    <>
      <div className="page-heading d-flex align-items-center ps-4 mt-3">
        <ListIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">Foods </h3>
      </div>
    <div className="row col-md-12">
      {FoodCardData.map((val, key) => {
        return (
          <div key={key} className="col-md-4 gy-3 gx-5 mb-3">
            <div className="card h-100">
              <img
                src="https://source.unsplash.com/random/100x100"
                className="card-img-top p-3 pb-0"
                alt="..."
              />
              <div className="card-body">
                <h6 className="card-title">{val.title}</h6>
                <p className="card-text">{val.detail}</p>
                <p className="card-text">{val.price}</p>
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
