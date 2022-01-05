import React, { useState } from "react";
import "./Card.scss";
import ChefOrderDetails from "../../../../../Pages/UserManagement/Chef/ChefOrderDetails";
import FoodCard from "../../FoodCard/FoodCard";
import UserImage from "../../../../../Assets/Images/blank-user.png";
import { confirmAlert } from "react-confirm-alert";
import { confirmChefAccount } from "../../../../../Services/chefServices";
import { toast } from "react-toastify";

const ChefCard = ({ chefDetail }) => {
  const [togglemenu, setToggleMenu] = useState(false);
  const [apiState, setApiState] = useState(" ");
  const [chefStatus, setChefStatus] = useState("Pending");

  const toggleMenu = () => {
    setToggleMenu(true);
  };

  const changeStatus = (id) => {
    let params = {
      isVerified: "true",
    };
    confirmChefAccount(params)
      .then((res) => {
        console.log("cheff acount", res);
        setApiState(res?.data?.data?.message);
        if (res.data.data.message === "User profile verified successfully.") {
          setChefStatus("Approved");
          toast.success(res.data.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            // toastId: "my_toast",
          });
        }

        if (res.data.data.message === "User profile rejected successfully.") {
          setChefStatus("Rejected");
          toast.error(res.data.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            // toastId: "my_toast",
          });
        }
      })
      .catch((error) => {});
  };

  const confirmChange = (id) => {
    confirmAlert({
      title: "Change Chef Status",
      message: `Do you want to change status of Chef?`,
      buttons: [
        {
          label: "Approve",
          className: "btn btn-success",
          onClick: () => {
            console.log("message", apiState);
            if (apiState === "User profile rejected successfully.") {
              changeStatus(id);
            }
          },
        },
        {
          label: "Reject",
          className: "btn btn-danger",
          onClick: () => {
            if (apiState === "User profile rejected successfully.") {
              changeStatus(chefDetail?.id);
            }
          },
        },
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
                  chefDetail?.coverPhotoUrl === null
                    ? UserImage
                    : chefDetail?.coverPhotoUrl
                }
                className="img"
                alt="..."
                style={{ borderRadius: "50%", width: 100, height: 100 }}
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
                      chefStatus === "Approved"
                        ? "btn btn-success shadow-none"
                        : "btn btn-danger shadow-none"
                    }
                    type="button"
                    onClick={() => confirmChange(chefDetail?.id)}

                    // data-bs-toggle="button"
                    // onClick={changeStatus}
                  >
                    {chefStatus}
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
