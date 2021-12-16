import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Path from "../Constant/RouterConstant";

const RestrictedRoute = () => {
  const token = localStorage.getItem("token");

  return !token ? <Outlet /> : <Navigate to={Path.dashboard} />;
};

export default RestrictedRoute;
