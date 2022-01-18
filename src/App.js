import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import ForgotPassword from "./Components/Auth/ForgotPassword/ForgotPassword";
import Signup from "./Components/Auth/Signup/Signup";
import Path from "./Constant/RouterConstant";
import LoginRoute from "./Routes/LoginRoute";
import RestrictedRoute from "./Routes/RestrictedRoute";
import PrivateRoutes from "./Routes/PrivateRoutes";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(false);
  let navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route exact path={Path.dashboard} element={<LoginRoute />}></Route>
        <Route exact path={Path.dashboard} element={<RestrictedRoute />} />
        <Route exact path={Path.signup} element={<Signup />} />
        <Route exact path={Path.login} element={<Login />} />
        <Route exact path={Path.forgotPassword} element={<ForgotPassword />} />
      </Routes>
      <PrivateRoutes />
    </>
  );
}

export default App;
