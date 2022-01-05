import React from "react";
import "../../../Components/Common/Cards/PrimaryCard/ChefDetailCard/Card.scss";
import UserImage from "../../../Assets/Images/blank-user.png";

const ItemChefCard = ({ chefDetail }) => {
  const URL = "http://52.77.236.78:8081/";
  return (
    <div className="container">
      <div className="card mb-3 p-3">
        <div className="row g-0">
          <div className="col-md-3 col-sm-6 col-xs-12 d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={
                  chefDetail?.profileUrl === null
                    ? UserImage
                    : URL + chefDetail?.profileUrl
                }
                className="img"
                alt="..."
                style={{ borderRadius: "50%", width: 100, height: 100, objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-md-9 col-sm-6 col-xs-12">
            <div className="user-card-info d-flex mx-3 align-items-center">
              <div className="info-x">
                <h5 className="mb-0">
                  {chefDetail.firstName} {chefDetail.lastName}
                </h5>
                <p>Phone No</p>
                <p>Email</p>
                <p>Join Date</p>
                <p>Chef Timing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemChefCard;
