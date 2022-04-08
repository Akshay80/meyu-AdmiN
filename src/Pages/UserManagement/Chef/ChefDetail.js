import React, { useState, useEffect } from "react";
import ChefCard from "../../../Components/Common/Cards/PrimaryCard/ChefDetailCard/Card";
import { ReactComponent as ChefIcon } from "../../../Assets/Icon/Chef.svg";
import { getchefDetails , getchefDetail} from "../../../Services/chefServices";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.min.css";

const ChefDetail = ({ menuToggleState }) => {
  const [chefDetail, setChefDetail] = useState({});
  const [chefPic, setChefPic] = useState("");
  const [chefRecipe, setChefRecipe] = useState("");
  const [isVerfied, setIsVerfied] = useState();
  const { chefId } = useParams();
  const [cookingTime, setCookingTime] = useState("");
  const [chefID, setchefID] = useState();
  const [totalCompleteOrders, setTotalCompletedOrder] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tableData, setTableData] = useState();

  useEffect(() => {
    fetchchefID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchchefID = () => {
    getchefDetail(chefId).then((response) => {
      fetchChefDetail(response.data.data.chefProfile.createdBy);
      setChefRecipe(response.data.data.recipes);
      // setchefID(response.data.data.chefProfile.createdBy);
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  const fetchChefDetail = async(CID) => {
    await getchefDetails(CID)
      .then((response) => {
        setTableData(response.data.data.convertedOrderDetailsJSON)
        setTotalCompletedOrder(response.data.data.totalCompleteOrders)
        setTotalAmount(response.data.data.totalAmount[0].totalAmount)
        setchefID(response.data.data.profile.createdBy)
        setChefDetail(response?.data?.data?.profile);
        
        
        setChefPic(
          `http://13.213.151.153:8081/${response?.data?.data?.profile.profileUrl}`
        );
        // setIsVerfied(response.data.data.chefProfile?.isVerified);
        // response.data.data.chefProfile.CookAvailability.Days.map((items) => setCookingTime(items));
      })
      .catch(function (error) {});
  };

  return (
    <div>
      <div className="page-heading d-flex align-items-center justify-content-between p-4">
        <div className="page-heading-wapper align-items-center d-flex">
          <ChefIcon className="page-icon m-0" />
          <div className="d-block">
            <h3 className="page-sec-heading m-0 mx-2">Chef-Details </h3>
          </div>
        </div>
        <h6 className="pt-3">
          Chef ID : <b>{chefID}</b>
        </h6>
      </div>
      <ChefCard
        chefPic={chefPic}
        chefDetail={chefDetail}
        chefRecipe={chefRecipe}
        chefId={chefId}
        isVerfied={isVerfied}
        cookingTime={cookingTime}
        createdBy={chefDetail.createdBy}
        totalCompleteOrders={totalCompleteOrders}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default ChefDetail;
