import React from "react";
import { Form, Row, Button } from "react-bootstrap";
import { Input } from "reactstrap";
import {ReactComponent as UserIcon} from '../../../Assets/Icon/user.svg'
import "./UserProfile.scss";
import '../Buttons/buttons.scss'
// import './imagecontrol';

const UserProfile = () => {
  return (
    <div className="user-profile-container">
       <div className="page-heading d-flex align-items-center">
        <UserIcon style={{height: "36px", width:"36px", marginRight: "10px"}} />
          <h2 className="m-1">
         Edit Profile </h2>
      </div>
      <div className="profile-pic-wrapper">
        <div className="pic-holder">
          <img
            id="profilePic"
            className="pic"
            alt=""
            src="https://source.unsplash.com/random/150x150"/>

          <label htmlFor="newProfilePhoto" className="upload-file-block">
            <div className="text-center">
              <div className="mb-2">
                <i className="fa fa-camera fa-2x"></i>
              </div>
              <div className="text-uppercase">
                Update <br /> Profile Photo
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
      <Form className="profile-form">
        <Row className="mb-3">
          <Form.Group className="col-md-6 col-sm-12 mb-3" controlId="formGridName">
            <Form.Label className="mb-0">First Name</Form.Label>
            <Form.Control type="name" placeholder="Enter First Name" />
          </Form.Group>
          <Form.Group className="col-md-6 col-sm-12" controlId="formGridName">
            <Form.Label className="mb-0">Last Name</Form.Label>
            <Form.Control type="name" placeholder="Enter Last Name" />
          </Form.Group>
        </Row>  

        <Row className="mb-3">
          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Label className="mb-0">Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formGridPhone">
            <Form.Label className="mb-0">Contact Number</Form.Label>
            <Form.Control type="number" placeholder="Enter Contact Number" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label className="mb-0">Address</Form.Label>
          <Form.Control placeholder="Address" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group className="col-md-6 col-sm-6 col-xs-12 mb-3" controlId="formGridCountry">
            <Form.Label className="mb-0">Country</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-md-6 col-sm-6 col-xs-12 mb-3" controlId="formGridState">
            <Form.Label className="mb-0">State</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-md-6 col-sm-6 col-xs-12 mb-3" controlId="formGridCity">
            <Form.Label className="mb-0">City</Form.Label>
            <Form.Control placeholder="Singapore" />
          </Form.Group>
          <Form.Group  className="col-md-6 col-sm-6 col-xs-12" controlId="formGridZip">
            <Form.Label className="mb-0" >Zip</Form.Label>
            <Form.Control placeholder="238282" />
          </Form.Group>
        </Row>
        <div className="d-flex pb-5 align-items-center justify-content-center flex-wrap-wrap">
          <Button className="m-2 btn-primary" variant="primary" type="submit">
            Update
          </Button>
          <Button className="m-2" variant="danger" type="submit">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UserProfile;
