import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import ForgotPassword from "./Components/Auth/ForgotPassword/ForgotPassword";
import PrivateRoute from "./Routes/PrivateRoute";
import Signup from "./Components/Auth/Signup/Signup";
import './App.scss';

function App() {
  return (
    <div className="container-wrapper">
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
      <PrivateRoute />
    </Router>
    </div>
  );
}


export default App;
