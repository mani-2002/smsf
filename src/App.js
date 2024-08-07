import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Contactus from "./pages/Contactus";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import RequestForAdminAccess from "./pages/RequestAdminAccess/RequestForAdminAccess";

const App = () => {
  const PrivateRoute = ({ element }) => {
    const isAuthenticated = () => {
      return localStorage.getItem("token") !== null;
    };
    if (isAuthenticated) {
      return element;
    } else {
      return (
        <Navigate
          to="/login"
          state={{ message: "please login first" }}
          replace
        />
      );
    }
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin-dashboard"
            element={<PrivateRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/user-dashboard"
            element={<PrivateRoute element={<UserDashboard />} />}
          />
          <Route
            path="/request-for-admin-access"
            element={<RequestForAdminAccess />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
