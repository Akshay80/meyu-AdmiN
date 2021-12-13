import React, { useState, useEffect } from "react";
import ChefCard from "../../../Components/Common/Cards/PrimaryCard/ChefDetailCard/Card";
import { ReactComponent as ChefIcon } from "../../../Assets/Icon/Chef.svg";
import {
  confirmChefAccount,
  getchefDetails,
} from "../../../Services/chefServices";
import { useParams } from "react-router";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const ChefDetail = ({ menuToggleState }) => {
  const [chefDetail, setchefDetail] = useState({});
  const [status, setStatus] = useState('');
  const {chefId} = useParams();

  useEffect(() => {
    fetchChefDetail();
  }, []);

  const fetchChefDetail = () => {
    getchefDetails(chefId)
      .then((response) => {
        setchefDetail(response?.data?.data?.chefProfile);
        console.log("chef details", response?.data?.data?.chefProfile);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changeStatus = (data) => {
    console.log("data", data);
    let params = {
      isVerified: "true",
    };
    confirmChefAccount(params)
      .then((data) => {
        console.log("confirm chef account", data.statusText);
        if (data.statusText === "OK") {
          setStatus(data.statusText);
          console.log(data.data.data.message)
          toast.success(data.data.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          fetchChefDetail();
        }
      })
      .catch((error) => {
        console.log("errrorrr chef", error);
      });
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
      <ChefCard changeStatus={changeStatus} status={status} chefDetail={chefDetail}/>
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
