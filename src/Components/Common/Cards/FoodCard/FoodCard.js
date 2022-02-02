import React from "react";
import { ReactComponent as ListIcon } from "../../../../Assets/Icon/Menu.svg";
import "./FoodCard.scss";
import ReactStars from "react-stars-new";
import ReadMoreReact from "read-more-react";
import Carousel from "react-bootstrap/Carousel";
import veg from "../../../../Assets/Icon/Veg.svg";
import nonveg from "../../../../Assets/Icon/NonVeg.svg";

const FoodCard = ({ items, chefRecipe }) => {
  // console.log("ChefRecipe: ", chefRecipe);
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
          let price = "₹" + val.costPerServing;
          return (
            <div
              key={val?.MediaObjects?.map((food) => food?.id)}
              className="col-md-4 gy-3 gx-5 mb-3"
            >
              <div
                key={val?.MediaObjects?.map((food) => food?.id)}
                className="card"
              >
                <Carousel fade indicators={false}>
                  {val?.MediaObjects?.map((food, key) => (
                    <Carousel.Item key={key}>
                      <img
                        className="d-block w-100 cardImages"
                        src={`http://meyu.sg:8081/${food?.imageUrl}`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="card-title mb-0">{val.dishName}</h6>
                    <img
                      src={val.isVegetarian === true ? veg : nonveg}
                      alt="dishtype"
                      width={val.isVegetarian === true ? 21 : 26}
                    />
                  </div>

                  <div className="card-description text-muted">
                    <ReadMoreReact
                      min={100}
                      ideal={120}
                      max={120}
                      text={val.description}
                    />
                  </div>
                  <ReactStars
                    count={Math.random() * 5}
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
      </div>
    </>
  );
};

export default FoodCard;
