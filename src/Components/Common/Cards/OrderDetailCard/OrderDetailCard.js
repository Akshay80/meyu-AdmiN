import React from "react";
import { ReactComponent as OrderIcon } from "../../../../Assets/Icon/orderinprogress.svg";
import "./OrderDetailCard.scss";

const OrderDetailCard = () => {
  return (
    <div className="container">
      <div className="card mb-3 p-3">
          <div className="card-title d-flex pb-3 ps-3">
            <OrderIcon />
            <div className="d-block mx-3">
              <h4 >Delivered</h4>
              <p>Date</p>
            </div>
          </div>
        <div className="row g-0 food-detail">
          <div className="col-md-2 col-sm-12 align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src="https://source.unsplash.com/random/111x111"
                className="image"
                alt="..."
              />
            </div>
          </div>
          <div className="col-md-10 col-sm-12 ps-2">
            <div className="card-title">
              <h4>Food Title</h4>
            </div>
            <div className="card-text">
              loremQuis aute fugiat enim consectetur cillum nulla aliquip anim
              ullamco commodo reprehenderit id dolore veniam.
            </div>
            <div className="col-8 d-flex justify-content-around ps-0 py-3">
              <div>
                <h4>Quantity</h4>
                <h5>2X</h5>
              </div>
              <div>
                <h4>Price</h4>
                <h5>$ 24</h5>
              </div>
              <div>
                <h4>Total Price</h4>
                <h5>$48</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailCard;
