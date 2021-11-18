import React from "react";

const FoodCard = () => {
  return (
    <div className="row row-cols-md-4 g-4">
      <div className="col">
        <div className="card h-100">
          <img src="https://source.unsplash.com/random/111x111" className="card-img-top p-2" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card Title</h5>
            <p className="card-text">Details About Food in Detail</p>
            <i class="bi bi-star-fill">Ratings</i>
            <p className="card-text">Food Price</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
