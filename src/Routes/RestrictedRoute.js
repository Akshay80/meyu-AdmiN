import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Path from "../Constant/RouterConstant";
import Login from "../Components/Auth/Login/Login";
import { getToken } from "../Components/helper/uitility";
const RestrictedRoute = () => {
  return typeof getToken() !== undefined ? <Outlet /> : <Login />;
};

export default RestrictedRoute;
