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
import {
  profileService,
  viewprofileService,
} from "../../../Services/userService";

const UserProfile = () => {
  // For View
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [gender, setGender] = useState();
  const [url, setURL] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();

  // For Edit
  const [editedfirstname, seteditedFirstname] = useState();
  const [editedlastname, seteditedLastname] = useState();
  const [editedmail, seteditedEmail] = useState();
  const [editedcontact, seteditedContact] = useState();
  const [editedgender, seteditedGender] = useState();
  const [editedurl, seteditedURL] = useState();
  const [editedaddress, seteditedAddress] = useState();
  const [editedcity, seteditedCity] = useState();
  const [editedstate, seteditedState] = useState();
  const [editedzip, seteditedZip] = useState();
  const [editedcountry, seteditedCountry] = useState();
  const [editedstreet, seteditedStreet] = useState();

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

  // function profile(data) {
  //   const profileData = {
  //     user: [
  //       {
  //         profile: {
  //           firstName: data.firstName,
  //           lastName: data.lastName,
  //           phone: data.contact,
  //           gender: null,
  //           description: null,
  //         },
  //         address: {
  //           street: data.address,
  //           city: data.city,
  //           state: data.state,
  //           country: data.country,
  //           zipCode: data.zip,
  //         },
  //       },
  //     ],
  //   };
  // }

  useEffect(() => {
    profileFun({});
    // profileDetails();
  }, []);

  const profileFun = () => {
    profileService()
      .then(function (response) {
        // console.log(response.data)
        setFirstname(response?.data?.data?.Profile?.firstName);
        setLastname(response?.data?.data?.Profile?.lastName);
        setEmail(response?.data?.data?.Profile?.email);
        setContact(response?.data?.data?.Profile?.phone);
        setAddress(response?.data?.data?.Profile?.Address);
        setURL(response?.data?.data?.Profile?.coverPhotoUrl);
        setGender(response?.data?.data?.Profile?.gender);
        setCity(response.data.data.Profile.city);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function onSubmit(data) {
    alert("clicked");
    let params = {
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.contact,
        // "email": data.email,
        gender: data.gender,
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

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  return (
    <div className="user-profile-container">
      <div className="page-heading d-flex p-4">
        <div className="page-heading-wapper d-flex">
          <UserIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Edit Profile</h3>
        </div>
      </div>
      <div className="profile-pic-wrapper">
        <div className="profile-pic-holder">
          {/* <img
            id="profilePic"
            className="pic"
            alt=""
            src={url === null ? UserImage : url}
          /> */}
          <label htmlFor="upload-button">
            {image.preview ? (
              <img id="profilePic" className="pic" alt="" src={image.preview} />
            ) : (
              <>
                <img
                  id="profilePic"
                  className="pic"
                  alt=""
                  src={url === null ? UserImage : image.preview}
                />
              </>
            )}
          </label>
          {/* <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        
      /> */}
          <label htmlFor="upload-button" className="upload-file-block">
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
            id="upload-button"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
      </div>

      <form
        className="row g-3 needs-validation"
        onSubmit={handleSubmit(onSubmit)}
        // noValidate
      >
        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
          <input
            type="text"
            defaultValue={firstname}
            {...register("firstName", {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid firstname",
              },
            })}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            placeholder="Enter First Name"
            onChange={(e) => seteditedFirstname(e.target.value)}
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            defaultValue={lastname}
            {...register("lastName", {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid lastname",
              },
            })}
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            placeholder="Enter Last Name"
            onChange={(e) => seteditedLastname(e.target.value)}
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
            defaultValue={email}
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email",
              },
            })}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter email"
            onChange={(e) => seteditedEmail(e.target.value)}
          />
          <div className="invalid-feedback pb-0">{errors.email?.message}</div>
        </div>

        <div>
          <label htmlFor="validationCustom04" className="form-label">
            Contact Number
          </label>
          <input
            defaultValue={contact}
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
            onChange={(e) => seteditedContact(e.target.value)}
          />
          <div className="invalid-feedback">{errors.contact?.message}</div>
        </div>

        <div>
          <label htmlFor="validationCustom08" className="form-label">
            Street
          </label>
          <input
            defaultValue={address}
            type="text"
            {...register("street", {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid Street",
              },
            })}
            onChange={(e) => seteditedStreet(e.target.value)}
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
              value="m"
              onChange={(e) => seteditedGender(e.target.value)}
              // checked={gender === "m"}
            />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              {...register("gender")}
              id="female"
              value="f"
              onChange={(e) => seteditedGender(e.target.value)}
              // checked={gender === "f"}
            />
            <label className="form-check-label">Female</label>
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom06" className="form-label">
            Country
          </label>
          <select
            {...register("country")}
            className={`form-select ${errors.country ? "is-invalid" : ""}`}
            onChange={(e) => seteditedCountry(e.target.value)}
          >
            <option value="">Choose...</option>
            <option value="India">India</option>
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
            onChange={(e) => seteditedState(e.target.value)}
          >
            <option value="">Choose...</option>
            <option value="Uttrakhand">Uttrakhand</option>
          </select>
          <div className="invalid-feedback">{errors.state?.message}</div>
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom08" className="form-label">
            City
          </label>
          <input
            defaultValue={city}
            type="text"
            {...register("city", {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Invalid city",
              },
            })}
            onChange={(e) => seteditedCity(e.target.value)}
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
            onChange={(e) => seteditedZip(e.target.value)}
          />
          <div className="invalid-feedback">{errors.zip?.message}</div>
        </div>

        {/* ========== Description ========  */}
        {/* <div>
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
        </div> */}
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
