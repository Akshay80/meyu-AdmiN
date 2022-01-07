import React, { useEffect, useState } from "react";
import { ReactComponent as ListIcon } from "../../../../Assets/Icon/Menu.svg";
import "./FoodCard.scss";
import ReactStars from "react-stars";
import ReadMoreReact from "read-more-react";

const FoodCard = ({ items }) => {
  return (
    <>
      <div className="page-heading d-flex align-items-center p-4">
        <div className="page-heading-wapper d-flex">
          <ListIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 ms-2">Foods</h3>
        </div>
      </div>

      <div className="row col-md-12">
        {items?.map((val) => {
          let price = val.currencySymbol + val.totalCostOfRecipe;
          return (
            <div
              key={val?.MediaObjects?.map((food) => food?.id)}
              className="col-md-4 gy-3 gx-5 mb-3"
            >
              <div
                key={val?.MediaObjects?.map((food) => food?.id)}
                className="card"
              >
                <div
                  id="carouselExampleIndicators"
                  key={val?.MediaObjects?.map((food) => food?.id)}
                  class="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div
                    key={val?.MediaObjects?.map((food) => food?.id)}
                    class="carousel-inner"
                  >
                    <div
                      key={val?.MediaObjects?.map((food) => food?.id)}
                      class="carousel-item active"
                    >
                      {val?.MediaObjects?.map((food, key) => {
                        {console.log(food)}
                        return (
                          <img
                          key={val?.MediaObjects?.map((food) => food?.id)}
                            src={`http://52.77.236.78:8081/${food?.imageUrl}`}
                            class="d-block w-100"
                            alt="..."
                          />
                        );
                      })}
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>

                <div className="card-body">
                  <h6 className="card-title">{val.dishName}</h6>
                  <div className="card-description text-muted">
                    <ReadMoreReact ideal={120} text={val.description} />
                  </div>
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
        {/* <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="http://52.77.236.78:8081/uploads/recipe/recipe-1641536043110.jpg" class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="http://52.77.236.78:8081/uploads/recipe/recipe-1641536043114.jpg" class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="http://52.77.236.78:8081/uploads/recipe/recipe-1641536043022.jpg" class="d-block w-100" alt="..." />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> */}
      </div>
    </>
  );
};

export default FoodCard;
