import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Path from "../Constant/RouterConstant";
import Login from "../Components/Auth/Login/Login";

const RestrictedRoute = () => {
  const token = localStorage.getItem("token");
  return !token ? <Login /> : <Navigate to={Path.dashboard} />;
};

export default RestrictedRoute;
