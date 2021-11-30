import React from "react";
import { ReactComponent as OrderIcon } from "../../../../Assets/Icon/orderinprogress.svg";
import "./OrderDetailCard.scss";

const OrderDetailCard = () => {
  return (
    <div className="container">
      <div className="card mb-3 p-3">
          <div className="card-title d-flex align-items-center pb-3 ps-3">
            <OrderIcon className="page-icon m-0"/>
            <div className="d-block mx-3">
              <h5 className="mb-0">Delivered</h5>
              <p>Date</p>
            </div>
          </div>
        <div className="row g-0 food-detail">
          <div className="col-md-3 col-12 align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src="https://source.unsplash.com/random/111x111"
                className="image p-1 m-1"
                alt="..."
              />
            </div>
          </div>
          <div className="col-md-9 col-12 details-x">
            <div className="card-title mt-2 d-flex">
              <h4>Food Title</h4>
            </div>
            <div className="card-text">
              loremQuis aute fugiat enim consectetur cillum nulla aliquip anim
              ullamco commodo reprehenderit id dolore veniam.
            </div>
            <div className="card-x col-12 col-md-12 col-lg-8 d-flex justify-content-between ps-0 py-3">
              <div className="card-xz">
                <h5 className="mb-0">Quantity</h5>
                <h6>2X</h6>
              </div>
              <div className="card-xz">
                <h5 className="mb-0">Price</h5>
                <h6>$24</h6>
              </div>
              <div className="card-xz">
                <h5 className="mb-0">Total Price</h5>
                <h6>$48</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailCard;
