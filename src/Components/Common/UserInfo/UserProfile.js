import React from "react";
import { Input } from "reactstrap";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";
import "./UserProfile.scss";
import "../Buttons/buttons.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const UserProfile = () => {
  const profileValidation = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .matches(/^[A-Za-z]+$/i, "Invalid Firstname"),
    lastName: Yup.string()
      .required("Last name is required")
      .matches(/^[A-Za-z]+$/i, "Invalid Lastname"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    contact: Yup.string()
      .required("Contact is required")
      .matches(/^[0-9]*$/, "Invalid Contact"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string()
      .required("City is required")
      .matches(/^[A-Za-z]+$/i, "Invalid City"),
    zip: Yup.string()
      .required("Zip is required")
      .matches(/^[0-9]*$/, "Invalid Zipcode"),
  });

  const formOptions = { resolver: yupResolver(profileValidation) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    // return false;
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
        <div className="profile-pic-holder">
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

      <form
        class="row g-3 needs-validation"
        onSubmit={handleSubmit(onSubmit)}
        novalidate
      >
        <div class="col-md-6 col-sm-12">
          <label for="validationCustom01" class="form-label">
            First name
          </label>
          <input
            type="text"
            {...register("firstName", {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid firstname",
              },
            })}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            placeholder="Enter First Name"
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>
        <div class="col-md-6 col-sm-12">
          <label for="validationCustom02" class="form-label">
            Last name
          </label>
          <input
            type="text"
            {...register("lastName", {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid lastname",
              },
            })}
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            placeholder="Enter Last Name"
          />
          <div className="invalid-feedback pb-0">
            {errors.lastName?.message}
          </div>
        </div>
        <div>
          <label for="validationCustom03" class="form-label">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email",
              },
            })}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter email"
          />
          <div className="invalid-feedback pb-0">{errors.email?.message}</div>
        </div>

        <div>
          <label for="validationCustom04" class="form-label">
            Contact Number
          </label>
          <input
            type="tel"
            maxLength="10"
            {...register("contact", {
              pattern: {
                value: /^[0-9]*$/,
                message: "Invalid contact number",
              },
            })}
            className={`form-control ${errors.contact ? "is-invalid" : ""}`}
            placeholder="Enter Contact Number"
          />
          <div className="invalid-feedback">{errors.contact?.message}</div>
        </div>

        <div>
          <label for="validationCustom05" class="form-label">
            Address
          </label>
          <input
            type="text"
            {...register("address")}
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            placeholder="Address"
          />
          <div className="invalid-feedback pb-0">{errors.address?.message}</div>
        </div>

        <div class="col-md-6 col-sm-12">
          <label for="validationCustom06" class="form-label">
            Country
          </label>
          <select
            {...register("country")}
            className={`form-select ${errors.country ? "is-invalid" : ""}`}
          >
            <option selected disabled value="">
              Choose...
            </option>
            <option>...</option>
          </select>
          <div className="invalid-feedback">{errors.country?.message}</div>
        </div>
        <div class="col-md-6 col-sm-12">
          <label for="validationCustom07" class="form-label">
            State
          </label>
          <select
            {...register("state")}
            className={`form-select ${errors.state ? "is-invalid" : ""}`}
          >
            <option selected disabled value="">
              Choose...
            </option>
            <option>...</option>
          </select>
          <div className="invalid-feedback">{errors.state?.message}</div>
        </div>
        <div class="col-md-6 col-sm-12">
          <label for="validationCustom08" class="form-label">
            City
          </label>
          <input
            type="text"
            {...register("city", {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid city",
              },
            })}
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            placeholder="Singapore"
          />
          <div className="invalid-feedback">{errors.city?.message}</div>
        </div>
        <div class="col-md-6 col-sm-12">
          <label for="validationCustom09" class="form-label">
            Zip
          </label>
          <input
            type="text"
            {...register("zip", {
              pattern: {
                value: /^[0-9]*$/,
                message: "Invalid zipcode",
              },
            })}
            className={`form-control ${errors.zip ? "is-invalid" : ""}`}
            placeholder="238282"
          />
          <div className="invalid-feedback">{errors.zip?.message}</div>
        </div>
        <div className="d-flex pb-5 align-items-center justify-content-center flex-wrap-wrap">
          <button className="m-2 btn btn-primary" type="submit">
            Update
          </button>
          <button
            onClick={() => reset()}
            className="btn btn-danger m-2"
            type="submit"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
