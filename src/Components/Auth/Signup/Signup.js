import React from "react";
import "./Signup.scss";
import Path from "../../../Constant/RouterConstant";
import { useForm } from "react-hook-form";
import { signupFun } from "../../../Services/authService";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    const params = {
      user: {
        firstName: data.firstname,
        lastName: data.lastname,
        phone: data.phone,
        email: data.email,
        userRole: 4,
        password: data.password,
      },
    };
    signupFun(params)
      .then((data) => {
        if (data.data.success === false) {
          toast.error(data.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        } else {
          reset();
          navigate("/login");
        }
      })

      .catch(function (error) {});
  }

  return (
    <>
      <div className="auth-wrapper bg-dark">
        <div className="row justify-content-center">
          <div className="cards2 pt-1 pb-1">
            <div className="card-body">
              <h3 className="card-title1 text-center">MEYU</h3>
              <p className="card-title2 mb-1 text-center">Meyu Admin</p>
              <p className="card-title3">Sign Up</p>
              <p className="card-subtitle mb-3">
                Already have an account?{" "}
                <a href={Path.login} className="link">
                  Sign in
                </a>
              </p>
              <form
                className="row g-3"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
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
                      minLength: {
                        value: 10,
                        message: "Phone number must have atleast 10 digits.",
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

                <div className="mb-2 col-12 mt-4">
                  <button type="submit" className="btn btn-auth">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default Signup;
