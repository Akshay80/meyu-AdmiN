import React from "react";
import Path from "../../../Constant/RouterConstant";
import { useForm } from "react-hook-form";
import './ChangePassword.scss'

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="p-5">
      <div className="align-items-center">
        <div className="row text-center justify-content-center">
          <div className="changepass-card align-middle">
            <div className="card-body">
              <h3 className="card-title1">MEYU</h3>
              <p className="card-title2 mb-4">Meyu Admin</p>
              <form autoComplete="off" onSubmit={handleSubmit()}>
                <div className="mb-3 row justify-content-center">
                  <div className="col-sm-12">
                    <input
                    autoComplete="off"
                      name="password"
                      placeholder="New Password"
                      className="form-control shadow-none"
                      type="password"
                      {...register("newpassword", {
                        required: "New password is required",
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                      })}
                    />
                    {errors.newpassword && (
                      <p className="errors">{errors.newpassword.message}</p>
                    )}
                  </div>
                </div>
                <div className="mb-3 row justify-content-center">
                  <div className="col-sm-12">
                    <input
                    autoComplete="off"
                      name="password"
                      placeholder="Confirm Password"
                      className="form-control shadow-none"
                      type="password"
                      {...register("confirmpassword", {
                        required: "Confirm New Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                      })}
                    />
                    {errors.confirmpassword && (
                      <p className="errors">{errors.confirmpassword.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 mb-4 row justify-content-center">
                  <div className="col-sm-12">
                    <a href={Path.login}>
                      <button type="submit" className="btn btn-auth">
                        Update Password
                      </button>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
