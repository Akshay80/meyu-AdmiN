import React from "react";
import './PrimaryCard.scss';

const PrimaryCard = () => {
  return (
    <div className="container">
      <div className="card mb-3 p-3">
        <div className="row g-0">
          <div className="col-md-3 col-sm-12 align-items-center justify-content-center">
              <div className="d-flex align-items-center justify-content-center">
            <img
              src="https://source.unsplash.com/random/111x111"
              className="img"
              alt="..."
              style={{borderRadius:"50%"}}
            /></div>
          </div>
          <div className="col-md-9 col-sm-12">
            <div>
                <div className="user-card-info d-flex mx-3 align-items-center justify-content-between">
                    <div>
                        <p>Name</p>
                        <p>Phone No</p>
                        <p>Email</p>
                    </div>
                    <div>
                        <button className="btn btn-outline-danger shadow-none" type="button">Discontinue</button>
                    </div>
                </div>

                <div className="primary-card-info mx-3 mt-5 d-flex align-items-center justify-content-between">
                    <div>
                        <h4>Completed Order</h4>
                        <p>56</p>
                    </div>
                    <div>
                    <h4>Total Amount</h4>
                        <p>$ 56</p>
                    </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryCard;
