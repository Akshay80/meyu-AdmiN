import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../Components/Auth/Login/Login";
import { getToken } from "../Components/helper/uitility";
const RestrictedRoute = () => {
  return typeof getToken() !== undefined ? <Outlet /> : <Login />;
};

export default RestrictedRoute;
