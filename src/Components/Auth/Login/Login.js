import React, { useState } from "react";
import "./Login.scss";
import Path from "../../../Constant/RouterConstant";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import { loginApiFun } from "../../../Services/authService";
import { Loader } from "../../util/Loader";
import { setUserToken } from "../../helper/uitility";


const Login = (props) => {
  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isValidForm, setIsValidForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const onSubmit = (data) => {
    setLoader(true);
    let params = {
      username: data.email,
      password: data.password
    }

    loginApiFun(params)
      .then(res => {
        console.log("res login", res)
        if (res?.data?.status !== "Error") {
          console.log("test",res)
          setUserToken(res?.data?.data?.token);
          navigate("/");
        }
        else {
          setErrorMessage(res?.data.error);
          setIsValidForm(false);
        }
        setLoader(false);
      })
      .catch(err => {
        console.log("error", err)
        setErrorMessage(err?.data.error);
        setLoader(false);
        setIsValidForm(false);
      })
  }

  return (
    <div className="auth-wrapper align-items-center bg-dark">
       {loader ? <div className="loader_lg"><Loader /></div> : ''}
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
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 row justify-content-center">
                <div className="col-sm-12">
                  <input
                    type="email"
                    className="form-control shadow-none"  
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
  );
};

export default Login;
