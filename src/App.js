import { Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import ForgotPassword from "./Components/Auth/ForgotPassword/ForgotPassword";
import Signup from "./Components/Auth/Signup/Signup";
import Path from "./Constant/RouterConstant";
import LoginRoute from "./Routes/LoginRoute";
import RestrictedRoute from "./Routes/RestrictedRoute";
import PrivateRoutes from "./Routes/PrivateRoutes";
import IdleTimerContainer from "./Components/Auth/IdleTimerContainer/IdleTimerContainer";

function App() {
  return (
    <>
      <Routes>
        <Route exact path={Path.dashboard} element={<LoginRoute />}></Route>
        <Route
          exact
          path={Path.dashboard}
          element={<RestrictedRoute />}
        ></Route>
        <Route exact path={Path.signup} element={<Signup />} />
        <Route exact path={Path.login} element={<Login />} />
        <Route exact path={Path.forgotPassword} element={<ForgotPassword />} />
      </Routes>
      <IdleTimerContainer></IdleTimerContainer>
      <PrivateRoutes />
    </>
  );
}

export default App;
