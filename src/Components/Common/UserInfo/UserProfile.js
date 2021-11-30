import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";
import "./UserProfile.scss";
import "../Buttons/buttons.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import axiosConfig from "../APIConfig/axiosConfig";
import UserImage from "../../../Assets/Images/blank-user.png";
import { profileService } from "../../../Services/userService";

const UserProfile = () => {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [gender, setGender] = useState();
  const [url, setURL] = useState();
  const [address, setAddress] = useState();
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
  const [apiData, setApiData] = useState([]);

  function profile(data) {
    const profileData = {
      user: [
        {
          profile: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.contact,
            gender: null,
            description: null,
          },
          address: {
            street: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            zipCode: data.zip,
          },
        },
      ],
    };
  }

  useEffect(() => {
    profileFun({});
  }, []);

  const profileFun = (data) => {
    console.log("formdata", data);
    profileService(data)
      .then(function (response) {
        // console.log(response.data.data.Profile);
        setFirstname(response?.data?.data?.Profile?.firstName);
        setLastname(response?.data?.data?.Profile?.lastName);
        setEmail(response?.data?.data?.Profile?.email);
        setContact(response?.data?.data?.Profile?.phone);
        setAddress(response?.data?.data?.Profile?.Address?.street);
        setURL(response?.data?.data?.Profile?.profileUrl);
        setGender(response?.data?.data?.Profile?.gender);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function onSubmit(data) {
    let params = {
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.contact,
        // "email": data.email,
        gender: data.gender,
        description: data.description,
      },
      address: {
        street: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zip,
      },
    };
    profileFun(params);
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
            src={url === null ? UserImage : url}
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
        className="row g-3 needs-validation"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
          <input
            type="text"
            value={firstname}
            {...register("firstName", {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid firstname",
              },
            })}
            className={`form-control ${
              errors.firstName || errors.firstName === "" ? "is-invalid" : ""
            }`}
            placeholder="Enter First Name"
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            value={lastname}
            {...register("lastName", {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid lastname",
              },
            })}
            className={`form-control ${
              errors.lastName || errors.lastName === "" ? "is-invalid" : ""
            }`}
            placeholder="Enter Last Name"
          />
          <div className="invalid-feedback pb-0">
            {errors.lastName?.message}
          </div>
        </div>
        <div>
          <label htmlFor="validationCustom03" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={email}
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email",
              },
            })}
            className={`form-control ${
              errors.email === null || errors.email === "" ? "is-invalid" : ""
            }`}
            placeholder="Enter email"
          />
          <div className="invalid-feedback pb-0">{errors.email?.message}</div>
        </div>

        <div>
          <label htmlFor="validationCustom04" className="form-label">
            Contact Number
          </label>
          <input
            value={contact}
            type="tel"
            maxLength="10"
            {...register("contact", {
              pattern: {
                value: /^[0-9]*$/,
                message: "Invalid contact number",
              },
            })}
            className={`form-control ${
              errors.contact || errors.contact === "" ? "is-invalid" : ""
            }`}
            placeholder="Enter Contact Number"
          />
          <div className="invalid-feedback">{errors.contact?.message}</div>
        </div>

        <div>
          <label htmlFor="validationCustom08" className="form-label">
            Street
          </label>
          <input
            type="text"
            {...register("street", {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid Street",
              },
            })}
            className={`form-control ${errors.street ? "is-invalid" : ""}`}
            placeholder="Street"
          />
          <div className="invalid-feedback">{errors.street?.message}</div>
        </div>
        <div>
          <label htmlFor="validationCustom007" className="form-label me-2">
            Gender
          </label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="male"
              {...register("gender")}
              value="male"
            />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              {...register("gender")}
              id="female"
              value="female"
            />
            <label className="form-check-label">Female</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              {...register("gender")}
              id="others"
              value="other"
            />
            <label className="form-check-label">Others</label>
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom06" className="form-label">
            Country
          </label>
          <select
            {...register("country")}
            className={`form-select ${errors.country ? "is-invalid" : ""}`}
          >
            <option value="">Choose...</option>
            <option>India</option>
          </select>
          <div className="invalid-feedback">{errors.country?.message}</div>
        </div>

        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom07" className="form-label">
            State
          </label>
          <select
            {...register("state")}
            className={`form-select ${errors.state ? "is-invalid" : ""}`}
          >
            <option value="">Choose...</option>
            <option>Uttrakhand</option>
          </select>
          <div className="invalid-feedback">{errors.state?.message}</div>
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom08" className="form-label">
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
        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom09" className="form-label">
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

        {/* ========== Description ========  */}
        <div>
          <label htmlFor="validationCustom08" className="form-label">
            Description
          </label>
          <textarea
            resize="none"
            rows="3"
            type="text"
            {...register("description", {
              pattern: {
                value: /^[A-Za-z]+$/i,
              },
            })}
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            placeholder="Describe yourself"
          />
        </div>
        {/* =========================================== */}

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
