import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import ForgotPassword from "./Components/Auth/ForgotPassword/ForgotPassword";
import PrivateRoute from "./Routes/PrivateRoute";
import Signup from "./Components/Auth/Signup/Signup";
import CustomerTable from "./Components/Common/Table/OrdersTable/CustomerTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/table" element={<CustomerTable /> }/>
      </Routes>
      <PrivateRoute />
    </Router>
  );
}

export default App;
