import React, {useState} from "react";
import Path from "../../../Constant/RouterConstant";
import { useForm } from "react-hook-form";
import "./ChangePassword.scss";
import { changePasswordService } from "../../../Services/authService";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Eyeopen } from "../../../Assets/Icon/Eye.svg";
import { ReactComponent as Eyeclose } from "../../../Assets/Icon/Eyeclose.svg";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const showPassword1 = () => {
    setPasswordShown1(passwordShown1 ? false : true);
  };

  const showPassword2= () => {
    setPasswordShown2(passwordShown2 ? false : true);
  };

  const changePassword = async (data) => {
    const changePasswordData = {
      oldPassword: data.oldpassword,
      newPassword: data.newpassword,
    };
    await changePasswordService(changePasswordData)
      .then(function (response) {
        toast.success(response.data.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        setTimeout(() => {
          navigate(Path.dashboard);
        }, 3000);
      })

      .catch(function (error) {
        toast.error(error.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      });
  };

  return (
    <div className="pt-5">
      <div className="align-items-center">
        <div className="row text-center justify-content-center">
          <div className="card changepass-card align-middle">
            <div className="card-body">
              <h3 className="card-title1">MEYU</h3>
              <p className="card-title2 mb-4">Meyu Admin</p>
              <form autoComplete="off" onSubmit={handleSubmit(changePassword)}>
                <div className="mb-3 row justify-content-center">
                  <div className="col-sm-12">
                    <input
                      autoComplete="off"
                      name="oldpassword"
                      // maxLength="8"
                      placeholder="Old Password"
                      className="form-control shadow-none"
                      type="oldpassword"
                      {...register("oldpassword", {
                        required: "Old password is required",
                      })}
                    />
                    {errors.oldpassword && (
                      <p className="errors">{errors.oldpassword.message}</p>
                    )}
                  </div>
                </div>
                <div className="mb-3 row justify-content-center">
                  <div className="col-sm-12">
                  <div className="input-group">
                    <input
                      autoComplete="off"
                      name="password"
                      placeholder="New Password"
                      className="form-control shadow-none"
                      type={passwordShown1 ? "text" : "password"}
                      {...register("newpassword", {
                        required: "New password is required",
                        pattern: {
                          value:
                            /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9]).{8,24}/,
                          message:
                            "Password must include at least 1 lowercase, 1 uppercase, 1 number and 1 special character as \n (!@#$%^&*)",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                      })}
                    />
                     <button
                        className="eyebtn"
                        type="button"
                        onClick={showPassword1}
                      >
                        {passwordShown1 ? <Eyeopen /> : <Eyeclose />}
                      </button>
                    </div>
                    {errors.newpassword && (
                      <p className="errors">{errors.newpassword.message}</p>
                    )}
                  </div>
                </div>
                <div className="mb-3 row justify-content-center">
                  <div className="col-12">
                    <div className="input-group">
                    <input
                      name="password_repeat"
                      className="form-control shadow-none"
                      placeholder="Confirm Password"
                      type={passwordShown2 ? "text" : "password"}
                      {...register("cpassword", {
                        required: "Confirm Password is required",

                        validate: (value) =>
                          value === watch("newpassword") ||
                          "Passwords don't match.",
                      })}
                    />
                 <button
                        className="eyebtn"
                        type="button"
                        onClick={showPassword2}
                      >
                        {passwordShown2 ? <Eyeopen /> : <Eyeclose />}
                      </button>
                    </div>
                    {errors.cpassword && (
                      <p className="errors">{errors.cpassword.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 mb-4 row justify-content-center">
                  <div className="col-sm-12">
                    <button type="submit" className="btn btn-auth">
                      Update Password
                    </button>
                  </div>
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
    </div>
  );
};

export default ChangePassword;
