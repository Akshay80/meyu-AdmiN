import React, { useState, useEffect } from "react";
import ChefCard from "../../../Components/Common/Cards/PrimaryCard/ChefDetailCard/Card";
import { ReactComponent as ChefIcon } from "../../../Assets/Icon/Chef.svg";
import { getchefDetails } from "../../../Services/chefServices";
import { useParams } from "react-router";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const ChefDetail = ({ menuToggleState }) => {
  const [chefDetail, setChefDetail] = useState({});
  const { chefId } = useParams();
  const [apiState, setApiState] = useState(false);
  const [chefImage, setChefImage] = useState("");

  useEffect(() => {
    fetchChefDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchChefDetail = () => {
    getchefDetails(chefId)
      .then((response) => {
        setChefDetail(response?.data?.data?.chefProfile);
        setChefImage(
          `http://52.77.236.78:8081/${response?.data?.data?.chefProfile?.profileUrl}`
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
        <h6>
          Chef ID : <b>{chefDetail?.createdBy}</b>
        </h6>
      </div>
      <ChefCard chefDetail={chefDetail} chefImage={chefImage} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </div>
  );
};

export default ChefDetail;
