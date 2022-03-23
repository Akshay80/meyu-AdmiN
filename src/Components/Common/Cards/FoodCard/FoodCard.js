import React from "react";
import { ReactComponent as ListIcon } from "../../../../Assets/Icon/Menu.svg";
import "./FoodCard.scss";
import ReactStars from "react-stars-new";
import ReadMoreReact from "read-more-react";
import Carousel from "react-bootstrap/Carousel";
import veg from "../../../../Assets/Icon/Veg.svg";
import nonveg from "../../../../Assets/Icon/NonVeg.svg";
import noodles from "../../../../Assets/Images/noodles.png";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ items, chefRecipe }) => {
  // console.log("ChefRecipe: ", chefRecipe);
  let navigate = useNavigate();
  const routeChange = (id) =>{ 
    let path = `/edit-items/${id}`; 
    navigate(path);
  }
  return (
    <>
      <div className="page-heading d-flex align-items-center p-4">
        <div className="page-heading-wapper d-flex">
          <ListIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 ms-2">Foods</h3>
        </div>
      </div>

      <div className="row col-md-12">
        {chefRecipe?.map((val) => {
          let price = "$" + val.costPerServing;
          return (
            <div
              key={val?.MediaObjects?.map((food) => food?.id)}
              className="col-md-4 gy-3 gx-5 mb-3"
            >
              <div
                key={val?.MediaObjects?.map((food) => food?.id)}
                className="card h-100 foodcard" 
              >
                <Carousel controls={val.MediaObjects.length === 1 ? false: true} indicators={false}>
                  {val?.MediaObjects?.map((food, key) => (
                    <Carousel.Item key={key}>
                      <img
                        className="d-block w-100 cardImages"
                        src={`http://13.213.151.153:8083/${food?.imageUrl}`}
                        alt="First slide"
                        onClick={() => routeChange(val.id)}
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
                      onChange={(e) => console.log(e)}
                    />
                  </div>
                  <ReactStars
                    count={val.rating}
                    className={val.rating === 0 ? "mt-2 mb-2":null}
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
        {chefRecipe.length === 0? 
        <div className="d-block mx-auto">
          <div className="card p-4 mx-auto">
          <img className="text-center d-block mx-auto" src={noodles} alt="warn-noodles" width="90"/>
        <h4 className="text-dark text-center fw-bold">Looks like nothing to see here?</h4>
        <h5 className="text-muted text-justify fs-6 mx-auto">Remember, Good food never fail in bringing people together</h5>
        <p className="fw-normal text-muted text-justify fs-6 mx-auto">Upload some delicious food or a recipes 
        so that you can see them here.</p>
        </div>
        </div>
        : null}
      </div>
    </>
  );
};

export default FoodCard;
