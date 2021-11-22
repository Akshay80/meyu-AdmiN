import React from "react";
import { Form, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import "../../../Components/Common/Buttons/buttons.scss";

const ItemDetails = () => {
  return (
    <div className="pb-5">
      <div className="profile-pic-wrapper">
        <div className="pic-holder">
          <img
            id="profilePic"
            className="pic"
            alt=""
            src="https://source.unsplash.com/random/150x150"
          />

          <label htmlFor="newProfilePhoto" className="upload-file-block">
            <div className="text-center">
              <div className="mb-2">
                <i className="fa fa-camera fa-2x"></i>
              </div>
              <div className="text-uppercase">
               Change Image
              </div>
            </div>
          </label>
          <Input
            className="uploadProfileInput d-none"
            type="file"
            name="profile_pic"
            id="newProfilePhoto"
            accept="image/*"
          />
        </div>
      </div>

      <Form className="profile-form mt-3">
        <Row className="mb-3">
          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridName"
          >
            <Form.Label className="mb-0">Status</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Approved...</option>
              <option>Pending...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridID"
          >
            <Form.Label className="mb-0">Product ID</Form.Label>
            <Form.Control type="text" placeholder="Product ID" />
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
            <Form.Label className="mb-0">Amount</Form.Label>
            <Form.Control type="text" placeholder="Amount" />
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
            <Form.Label className="mb-0">Preparation Time</Form.Label>
            <Form.Control placeholder="30 min" />
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridDate"
          >
            <Form.Label className="mb-0">Price</Form.Label>
            <Form.Control placeholder="Price" />
          </Form.Group>

          <div className="d-flex flex-column w-100 flex-direction-column pb-2 mt-2 align-items-start">
            <h5>Description</h5>
            <textarea
              rows="4"
              className="text-area mx-1 form-control w-100 h-100"
              placeholder="About Product"
              id="floatingTextarea2"
            ></textarea>
          </div>
        </Row>
      </Form>
      <div  className="d-flex align-items-center justify-content-center">

      <button className="btn btn-success w-25">Save
      </button>
      </div>
    </div>
  );
};

export default ItemDetails;
