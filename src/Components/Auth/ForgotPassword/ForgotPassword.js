import React from "react";
import "./ForgotPassword.scss";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { forgotPasswordService } from "../../../Services/authService";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const forgotPassword = (data) => {
    let params = {
      email: data.email,
      phone: "",
    };
    forgotPasswordService(params)
      .then((response) => {
        toast.error(response.data.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0
        });
      })
      .catch((error) => {
      });
  };

  return (
    <div className="auth-wrapper bg-dark">
      <div className="row justify-content-center">
        <div className="cards mb-5">
          <div className="card-body">
            <h3 className="card-title1 text-center">MEYU</h3>
            <p className="card-title2 text-center mb-4">Meyu Admin</p>
            <p className="card-text fw-bold color-grey">Forgot Password</p>
            <form onSubmit={handleSubmit(forgotPassword)}>
              <div className="mb-3 mt-4">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
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
  );
};

export default ForgotPassword;
