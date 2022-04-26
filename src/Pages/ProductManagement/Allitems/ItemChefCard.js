import React, { useEffect, useState } from "react";
import "../../../Components/Common/Cards/PrimaryCard/ChefDetailCard/Card.scss";
import UserImage from "../../../Assets/Images/blank-user.png";
import { getItemsbyId } from "../../../Services/itemsService";
import { useParams } from "react-router-dom";
import moment from "moment";

const ItemChefCard = () => {
  
   const [chef, setChef] = useState([]);
   const [chefImage, setChefImage] = useState(null);
   const [weekDay, setCookWeekDays] = useState(false);
   const [weekEnd, setCookWeekEnds] = useState(false);

   const {itemId} = useParams();
   
  useEffect(() => {
    fetchItemDetail()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchItemDetail = () => {
    getItemsbyId(itemId)
      .then((response) => {
      setChef(response.data.data.profile);
      response.data.data.profile.CookAvailability.Days.map((weeks) => setCookWeekDays(weeks.isWeeekdays));
      response.data.data.profile.CookAvailability.Days.map((weeks) => setCookWeekEnds(weeks.isWeekends));
      setChefImage(
        `http://13.213.151.153:8083/${response?.data?.data?.profile?.profileUrl}`
      );
      })
      .catch(function (error) {});
  };
 
  // console.log("profile: ", chef);
  return (
    <div className="container">
      <div className="card mb-3 p-3">
        <div className="row g-0">
          <div className="col-md-3 col-sm-6 col-xs-12 d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={chefImage === `http://13.213.151.153:8083/null` || chefImage === null ? UserImage : chefImage}
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
                  {chef?.firstName} {chef?.lastName}
                </h5>
                <p>{chef?.email}</p>
                <p>{chef?.phone}</p>
                <br />
                <p>Joined at {moment(chef.createdAt).format("MMMM Do YYYY")}</p>
                <p>{weekDay === true? "Monday - Friday": ""}</p>
                  <p>{weekEnd === true? "Saturday - Sunday": ""}</p>
               
                {/* <label>Available On:</label>  */}
              </div>
            </div>
          </div>
          {/* {console.log(cookTime.Days.map((days) => days.isWeekdays))} */}
          {/* {cookTime.map((days) => console.log(days.isWeekdays))} */}
          <div className="col-md-3 col-sm-6 col-xs-12 d-flex align-items-center justify-content-center">

                    </div>
          {/* <div className="col-md-9 col-sm-6 col-xs-12 d-flex align-items-center justify-content-center">
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
