import React from "react";
import UserImage from "../../../../../Assets/Images/blank-user.png";
import "./Card.scss";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CustomerCard = ({ customerDetail, customerImage }) => {
  const disContinue = () => {
    confirmAlert({
      title: "Discontinue!",
      message: `Are you sure you want to discontinue this customer?`,
      buttons: [
        {
          label: "Yes",
          className: "btn btn-danger",
          color: "red",
          onClick: () => {
            alert("Customer Discontinued!");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="container">
      <div className="card mb-3 p-3">
        <div className="row g-0">
          <div className="col-md-3 col-sm-12 align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={
                  customerImage === `http://meyu.sg:8081/null`
                    ? UserImage
                    : customerImage
                }
                className="img"
                alt="..."
                style={{ borderRadius: "50%", width: 100, height: 100 }}
              />
            </div>
          </div>
          <div className="col-md-9 col-sm-12">
            <div>
              <div className="user-card-info d-flex mx-3 mt-2 align-items-center justify-content-between">
                <div className="info-x">
                  <h5 className="mb-1">{customerDetail?.fullName}</h5>
                  <p>{customerDetail?.phone}</p>
                  <p>{customerDetail?.email}</p>
                </div>
                <div>
                  <button
                    className="btn btn-outline-danger shadow-none"
                    type="button"
                    onClick={disContinue}
                  >
                    Discontinue
                  </button>
                </div>
              </div>

              <div className="primary-card-info mx-3 mt-5 d-flex justify-content-between">
                <div className="info-xz">
                  <h5 className="mb-0">Completed Order</h5>
                  <h6>56</h6>
                </div>
                <div className="info-xz">
                  <h5 className="mb-0">Total Amount</h5>
                  <h6>$ 56</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
