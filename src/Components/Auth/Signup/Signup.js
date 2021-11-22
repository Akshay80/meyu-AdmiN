import React from "react";
import "./Signup.scss";
import Path from "../../../Constant/RouterConstant";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  function login() {
    alert("Data Submitted!");
  }
  return (
    <div className="container bg-dark">
      <div className="row justify-content-center">
        <div className="cards2">
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
              className="row g-2  "
              autoComplete="off"
              onSubmit={handleSubmit(login)}
            >
              <div className="col-md-12">
                <label for="inputEmail4" className="form-label mb-0">
                  Name
                </label>
                <input
                  className="form-control shadow-none"
                  type="text"
                  placeholder="Name"
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Name is invalid",
                    },
                  })}
                />
                {errors.name && <p className="errors">{errors.name.message}</p>}
              </div>
              <div className="col-md-12">
                <label for="inputPassword4" className="form-label mb-0">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control shadow-none"
                  name="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                      message: "Invalid Email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="errors">{errors.email.message}</p>
                )}
              </div>
              <div className="col-12">
                <label for="inputAddress" className="form-label mb-0">
                  Password
                </label>
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
                  <p className="errors">{errors.password.message}</p>
                )}
              </div>
              <div className="col-12">
                <label for="inputAddress2" className="form-label mb-0">
                  Confirm Password
                </label>
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
                  <p className="errors">{errors.cpassword.message}</p>
                )}
              </div>
              <div className="col-12 mt-4">
                <button type="submit" className="btn btn-auth">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
