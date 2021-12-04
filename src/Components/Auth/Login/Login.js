import React from "react";
import "./Login.scss";
import Path from "../../../Constant/RouterConstant";
import { useForm } from "react-hook-form";
import axiosConfig from "../../Common/APIConfig/axiosConfig";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {useNavigate} from 'react-router-dom'

let toastId = null;
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function login1(data) {
    const loginData = {
      username: data.email,
      password: data.password
    }

    axiosConfig
    .post("/authenticateadmin", loginData)
    .then(function (response) {
      if(response.data.success === true)
      {
        let token = response.data.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
       navigate("/")
      }
      if (!toast.isActive(toastId)) {
        toast.error(response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      }
    })

    .catch(function (error) {
      console.log(error.response.data.error);
      if (!toast.isActive(toastId)) {
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      }

      console.log(error.response.data.error.message);
      if (!toast.isActive(toastId)) {
        toast.error(error.response.data.error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      }
    });
    
  }
  return (
    <>
    <div className="auth-wrapper align-items-center bg-dark">
      <div className="row text-center justify-content-center">
        <div className="cards1 mb-5 align-middle">
          <div className="card-body">
            <h3 className="card-title1">MEYU</h3>
            <p className="card-title2 mb-4">Meyu Admin</p>
            <p className="card-title3">Sign In</p>
            <p className="card-subtitle mb-4">
              Don't have an account?{" "}
              <a href={Path.signup} className="link">
                Sign up
              </a>
            </p>
            <form autoComplete="off" onSubmit={handleSubmit(login1)}>
              <div className="mb-3 row justify-content-center">
                <div className="col-sm-12">
                  <input
                    type="email"
                    className="form-control shadow-none"
                    name="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid Email",
                      },
                     
                    })} />
                  {errors.email && (
                    <p className="errors">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="mb-3 row justify-content-center">
                <div className="col-sm-12">
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
                      }
                    })} />
                  {errors.password && (
                    <p className="errors">{errors.password.message}</p>
                  )}
                </div>
                </div>
                <div className="mt-4 mb-4 row justify-content-center">
                  <div className="col-sm-12">
                    <button type="submit" className="btn btn-auth">
                      Sign In
                    </button>
                  </div>
                </div>

                <p>
                  Forgot Password?{" "}
                  <a href={Path.forgotPassword} className="link">
                    Click Here
                  </a>
                </p>
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
        transition={Flip} />
        </>
  );
};

export default Login;
