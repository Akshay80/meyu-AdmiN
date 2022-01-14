import React, { useEffect, useState } from "react";
import CustomerCard from "../../../Components/Common/Cards/PrimaryCard/CustomerDetailCard/Card";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";
import { ReactComponent as OrderIcon } from "../../../Assets/Icon/order.svg";
import OrderDetailCard from "../../../Components/Common/Cards/OrderDetailCard/OrderDetailCard";
import { getCustomerDetails } from "../../../Services/customerServices";
import { useParams } from "react-router-dom";

const CustomerDetail = () => {
  const [customerDetail, setCustomerDetail] = useState({});
  const [customerImage, setCustomerImage] = useState("");
  const { customerId } = useParams();

  useEffect(() => {
    fetchCustomerDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomerDetail = () => {
    getCustomerDetails(customerId)
      .then((response) => {
        setCustomerDetail(response?.data?.data);
        setCustomerImage(
          `http://52.77.236.78:8081/${response.data.data.profileUrl}`
        );
      })
      .catch(function (error) {});
  };

  return (
    <div>
      <div className="page-heading d-flex align-items-center justify-content-between p-4">
        <div className="page-heading-wapper align-items-center d-flex">
          <UserIcon className="page-icon m-0" />
          <div className="d-block">
            <h3 className="page-sec-heading m-0 ms-2">Customer-Details </h3>
          </div>
        </div>
        <h6 className="pt-3">
          Customer ID <b>{customerDetail?.id}</b>
        </h6>
      </div>
      <div>
        <CustomerCard
          customerDetail={customerDetail}
          customerImage={customerImage}
        />
      </div>
      <div className="pb-3">
        <div className="page-heading d-flex align-items-center p-4  ">
          <div className="page-heading-wapper d-flex">
            <OrderIcon className="page-icon m-0" />
            <h3 className="page-sec-heading m-0 mx-2">Order Details</h3>
          </div>
        </div>
        <OrderDetailCard />
      </div>
    </div>
  );
};

export default CustomerDetail;
