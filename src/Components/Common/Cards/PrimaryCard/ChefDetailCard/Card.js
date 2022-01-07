import React, { useState, useEffect } from "react";
import "./Card.scss";
import ChefOrderDetails from "../../../../../Pages/UserManagement/Chef/ChefOrderDetails";
import FoodCard from "../../FoodCard/FoodCard";
import UserImage from "../../../../../Assets/Images/blank-user.png";
import { confirmAlert } from "react-confirm-alert";
import { confirmChefAccount } from "../../../../../Services/chefServices";
import { toast } from "react-toastify";

const ChefCard = ({ chefDetail, chefImage }) => {
  const [togglemenu, setToggleMenu] = useState(false);
  const URL = "http://52.77.236.78:8081/";
  const [apiState, setApiState] = useState();

  const toggleMenu = () => {
    setToggleMenu(true);
  };

  function onApproval() {
    localStorage.setItem("status", "Approved");
    setApiState("true");
  }

  function onReject() {
    localStorage.setItem("status", "Rejected");
    setApiState("false");
  }

  useEffect(() => {
    changeStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState]);

  const changeStatus = () => {
    let params = {
      isVerified: apiState,
    };
    confirmChefAccount(params)
      .then((res) => {
        if (res.data.data.message === "User profile verified successfully.") {
          toast.success(res.data.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
          });
        }
        if (res.data.data.message === "User profile rejected successfully.") {
          toast.error(res.data.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
          });
        }
      })
      .catch((error) => {});
  };

  const confirmChange = (id) => {
    confirmAlert({
      title: <h3>Change Chef Status</h3>,
      message: `Do you want to change status of Chef?`,
      buttons: [
        {
          label: "Approve",
          className: "btn btn-success",
          onClick: () => {
            onApproval();
          },
        },
        {
          label: "Reject",
          className: "btn btn-danger",
          onClick: () => {
            onReject();
          },
        },
        // {
        //   label: "Reject",
        //   className: "btn btn-danger",
        //   onClick: () => {
        //     changeStatus(id);
        //   },
        // },
      ],
    });
  };

  return (
    <div className="container mb-5">
      <div className="card mb-3 p-3">
        <div className="row g-0">
          <div className="col-md-3 col-sm-12 align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={
                  chefDetail?.profileUrl === null
                    ? UserImage
                    : URL + chefDetail?.profileUrl
                }
                className="img"
                alt="..."
                style={{
                  borderRadius: "50%",
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col-md-9 col-sm-12">
            <div>
              <div className="user-card-info d-flex mx-3 align-items-center justify-content-between">
                <div className="info-x">
                  <h5 className="mb-0">
                    {chefDetail?.firstName} {chefDetail?.lastName}
                  </h5>
                  <p>{chefDetail?.phone}</p>
                  <p>{chefDetail?.email}</p>
                  {/* <p>{chefDetail?.id}</p> */}
                  <p>Chef Timing</p>
                </div>
                <div className="d-flex flex-column">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="btn btn-outline-secondary mb-3"
                  >
                    View
                  </button>
                  <button
                    className={
                      localStorage.getItem("status") === "Approved"
                        ? "btn btn-success shadow-none"
                        : "btn btn-danger shadow-none"
                    }
                    type="button"
                    onClick={() => confirmChange(chefDetail?.id)}
                  >
                    {localStorage.getItem("status") || "Rejected"}
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
                  <h6>$56</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {togglemenu ? <FoodCard /> : <ChefOrderDetails />}
    </div>
  );
};

export default ChefCard;
