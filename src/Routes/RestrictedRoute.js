import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RestrictedRoute = () => {

  const token = localStorage.getItem("token");

  console.log("token", token);

  return !token ? <Outlet /> : <Navigate to="/" />;
};

export default RestrictedRoute;
