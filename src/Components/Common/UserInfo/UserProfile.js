import React, { useEffect, useState, useRef } from "react";
import { Input } from "reactstrap";
import { ReactComponent as UserIcon } from "../../../Assets/Icon/user.svg";
import "./UserProfile.scss";
import "../Buttons/buttons.scss";
import { useForm } from "react-hook-form";
import {
  profileService,
  viewprofileService,
  changeProfileImage,
} from "../../../Services/userService";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const UserProfile = () => {
  // To view the filled information

  const [image, setImage] = useState({ preview: "", raw: "" });
  const [url, setURL] = useState();
  // eslint-disable-next-line no-unused-vars
  const [profileData, setProfileData] = useState({});
  const toastId = useRef(123);

  // For Editing the fields

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //  Get use profile Data

  useEffect(() => {
    getProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfileData = () => {
    viewprofileService()
      .then((response) => {
        if (response?.statusText === "OK") {
          setProfileData(response?.data?.data);
          setURL(
            `http://13.213.151.153:8081/${response.data.data.Profile.profileUrl}`
          );
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
        }
      })
      .catch((error) => {});
  };

  // ============================= Post Profile Data ==========================

  const onSubmit = (data) => {
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
        toast.success("Profile Updated Successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
        });
      })
      .catch((error) => {
        const error1 = error.error.substr(0, 79);
        const error2 = error.error.substr(80, 157);
        if (error.error.length === 159) {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(error1, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
              toastId: 100,
            });
            toastId.current = toast.error(error2, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
              toastId: toastId,
            });
          }
        } else {
          toast.error(error1, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
          });
        }
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
    formData.append("profile", e?.target?.files[0]);
    changeProfileImage(formData)
      .then((response) => {
        if (response?.statusText === "OK") {
          getProfileData();
        }
      })
      .catch((error) => {});
  };
  // ========================= Return data ===========================

  return (
    <>
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
            <label htmlFor="upload-button">
              <img
                id="profilePic"
                className="pic"
                alt="user_image"
                src={url ? url : image.preview}
                {...register("uploadedimage", {})}
              />
            </label>
            <label htmlFor="upload-button" className="upload-file-block">
              <div className="text-center">
                <div className="mb-2"></div>
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
              {...register("firstName", { required: true })}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            />

            <div className="invalid-feedback">First name is required!</div>
          </div>

          <div className="col-md-6 col-sm-12">
            <label htmlFor="validationCustom02" className="form-label">
              Last name
            </label>
            <input
              type="text"
              placeholder="lastName"
              {...register("lastName", { required: true })}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">Last name is required!</div>
          </div>

          <div>
            <label htmlFor="validationCustom03" className="form-label">
              Email
            </label>
            <input
              type="text"
              placeholder="email"
              {...register("email", { required: true })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">Email is required!</div>
          </div>
          {errors.firstName && (
            <p className="errorss">{errors.firstName.message}</p>
          )}

          <div>
            <label htmlFor="validationCustom04" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="contact"
              {...register("contact", { required: true })}
              className={`form-control ${errors.contact ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">Contact Number is required!</div>
          </div>

          <div>
            <label htmlFor="validationCustom007" className="form-label me-2">
              Gender
            </label>
            <div className="form-check">
              <input
                type="radio"
                className={`form-check-input ${
                  errors.gender ? "is-invalid" : ""
                }`}
                id="validationFormCheck2"
                value="m"
                {...register("gender", { required: true })}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className={`form-check-input ${
                  errors.gender ? "is-invalid" : ""
                }`}
                id="validationFormCheck3"
                value="f"
                {...register("gender", { required: true })}
              />
              <label className="form-check-label">Female</label>
              <div className="invalid-feedback" style={{ marginLeft: -23 }}>
                Select a gender!
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="validationCustom08" className="form-label">
              Street
            </label>
            <input
              type="text"
              placeholder="street"
              {...register("street", { required: true })}
              className={`form-control ${errors.street ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">Street is required!</div>
          </div>

          <div className="col-md-6 col-sm-12">
            <label htmlFor="validationCustom06" className="form-label">
              Country
            </label>
            <select
              {...register("country", { required: true })}
              className={`form-select ${errors.country ? "is-invalid" : ""}`}
            >
              <option value="">Choose...</option>
              <option value="India">India</option>
            </select>
            <div className="invalid-feedback">
              Please provide a valid country!
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <label htmlFor="validationCustom07" className="form-label">
              State
            </label>
            <select
              {...register("state", { required: true })}
              className={`form-select ${errors.state ? "is-invalid" : ""}`}
            >
              <option value="">Choose...</option>
              <option value="Uttrakhand">Uttrakhand</option>
            </select>
            <div className="invalid-feedback">
              Please provide a valid state!
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <label htmlFor="validationCustom08" className="form-label">
              City
            </label>
            <input
              type="text"
              {...register("city", { required: true })}
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              placeholder="Singapore"
            />
            <div className="invalid-feedback">City is required!</div>
          </div>
          <div className="col-md-6 col-sm-12">
            <label htmlFor="validationCustom09" className="form-label">
              Zip
            </label>
            <input
              type="text"
              {...register("zip", { required: true })}
              className={`form-control ${errors.zip ? "is-invalid" : ""}`}
              placeholder="238282"
            />
            <div className="invalid-feedback">Zip is required!</div>
          </div>

          <div className="d-flex pb-5 align-items-center justify-content-center flex-wrap-wrap">
            <button className="m-2 btn btn-success" type="submit">
              Update
            </button>
            <button
              onClick={() => reset()}
              className="btn btn-danger m-2"
              type="reset"
            >
              Reset
            </button>
          </div>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          limit={1}
          transition={Flip}
        />
      </div>
    </>
  );
};

export default UserProfile;
