import React, {useState, useEffect} from "react";
import ChefCard from "../../../Components/Common/Cards/PrimaryCard/ChefDetailCard/Card";
import { ReactComponent as ChefIcon } from "../../../Assets/Icon/Chef.svg";
import { confirmChefAccount, getchefDetails } from "../../../Services/chefServices";
// import axiosConfig from '../../../Components/Common/APIConfig/axiosConfig'

const ChefDetail = ({ menuToggleState }) => {
  // const [name, setName] = useState();
  // const [email, setEmail] = useState();
  // const [phone, setPhone] = useState();
  // const [url, setURL] = useState();
  // const [status, setStatus] = useState();
  const [chefDetail, setchefDetail] = useState({});

  // const id = localStorage.getItem('ids1')
  useEffect(() => {
    fetchChefDetail();
  }, []);

  const fetchChefDetail = () => {
    // axiosConfig
    // .get(`admin/getuserdetails/${id}`, {  
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // })
    getchefDetails()
    .then((response) => {
      setchefDetail(response);
      console.log("chef details", response);
      //  setID(response.data.data.createdBy);
      //  setName(response.data.data.fullName);
      //  setEmail(response.data.data.email);
      //  setPhone(response.data.data.phone);
      //  setStatus(response.data.data.status);
      //  setURL(response.data.data.profileUrl);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const changeStatus = (data) => {
    // alert("clicked");
    console.log("data", data);
    let params = {
      isVerified: "true",
    };
    confirmChefAccount(params)
      .then((data) => {
        console.log("confirm chef account", data);
        if (data.data.success === "true") {
          // setApproved(approved)
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
          Chef ID <b>#543210</b>
        </h6>
      </div>
      {/* <ChefCard changeStatus={changeStatus} setName={name} setEmail={email} setPhone={phone} setURL={url} setStatus={status} /> */}
      <ChefCard changeStatus={changeStatus} chefDetail={chefDetail} />
    </div>
  );
};

export default ChefDetail;
