import React, {useEffect, useState} from "react";
import CustomerCard from "../../../Components/Common/Cards/PrimaryCard/CustomerDetailCard/Card";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";
import { ReactComponent as OrderIcon } from "../../../Assets/Icon/order.svg";
import axiosConfig from '../../../Components/Common/APIConfig/axiosConfig'
import OrderDetailCard from "../../../Components/Common/Cards/OrderDetailCard/OrderDetailCard";

const CustomerDetail = () => {
  const [customer, setCustomer] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [url, setURL] = useState();

  const id = localStorage.getItem('ids')
  const custId = localStorage.getItem('custId')
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
          <UserIcon className="page-icon m-0" />
          <div className="d-block">
            <h3 className="page-sec-heading m-0 ms-2">Customer-Details </h3>
          </div>
        </div>
        <h6>
          Customer ID <b>{custId}</b>
        </h6>
      </div>
      <div>
        <CustomerCard setName={name} setEmail={email} setPhone={phone} setURL={url}/>
      </div>
      <div className="pb-3">
      <div className="page-heading d-flex align-items-center p-4  ">
      <div className="page-heading-wapper d-flex">
        <OrderIcon
          className="page-icon m-0"
        />
        <h3 className="page-sec-heading m-0 mx-2">Order Details</h3>
      </div>
      </div>
        <OrderDetailCard />
      </div>
    </div>
  );
};

export default CustomerDetail;
