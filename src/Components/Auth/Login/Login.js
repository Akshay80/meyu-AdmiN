import React, { useState } from "react";
import "./Login.scss";
import Path from "../../../Constant/RouterConstant";
import { useForm } from "react-hook-form";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function login1(data) {
    alert("Data Registered!");
    setEmail(data.email);
    setPassword(data.password);
    console.log("Email:", email);
    console.log("Password: ", password);
  }
  return (
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
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid Email",
                      },
                    })}
                  />
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
                    onChange={(e) => setPassword(e.target.value)}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
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
