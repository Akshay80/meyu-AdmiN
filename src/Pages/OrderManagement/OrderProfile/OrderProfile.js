import React from "react";
import { Form, Row } from "react-bootstrap";
import "./OrderProfile.scss";
import { ReactComponent as OrderIcon } from "../../../Assets/Icon/order.svg";

import "../../../Components/Common/Buttons/buttons.scss";

const OrderProfile = () => {
  return (
    <>
       <div className="main-heading d-flex align-items-center p-3 py-5">
        <OrderIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">Order Management</h3>
      </div>
    <div className="card">
    <div className="order-profile-container">
      <div className="profile-pic-wrapper">
        <div className="pic-holder">
          <img
            id="profilePic"
            className="pic"
            alt=""
            src="https://source.unsplash.com/random/120x120"
          />
        </div>
      </div>
      <Form className="profile-form mt-3">
        <Row className="mb-3">
          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridName"
          >
            <Form.Label className="mb-0">Chef Name</Form.Label>
            <Form.Control type="name" placeholder="Chef Name" />
          </Form.Group>
          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridID"
          >
            <Form.Label className="mb-0">Order ID</Form.Label>
            <Form.Control type="text" placeholder="Order ID" />
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridProductName"
          >
            <Form.Label className="mb-0">Product Name</Form.Label>
            <Form.Control type="text" placeholder="Product Name" />
          </Form.Group>
          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridAmount"
          >
            <Form.Label className="mb-0">Total Amount</Form.Label>
            <Form.Control type="text" placeholder="Total Amount" />
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridCategory"
          >
            <Form.Label className="mb-0">Category</Form.Label>
            <Form.Control placeholder="Category" />
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridSubCategory"
          >
            <Form.Label className="mb-0">Sub Category</Form.Label>
            <Form.Control placeholder="Sub Category" />
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridTags"
          >
            <Form.Label className="mb-0">Tags</Form.Label>
            <Form.Control placeholder="Tags" />
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridDelivery"
          >
            <Form.Label className="mb-0">Delivery Type</Form.Label>
            <Form.Control placeholder="Pickup" />
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridDate"
          >
            <Form.Label className="mb-0">Order Placed</Form.Label>
            <Form.Control placeholder="Order Date" />
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridStatus"
          >
            <Form.Label className="mb-0">Order Status</Form.Label>
            <Form.Control placeholder="Delivered" />
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridAddress"
          >
            <Form.Label className="mb-0">Pickup Address</Form.Label>
            <Form.Control placeholder="Address" />
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridDate"
          >
            <Form.Label className="mb-0">Delivered Date</Form.Label>
            <Form.Control placeholder="Delivered Date" />
          </Form.Group>

          <div className="d-flex flex-column w-100 flex-direction-column pb-5 mt-2 align-items-start">
            <h5>Description</h5>
            {/* <textarea className="text-area w-100"></textarea> */}
              <textarea rows="4"
                className="text-area mx-1 form-control w-100 h-100"
                placeholder="About Product"
                id="floatingTextarea2"
              ></textarea>
          </div>
        </Row>
      </Form>
    </div>
    </div>
    </>
  );
};

export default OrderProfile;
