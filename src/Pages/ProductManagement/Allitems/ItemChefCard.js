import React from "react";
import "../../../Components/Common/Cards/PrimaryCard/ChefDetailCard/Card.scss";
import UserImage from "../../../Assets/Images/blank-user.png";
import moment from "moment";

const ItemChefCard = ({ chefDetail, chefImage, cook, cookTime }) => {
 
  return (
    <div className="container">
      <div className="card mb-3 p-3">
        <div className="row g-0">
          <div className="col-md-3 col-sm-6 col-xs-12 d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={chefImage === null ? UserImage : chefImage}
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
          <div className="col-md-9 col-sm-6 col-xs-12">
            <div className="user-card-info d-flex mx-3 align-items-center">
              <div className="info-x">
                <h5 className="mb-0">
                  {chefDetail?.firstName} {chefDetail?.lastName}
                </h5>
                <p>{chefDetail?.email}</p>
                <p>{chefDetail?.phone}</p>
                <br />
                <p>Join {moment(chefDetail.createdAt).format('Qo MMM YYYY')}</p>
                {/* <label>Available On:</label>  */}
                {console.log(cookTime)}
                  <div className="col-md-9 col-sm-6 col-xs-12">
<p>{cook.isWeekdays === true? "Monday - Friday":""}</p>
{/* <p></p> */}
                </div>
                <div className="col-xs-12">
<p>{cook.isWeekends === true? "Saturday - Sunday":""}</p>
<p></p>
              </div>
                
              </div>
            </div>
          </div>
          {/* {cook.map((days) => console.log(days.isWeekdays))}
          {console.log(cook)}
          {console.log(cook.isWeekdays)}
          <div className="col-md-3 col-sm-6 col-xs-12 d-flex align-items-center justify-content-center">

                    </div>
          <div className="col-md-9 col-sm-6 col-xs-12 d-flex align-items-center justify-content-center">
            <div className="user-card-info d-flex mx-3 align-items-center">
              <div className="info-x">
                <h5 className="mb-0">
                  {chefDetail?.firstName} {chefDetail?.lastName}
                </h5>
                <p>{chefDetail?.email}</p>
                <p>{chefDetail?.phone}</p>
                <br />
                
            </div>
          </div>
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default ItemChefCard;
