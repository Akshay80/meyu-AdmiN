import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<h1>Login</h1>} />
      </Routes>
      <PrivateRoute />
    </Router>
  );
}

export default App;
