import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import ForgotPassword from "./Components/Auth/ForgotPassword/ForgotPassword";
import Signup from "./Components/Auth/Signup/Signup";
import Path from "./Constant/RouterConstant";
import LoginRoute from "./Routes/LoginRoute";
import RestrictedRoute from "./Routes/RestrictedRoute";
import PrivateRoutes from "./Routes/PrivateRoutes";
import { getToken } from "./Components/helper/uitility";
import { useState } from "react";

// const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       getToken() ? <Component {...props} /> : <Navigate to="/login" />
//     }
//   />
// );

function App() {
  const [token, setToken] = useState(false);
  let navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route exact path={Path.dashboard} element={<LoginRoute />}></Route>
        <Route exact path={Path.dashboard} element={<RestrictedRoute />}>
          <Route exact path={Path.login} element={<Login />} />
        </Route>
        <Route path={Path.signup} element={<Signup />} />
        <Route path={Path.login} element={<Login />} />
        <Route path={Path.forgotPassword} element={<ForgotPassword />} />
      </Routes>
      <PrivateRoutes />
    </>
  );
}

export default App;
