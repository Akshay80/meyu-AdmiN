import React from "react";
import { FoodCardData } from "./FoodCardData";
import { ReactComponent as ListIcon } from "../../../../Assets/Icon/Menu.svg";
import './FoodCard.scss'
import ReactStars from 'react-stars'
import ReadMoreReact from 'read-more-react';

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
            <div className="card">
              <img
                src={val.url}
                className="card-img-top cardimage"
                alt="..."
              />
              <div className="card-body">
                <h6 className="card-title">{val.title}</h6>
                <p className="card-description text-muted">
                <ReadMoreReact ideal={120} text={val.detail} readMoreText="click here to read more"/>
                </p>
                <ReactStars
  count={val.count}
  size={28}
  edit={false}
  color1={'#ffd700'} />
                <p className="price">{val.price}</p>
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
