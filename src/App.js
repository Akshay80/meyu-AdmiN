import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import ForgotPassword from "./Components/Auth/ForgotPassword/ForgotPassword";
import PrivateRoute from "./Routes/PrivateRoute";
import Signup from "./Components/Auth/Signup/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
      <PrivateRoute />
    </Router>
  );
}

export default App;
