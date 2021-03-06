import React, { useState, useEffect } from "react";
import ChefCard from "../../../Components/Common/Cards/PrimaryCard/ChefDetailCard/Card";
import { ReactComponent as ChefIcon } from "../../../Assets/Icon/Chef.svg";
import { getchefDetails } from "../../../Services/chefServices";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.min.css";

const ChefDetail = ({ menuToggleState }) => {
  const [chefDetail, setChefDetail] = useState({});
  const [chefPic, setChefPic] = useState("");
  const [chefRecipe, setChefRecipe] = useState("");
  const { chefId } = useParams();

  useEffect(() => {
    fetchChefDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchChefDetail = () => {
    getchefDetails(chefId)
      .then((response) => {
        setChefDetail(response?.data?.data?.chefProfile);
        setChefRecipe(response.data.data.recipes);
        setChefPic(
          `http://52.77.236.78:8082/${response?.data?.data?.chefProfile?.profileUrl}`
        );
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
          Chef ID : <b>{chefDetail?.createdBy}</b>
        </h6>
      </div>
      <ChefCard
        chefPic={chefPic}
        chefDetail={chefDetail}
        chefRecipe={chefRecipe}
        chefId={chefId}
      />
    </div>
  );
};

export default ChefDetail;
