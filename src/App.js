import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import ForgotPassword from "./Components/Auth/ForgotPassword/ForgotPassword";
import PrivateRoute from "./Routes/PrivateRoute";
import Signup from "./Components/Auth/Signup/Signup";
import Path  from './Constant/RouterConstant'


function App() {
  return (
    <Router>
      <Routes>
        <Route path={Path.signup} element={<Signup />} />
        <Route path={Path.login} element={<Login/>} />
        <Route path={Path.forgotPassword} element={<ForgotPassword />} />
      </Routes>
      <PrivateRoute />
    </Router>
  );
}


export default App;
