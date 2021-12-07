import React, {useState, useEffect} from "react";
import ChefCard from "../../../Components/Common/Cards/PrimaryCard/ChefDetailCard/Card";
import { ReactComponent as ChefIcon } from "../../../Assets/Icon/Chef.svg";
import axiosConfig from '../../../Components/Common/APIConfig/axiosConfig'

const ChefDetail = ({ menuToggleState }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [url, setURL] = useState();

  const id = localStorage.getItem('ids1')
  useEffect(() => {
    axiosConfig
    .get(`admin/getuserdetails/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response) => {
      //  setCustomer(response.data.data);
      console.log(response.data.data)
      //  setID(response.data.data.createdBy);
       setName(response.data.data.fullName);
       setEmail(response.data.data.email);
       setPhone(response.data.data.phone);
       setURL(response.data.data.coverPhotoUrl);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])
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
      <ChefCard setName={name} setEmail={email} setPhone={phone} setURL={url} />
    </div>
  );
};

export default ChefDetail;
