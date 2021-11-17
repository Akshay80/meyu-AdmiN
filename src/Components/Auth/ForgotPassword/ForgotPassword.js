import React from "react";
import "./ForgotPassword.scss";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function forgotPassword() {
    alert("Data Registered!");
  }
  return (
    <div className="container bg-dark" style={{ height: "100vh" }}>
      <div className="row justify-content-center">
        <div className="cards mb-5">
          <div className="card-body">
            <h3 className="card-title1 text-center">MEYU</h3>
            <p className="card-title2 text-center mb-4">Meyu Admin</p>
            <p className="card-text fw-bold color-grey">Forgot Password</p>
            <form onSubmit={handleSubmit(forgotPassword)}>
              <div className="mb-3 mt-4">
                <label for="exampleFormControlInput1" class="form-label">
                  <small>Registered Email</small>
                </label>

                <input
                  type="email"
                  className="form-control shadow-none"
                  name="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <p className="errors">{errors.email.message}</p>
                )}
              </div>
              <div className="mt-4">
                <button type="submit" className="btn btn-auth outline-none">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
