import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserToken } from "../Components/helper/uitility";
import Path from "../Constant/RouterConstant";

const LoginRoute = () => {
  return  getUserToken() ? <Outlet /> : <Navigate to={Path.login} />;
};

export default LoginRoute;
