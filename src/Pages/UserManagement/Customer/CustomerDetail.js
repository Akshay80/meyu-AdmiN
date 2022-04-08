import React, { useEffect, useState } from "react";
import CustomerCard from "../../../Components/Common/Cards/PrimaryCard/CustomerDetailCard/Card";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";
import { ReactComponent as OrderIcon } from "../../../Assets/Icon/order.svg";
// import OrderDetailCard from "../../../Components/Common/Cards/OrderDetailCard/OrderDetailCard";
import { getCustomerDetails, getCustomerDetail } from "../../../Services/customerServices";
import { useParams } from "react-router-dom";
import CustomerOrderTable from "../../../Components/Common/Table/CustomerOrderTable/CustomerOrderTable";

const CustomerDetail = () => {
  const [customerDetail, setCustomerDetail] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [customerImage, setCustomerImage] = useState("");
  const [customerVerify, setcustomerVerify] = useState();
  const [customerReject, setcustomerReject] = useState();
  const [totalCompleteOrders, setTotalCompletedOrder] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { customerId } = useParams();

  useEffect(() => {
    fetchcustomerID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchcustomerID = () => {
    getCustomerDetail(customerId).then((response) => {
      fetchCustomerDetail(response.data.data.createdBy);
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const fetchCustomerDetail = (customerID) => {
    getCustomerDetails(customerID)
      .then((response) => {
        console.log(response.data.data)
        setCustomerDetail(response?.data?.data?.profile);
        setTotalCompletedOrder(response.data.data.totalCompleteOrders)
        setTotalAmount(response.data.data.totalAmount[0].totalAmount)
        // setCustomerName(response?.data?.data?.fullName);
        // setcustomerVerify(response?.data?.data?.isVerified);
        // setcustomerReject(response?.data?.data?.isRejected);
        setCustomerImage(
          `http://13.213.151.153:8081/${response.data.data.profile.profileUrl}`
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
          Customer ID <b>{customerDetail?.createdBy}</b>
        </h6>
      </div>
      <div>
        <CustomerCard
          customerDetail={customerDetail}
          customerImage={customerImage}
          customerId={customerId}
          customerName={customerName}
          customerVerify={customerVerify}
          customerReject={customerReject}
          totalCompleteOrders={totalCompleteOrders}
        totalAmount={totalAmount}
        />
      </div>
      <div className="pb-3">
        <div className="page-heading d-flex align-items-center p-4  ">
          <div className="page-heading-wapper d-flex">
            <OrderIcon className="page-icon m-0" />
            <h3 className="page-sec-heading m-0 mx-2">Order Details</h3>
          </div>
        </div>
        <div className="card">
        <CustomerOrderTable />
        </div>
        {/* <OrderDetailCard /> */}
      </div>
    </div>
  );
};

export default CustomerDetail;
