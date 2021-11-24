import React from "react";
import { Form, Row, Button } from "react-bootstrap";
import { Input } from "reactstrap";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";
import "./UserProfile.scss";
import "../Buttons/buttons.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const UserProfile = () => {
  const profileValidation = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    contact: Yup.string().required("Contact is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    zip: Yup.string().required("Zip is required"),
  });

  const formOptions = { resolver: yupResolver(profileValidation) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    return false;
  }

  return (
    <div className="user-profile-container">
      <div className="page-heading d-flex align-items-center">
        <UserIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h2 className="m-1">Edit Profile </h2>
      </div>
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
      <Form onSubmit={handleSubmit(onSubmit)} className="profile-form">
        <Row className="mb-3">
          <Form.Group className="col-md-6 col-sm-12" controlId="formGridName">
            <Form.Label className="mb-0">First Name</Form.Label>
            <Form.Control
              {...register("firstName")}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              type="name"
              placeholder="Enter First Name"
            />
            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </Form.Group>
          <Form.Group className="col-md-6 col-sm-12" controlId="formGridName">
            <Form.Label className="mb-0">Last Name</Form.Label>
            <Form.Control
              {...register("lastName")}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              type="name"
              placeholder="Enter Last Name"
            />
            <div className="invalid-feedback pb-0">
              {errors.lastName?.message}
            </div>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Label className="mb-0">Email</Form.Label>
            <Form.Control
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              type="email"
              placeholder="Enter email"
            />
            <div className="invalid-feedback pb-0">{errors.email?.message}</div>
          </Form.Group>
          <Form.Group controlId="formGridPhone">
            <Form.Label className="mb-0">Contact Number</Form.Label>
            <Form.Control
              {...register("contact")}
              className={`form-control ${errors.contact ? "is-invalid" : ""}`}
              type="number"
              placeholder="Enter Contact Number"
            />
            <div className="invalid-feedback">{errors.contact?.message}</div>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label className="mb-0">Address</Form.Label>
          <Form.Control
            {...register("address")}
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            placeholder="Address"
          />
          <div className="invalid-feedback pb-0">{errors.address?.message}</div>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridCountry"
          >
            <Form.Label className="mb-0">Country</Form.Label>
            <Form.Select
              {...register("country")}
              className={`form-select ${errors.country ? "is-invalid" : ""}`}
              defaultValue="Choose..."
            >
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
            <div className="invalid-feedback">{errors.country?.message}</div>
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridState"
          >
            <Form.Label className="mb-0">State</Form.Label>
            <Form.Select
              {...register("state")}
              className={`form-select ${errors.state ? "is-invalid" : ""}`}
              defaultValue="Choose..."
            >
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
            <div className="invalid-feedback">{errors.state?.message}</div>
          </Form.Group>

          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12 mb-3"
            controlId="formGridCity"
          >
            <Form.Label className="mb-0">City</Form.Label>
            <Form.Control
              {...register("city")}
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              placeholder="Singapore"
            />
            <div className="invalid-feedback">{errors.city?.message}</div>
          </Form.Group>
          <Form.Group
            className="col-md-6 col-sm-6 col-xs-12"
            controlId="formGridZip"
          >
            <Form.Label className="mb-0">Zip</Form.Label>
            <Form.Control
              {...register("zip")}
              className={`form-control ${errors.zip ? "is-invalid" : ""}`}
              placeholder="238282"
            />
            <div className="invalid-feedback">{errors.zip?.message}</div>
          </Form.Group>
        </Row>
        <div className="d-flex pb-5 align-items-center justify-content-center flex-wrap-wrap">
          <Button className="m-2 btn-primary" variant="primary" type="submit">
            Update
          </Button>
          <Button
            onClick={() => reset()}
            className="m-2"
            variant="danger"
            type="submit"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UserProfile;
