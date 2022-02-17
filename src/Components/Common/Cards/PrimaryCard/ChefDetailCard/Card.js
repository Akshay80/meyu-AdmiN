import React, { useState, useEffect } from "react";
import "./Card.scss";
import ChefOrderDetails from "../../../../../Pages/UserManagement/Chef/ChefOrderDetails";
import FoodCard from "../../FoodCard/FoodCard";
import UserImage from "../../../../../Assets/Images/blank-user.png";
import { confirmChefAccount } from "../../../../../Services/chefServices";
import { toast } from "react-toastify";
import { getAllItemsList } from "../../../../../Services/itemsService";

const ChefCard = ({ chefRecipe, chefDetail, chefPic, isVerfied }) => {
  const [togglemenu, setToggleMenu] = useState(false);
  const [apiVerify, setApiVerify] = useState();
  const [items, setItems] = useState();

  const toggleMenu = () => {
    setToggleMenu(true);
  };

  useEffect(() => {
    getFood();
    setApiVerify(`${isVerfied}`);
  }, [isVerfied]);

  const getFood = () => {
    getAllItemsList()
      .then(function (response) {
        setItems(response?.data?.data);
      })
      .catch(function (error) {});
  };

  const changeStatus = (id) => {
    if (`${apiVerify}` === "false") {
      setApiVerify("true");
    } else {
      setApiVerify("false");
    }
    let params = {
      isVerified: apiVerify,
    };
    confirmChefAccount(id, params)
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

  return (
    <div className="container mb-5">
      <div className="card mb-3 p-3">
        <div className="row g-0">
          <div className="col-md-3 col-sm-12 align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={
                  chefPic === `http://13.213.151.153:8083/null` ? UserImage : chefPic
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
                      apiVerify === "true"
                        ? "btn btn-success shadow-none"
                        : "btn btn-danger shadow-none"
                    }
                    type="button"
                    onClick={() => changeStatus(chefDetail?.id)}
                  >
                    {apiVerify === "true" ? "Approve" : "Reject"}
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

      {togglemenu ? (
        <FoodCard items={items} chefRecipe={chefRecipe} />
      ) : (
        <ChefOrderDetails />
      )}
    </div>
  );
};

export default ChefCard;
