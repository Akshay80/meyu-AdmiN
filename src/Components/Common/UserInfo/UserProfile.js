import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";
import "./UserProfile.scss";
import "../Buttons/buttons.scss";
import { useForm } from "react-hook-form";
import UserImage from "../../../Assets/Images/blank-user.png";
import {
  profileService,
  viewprofileService,
  changeProfileImage,
} from "../../../Services/userService";
import axios from "axios";
import setting from "../../../config/settings";
import camera from '../../../Assets/Icon/camera.svg'

const UserProfile = () => {
  // To view the filled information

  const [image, setImage] = useState({ preview: "", raw: "" });
  const [url, setURL] = useState();
  const [profileData, setProfileData] = useState({});

  // For Editing the fields

  const {
    register,
    setValue,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  //  Get use profile Data

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = () => {
    viewprofileService()
      .then((response) => {
        if (response?.statusText === "OK") {
          setProfileData(response?.data?.data);
          setValue("firstName", response.data.data.Profile.firstName);
          setValue("lastName", response.data.data.Profile.lastName);
          setValue("email", response.data.data.Profile.email);
          setValue("contact", response.data.data.Profile.phone);
          setValue("gender", response.data.data.Profile.gender);
          setValue("street", response.data.data.Profile.Address.street);
          setValue("country", response.data.data.Profile.Address.country);
          setValue("state", response.data.data.Profile.Address.state);
          setValue("city", response.data.data.Profile.Address.city);
          setValue("zip", response.data.data.Profile.Address.zipCode);
          // setURL("uploadedimage", response.data.data.Profile.profileUrl);
          setURL(`http://52.77.236.78:8081/${response.data.data.Profile.profileUrl}`);
        }
      })
      .catch((error) => {
        console.log("errors", error);
      });
  };

  // ============================= Post Profile Data ==========================

  const onSubmit = (data) => {
    alert("clicked");
    console.log("data", data);
    let params = {
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.contact,
        gender: data.gender,
      },
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zip,
      },
    };
    profileService(params)
      .then((data) => {
        console.log("post profile data", data);
      })
      .catch((error) => {
        console.log("post data error", error);
      });
  };

  // ================== upload profile picture ========================

  const handleChange = (e) => {
    if (e?.target?.files?.length) {
      setImage({
        preview: URL.createObjectURL(e?.target?.files[0]),
        raw: e?.target?.files[0],
      });
    }

    let formData = new FormData();
    console.log("target image", e?.target?.files[0]);
    formData.append("profile", e?.target?.files[0]);
    changeProfileImage(formData)
      .then((response) => {
        console.log("post profile data", response);
        getProfileData();
      })
      .catch((error) => {
        console.log("post data error", error);
      });

    // let token = localStorage.getItem("token");
    // axios
    //   .post(`${setting.api.url}auth/profile-image`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: token,
    //     },
    //   })
    //   .then((res) => {
    //     // console.log("res", res?.data);
    //     if (res?.data?.status === 201) {
    //       // console.log("test", res?.data?.data);
    //       setImage(res?.data?.data);
    //     } else {
    //       // console.log("test", res);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });
  };
  // ========================= Return data ===========================

  return (
    <div className="user-profile-container">
      <div className="page-heading d-flex p-4">
        <div className="page-heading-wapper d-flex">
          <UserIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Edit Profile</h3>
        </div>
      </div>

      {/* ======================== profile pic =================== */}

      <div className="profile-pic-wrapper">
        <div className="profile-pic-holder">
          {/* {console.log("response", profileData)} */}
          <label htmlFor="upload-button">
            {console.log("OUUURRRRRRRR URRLLLLRRRLLLLR: ", url)}
            
              <img
                id="profilePic"
                className="pic"
                alt="user_image"
                src={url? url: image.preview }
                {...register("uploadedimage", {})}
              />
          </label>
          <label htmlFor="upload-button" className="upload-file-block">
            <div className="text-center">
              <div className="mb-2">
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
        {/* <button className="btn btn-success" onClick={handleChange}>
            Update
          </button> */}
      </div>

      {/* ======================== my form ===================== */}

      <form
        className="row g-3 needs-validation"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
          <input
            type="text"
            placeholder="firstName"
            {...register("firstName", {})}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
        </div>

        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            placeholder="lastName"
            {...register("lastName", {})}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
        </div>

        <div>
          <label htmlFor="validationCustom03" className="form-label">
            Email
          </label>
          <input
            type="text"
            placeholder="email"
            {...register("email", {})}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
        </div>

        <div>
          <label htmlFor="validationCustom04" className="form-label">
            Contact Number
          </label>
          <input
            type="text"
            placeholder="contact"
            {...register("contact", {})}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
        </div>

        <div>
          <label htmlFor="validationCustom007" className="form-label me-2">
            Gender
          </label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              value="m"
              {...register("gender")}
            />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              value="f"
              {...register("gender")}
            />
            <label className="form-check-label">Female</label>
          </div>
        </div>

        <div>
          <label htmlFor="validationCustom08" className="form-label">
            Street
          </label>
          <input
            type="text"
            placeholder="street"
            {...register("street", {})}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
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
            <option value="India">India</option>
          </select>
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
            <option value="Uttrakhand">Uttrakhand</option>
          </select>
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom08" className="form-label">
            City
          </label>
          <input
            type="text"
            {...register("city", {})}
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            placeholder="Singapore"
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="validationCustom09" className="form-label">
            Zip
          </label>
          <input
            type="text"
            {...register("zip", {})}
            className={`form-control ${errors.zip ? "is-invalid" : ""}`}
            placeholder="238282"
          />
        </div>

        <div className="d-flex pb-5 align-items-center justify-content-center flex-wrap-wrap">
          <button className="m-2 btn btn-success" type="submit">
            Update
          </button>
          <button
            onClick={() => resetField()}
            className="btn btn-danger m-2"
            type="reset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
