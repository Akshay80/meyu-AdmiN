import React from "react";

const FoodCard = () => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      <div className="col">
        <div className="card h-100">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Details About Food in Detail</p>
            <i class="bi bi-star-fill"></i>
            <p className="card-text">Food Price</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
