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
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import UserDashboard from "./pages/Dashboards/UserDashboard";
import DistrictAdminDashboard from "./pages/Dashboards/DistrictAdminDashboard";
import MandalAdminDashboard from "./pages/Dashboards/MandalAdminDashboard";
import VillageAdminDashboard from "./pages/Dashboards/VillageAdminDashboard";
import RequestForAdminAccess from "./pages/RequestAdminAccess/RequestForAdminAccess";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const role = decodedToken ? decodedToken.role : null;
    if (token && role) {
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
            path="/district-admin-dashboard"
            element={<PrivateRoute element={<DistrictAdminDashboard />} />}
          />
          <Route
            path="/mandal-admin-dashboard"
            element={<PrivateRoute element={<MandalAdminDashboard />} />}
          />
          <Route
            path="/village-admin-dashboard"
            element={<PrivateRoute element={<VillageAdminDashboard />} />}
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
