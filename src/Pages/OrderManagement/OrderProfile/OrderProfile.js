import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import "./OrderProfile.scss";
import { ReactComponent as OrderIcon } from "../../../Assets/Icon/order.svg";
import { useParams } from "react-router-dom";
import "../../../Components/Common/Buttons/buttons.scss";
import { getOrdersByID, getAllOrders } from "../../../Services/orderService";
import moment from "moment";

const OrderProfile = () => {
  const { orderId } = useParams();
  const [chefName, setChefName] = useState();
  const [chefNumber, setChefNumber] = useState();
  const [recipeName, setRecipeName] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [orderPlaced, setOrderPlaced] = useState();
  const [orderState, setOrderState] = useState();
  const [address, setAddress] = useState();
  const [delDate, setDelieveryDate] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  // Customer States
  const [Cname, setCName] = useState();
  const [Cemail, setCEmail] = useState();
  const [Cstreet, setCStreet] = useState();
  const [Ccity, setCCity] = useState();
  const [Czip, setCZip] = useState();
  const [Cphone, setCPhone] = useState();
  const [Cphoto, setCphoto] = useState();
  const [CID, setCID] = useState();
  const [Cfloor, setCFloor] = useState();

  // Payment States
  const [nonce, setNonce] = useState();
  const [amount, setAmount] = useState();
  const [status, setStatus] = useState();
  const [paymentTypes, setPaymentType] = useState();
  // const [transaction, setTransaction] = useState();
  const [PaymentID, setPaymentID] = useState();
  const [PaymentStatus, setPaymentStatus] = useState();
  const [RefundAmount, setRefundAmount] = useState();

  const url = "http://13.213.151.153:8083/";

  useEffect(() => {
    ordersByID();
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ordersByID = async () => {
    await getOrdersByID(orderId)
      .then((response) => {
        console.log(response.data.data);
        // CUSTOMER DETAILS
        setCID(response.data.data.customerDetails.createdBy);
        setCPhone(response.data.data.customerDetails.phone);
        setCphoto(url + response.data.data.customerDetails.profileUrl);
        setCName(
          response.data.data.customerDetails.firstName +
            " " +
            response.data.data.customerDetails.lastName
        );
        setCEmail(response.data.data.customerDetails.email);
        setCStreet(response.data.data.customerAddress.street);
        setCCity(response.data.data.customerAddress.city);
        setCZip(response.data.data.customerAddress.zipCode);
        setCStreet(response.data.data.customerAddress.street);
        setCFloor(response.data.data.customerAddress.floorUnitNumber);

        //  ORDER DETAILS
        response.data.data.orderDetail.OrderItems.map((item) =>
          item.Recipe.MediaObjects.map((element) => setImage(element.imageUrl))
        );
        setDelieveryDate(response.data.data.paymentDetails.createdAt);
        setChefName(
          response.data.data.cookDetails.firstName +
            " " +
            response.data.data.cookDetails.lastName
        );
        setChefNumber(response.data.data.cookDetails.phone);
        response.data.data.orderDetail.OrderItems.map((item) =>
          setRecipeName(item.Recipe.dishName)
        );
        response.data.data.orderDetail.OrderItems.map((item) =>
          setDescription(item.Recipe.description)
        );
        response.data.data.orderDetail.OrderItems.map((item) =>
          setOrderPlaced(item.Recipe.createdAt)
        );
        setOrderState(response.data.data.orderDetail.orderState);
        setAddress(response.data.data.customerAddress.street);
        setTotalAmount(response.data.data.orderDetail.totalAmount);

        //  PAYMENT DETAILS
        setNonce(response.data.data.paymentDetails.nonce);
        setAmount(response.data.data.paymentDetails.amount);
        setStatus(response.data.data.paymentDetails.status);
        setPaymentType(response.data.data.paymentDetails.paymentType);
        setPaymentID(response.data.data.paymentDetails.paymentId);
        setPaymentStatus(response.data.data.paymentDetails.paymentStatus);
        setRefundAmount(response.data.data.paymentDetails.refunded_amount)
        // setTransaction(response.data.data.paymentDetails.transactionId);
      })
      .catch(function (error) {});
  };

  return (
    <>
      <div className="page-heading d-flex align-items-center p-4 ">
        <div className="page-heading-wapper d-flex">
          <OrderIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Order Management</h3>
        </div>
      </div>
      <div className="card m-3 mt-0">
        <div className="order-profile-container">
          <div className="profile-pic-wrapper pb-3">
            <div className="pic-holder">
              <img
                id="profilePic"
                className="profile-pic"
                alt=""
                src={`http://13.213.151.153:8083/${image}`}
              />
            </div>
          </div>
          <Form className="profile-form mt-3">
            <Row className="mb-3">
              <Form.Label>
                <h3 className="fw-500 mb-4 text-decoration-underline">
                  Order Details
                </h3>
              </Form.Label>
              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridName"
              >
                <Form.Label className="mb-0">Chef Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Chef Name"
                  value={chefName}
                />
              </Form.Group>
              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridID"
              >
                  <Form.Label className="mb-0">Chef Number</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Chef Name"
                  value={chefNumber}
                />
              </Form.Group>
              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridID"
              >

                <Form.Label className="mb-0">Order ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Order ID"
                  value={orderId}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridProductName"
              >
                <Form.Label className="mb-0">Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  value={recipeName}
                />
              </Form.Group>
              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Total Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={`$${totalAmount}`}
                />
              </Form.Group>

              {/* <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridTags"
              >
                <Form.Label className="mb-0">Tags</Form.Label>
                <Form.Control placeholder="Tags" />
              </Form.Group> */}

              {/* <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridDelivery"
              >
                <Form.Label className="mb-0">Delivery Type</Form.Label>
                <Form.Control placeholder="Pickup" />
              </Form.Group> */}

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridDate"
              >
                <Form.Label className="mb-0">Order Placed at</Form.Label>
                <Form.Control
                  placeholder="Order Date"
                  value={moment(orderPlaced).format("LLL")}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridStatus"
              >
                <Form.Label className="mb-0">Order Status</Form.Label>
                <Form.Control placeholder="Delivered" value={orderState} />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAddress"
              >
                <Form.Label className="mb-0">Pickup Address</Form.Label>
                <Form.Control placeholder="Address" value={address} />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridDate"
              >
                <Form.Label className="mb-0">Delivery Date</Form.Label>
                <Form.Control
                  placeholder="Delivered Date"
                  value={moment(delDate).format("LLL")}
                />
              </Form.Group>

              <div className="d-flex flex-column w-100 flex-direction-column pb-5 align-items-start">
                <label>Description</label>
                {/* <textarea className="text-area w-100"></textarea> */}
                <textarea
                  rows="4"
                  className="text-area mx-1 form-control w-100 h-100"
                  placeholder="About Product"
                  id="floatingTextarea2"
                  value={description}
                ></textarea>
              </div>

              <Form.Label>
                <h3 className="fw-500 mb-4 text-decoration-underline">
                  Customer Details
                </h3>
              </Form.Label>
              <div className="order-profile-container">
                <div className="profile-pic-wrapper">
                  <div className="pic-holder">
                    <img
                      id="profilePic"
                      className="profile-pics rounded-circle shadow-4"
                      alt=""
                      src={Cphoto}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                </div>
              </div>
              {/* <img src={Cphoto} style={{borderRadius: "50%", width: 150}}/> */}

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Customer ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={CID}
                />
              </Form.Group>
              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={Cname}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={Cemail}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={Cphone}
                />
              </Form.Group>
              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Street</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={Cstreet}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={Ccity}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Zipcode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={Czip}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Floor Unit Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={Cfloor}
                />
              </Form.Group>

              <Form.Label>
                <h3 className="fw-500 mb-4 text-decoration-underline mt-4">
                  Payment Details
                </h3>
              </Form.Label>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Message</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={nonce === null ? "N/A" : nonce}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={`$${amount}`}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Payment Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={status}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Payment Mode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={paymentTypes}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Payment ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Amount"
                  value={PaymentID === null ? "N/A": PaymentID}
                />
              </Form.Group>

              <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Payment State</Form.Label>
                <Form.Control
                  type="text"
                  value={PaymentStatus}
                />
              </Form.Group>

              {RefundAmount && <Form.Group
                className="col-md-6 col-sm-6 col-xs-12 mb-3"
                controlId="formGridAmount"
              >
                <Form.Label className="mb-0">Refund Amount</Form.Label>
                <Form.Control
                  type="text"
                  value={RefundAmount}
                />
              </Form.Group>
}
              
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default OrderProfile;
