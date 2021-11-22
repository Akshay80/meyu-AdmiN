import React, { useState } from "react";
import "./Card.scss";
import ChefOrderDetails from "../../../../../Pages/UserManagement/Chef/ChefOrderDetails"
import FoodCard from '../../FoodCard/FoodCard'

const   ChefCard = () => {
  const [togglemenu, setToggleMenu] = useState(false);
  const toggleMenu = () => {
    setToggleMenu(true);
  }
  return (
    <div className="container mb-5">
      <div className="card mb-3 p-3">
        <div className="row g-0">
          <div className="col-md-3 col-sm-12 align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src="https://source.unsplash.com/random/111x111"
                className="img"
                alt="..."
                style={{ borderRadius: "50%", margin:"5px" }}
              />
            </div>
          </div>
          <div className="col-md-9 col-sm-12">
            <div>
              <div className="user-card-info d-flex mx-3 align-items-center justify-content-between">
                <div className="info-x">
                <h5 className="mb-0">Name</h5>
                  <p>Phone No</p>
                  <p>Email</p>
                  <p>Join Date</p>
                  <p>Chef Timing</p>
                </div>
                <div className="d-flex flex-column">
                <button type="button" onClick={toggleMenu} className="btn btn-outline-secondary mb-3">View</button>
                  <button
                    className="btn btn-success shadow-none"
                    type="button"
                  >
                    Approved
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
      {togglemenu?<FoodCard />: <ChefOrderDetails />}
    </div>
  );
};

export default ChefCard;
