import React from "react";
import "./Signup.scss";
import Path from "../../../Constant/RouterConstant";
import { useForm } from "react-hook-form";
import axiosConfig from "../../Common/APIConfig/axiosConfig";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

let toastId = null;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function login(data) {
    const postData = {
      user: {
        firstName: data.firstname,
        lastName: data.lastname,
        phone: data.phone,
        email: data.email,
        userRole: 4,
        password: data.password,
      },
    };
    axiosConfig
      .post("/signup", postData)
      .then(function (response) {
        if (!toast.isActive(toastId)) {
          toast.success(response.data.data.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          toast.error(response.data.error.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        } else {
          console.log("Toast already active");
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="auth-wrapper bg-dark">
      <div className="row justify-content-center">
        <div className="cards2 pt-1 pb-1">
          <div className="card-body">
            <h3 className="card-title1 text-center">MEYU</h3>
            <p className="card-title2 mb-1 text-center">Meyu Admin</p>
            <p className="card-title3">Sign In</p>
            <p className="card-subtitle mb-3">
              Already have an account?{" "}
              <a href={Path.login} className="link">
                Sign in
              </a>
            </p>
            <form
              className="row g-2"
              autoComplete="off"
              onSubmit={handleSubmit(login)}
            >
              <div className="col-md-6">
                <input
                  className="form-control shadow-none"
                  type="text"
                  placeholder="First Name"
                  {...register("firstname", {
                    required: "Firstname is required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Firstname is invalid",
                    },
                  })}
                />
                {errors.firstname && (
                  <p className="errorss">{errors.firstname.message}</p>
                )}
              </div>
              <div className="col-md-6">
                <input
                  className="form-control shadow-none"
                  type="text"
                  placeholder="Last Name"
                  {...register("lastname", {
                    required: "Lastname is required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Lastname is invalid",
                    },
                  })}
                />
                {errors.lastname && (
                  <p className="errorss">{errors.lastname.message}</p>
                )}
              </div>
              <div className="col-md-12">
                <input
                  type="tel"
                  maxLength="10"
                  className="form-control shadow-none"
                  name="phone"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Invalid Phone Number",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="errorss">{errors.phone.message}</p>
                )}
              </div>
              <div className="col-md-12">
                <input
                  type="email"
                  className="form-control shadow-none"
                  name="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid Email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="errorss">{errors.email.message}</p>
                )}
              </div>
              <div className="col-12">
                <input
                  name="password"
                  placeholder="Password"
                  className="form-control shadow-none"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="errorss">{errors.password.message}</p>
                )}
              </div>
              {/* <div className="col-12">
                <input
                  name="password_repeat"
                  className="form-control shadow-none"
                  placeholder="Confirm Password"
                  type="password"
                  {...register("cpassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords don't match.",
                  })}
                />
                {errors.cpassword && (
                  <p className="errorss">{errors.cpassword.message}</p>
                )}
              </div> */}
              <div className="col-12 mt-4">
                <button type="submit" className="btn btn-auth">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
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
  );
};

export default Signup;
