import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserToken } from "../Components/helper/uitility";

const LoginRoute = () => {
  return getUserToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default LoginRoute;
