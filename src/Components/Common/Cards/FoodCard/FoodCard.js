import React, { useEffect, useState } from "react";
import { ReactComponent as ListIcon } from "../../../../Assets/Icon/Menu.svg";
import "./FoodCard.scss";
import ReactStars from "react-stars";
import ReadMoreReact from "read-more-react";


const FoodCard = ({foodimage , items}) => {
  return (
    <>
      <div className="page-heading d-flex align-items-center p-4">
        <div className="page-heading-wapper d-flex">
          <ListIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 ms-2">Foods</h3>
        </div>
      </div>
      <div className="row col-md-12">
      {items?.map((val, key) => {
        let price = val.currencySymbol + val.totalCostOfRecipe
        return (
          <div key={key} className="col-md-4 gy-3 gx-5 mb-3">
       
              <div  className="card">
                <img
                  src={foodimage}
                  className="card-img-top cardimage"
                  alt="..."
                />
                <div className="card-body">
                  <h6 className="card-title">{val.dishName}</h6>
                  <p className="card-description text-muted">
                    <ReadMoreReact ideal={120} text={val.description} />
                  </p>
                  <ReactStars
                    count={val.count}
                    size={16}
                    edit={false}
                    color1={"#04AA6D"}
                  />
                  <p className="price">{price}</p>
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
