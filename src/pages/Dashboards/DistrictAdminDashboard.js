import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const DistrictAdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [imageUrl, setImageUrl] = useState("");
  const [currentContent, setCurrentContent] = useState("default");
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      const decodedToken = jwtDecode(token);
      const loggedInUser = decodedToken.userName;
      const fetchLoggedInUserDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/user_data/${loggedInUser}`
          );
          setImageUrl(response.data.profile_pic);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };
      fetchLoggedInUserDetails();
    }
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <div style={{ display: "flex", width: "100%", height: "100vh" }}>
        <div
          style={{
            width: "20%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "20vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Link
              to="/"
              style={{
                color: "white",
                fontSize: "3.5vh",
                textDecoration: "none",
                border: "1px solid white",
                padding: "3vh",
                borderRadius: "50%",
              }}
            >
              SMS
            </Link>
          </div>
          <div
            style={{
              height: "10vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              color: "white",
              borderTop: "1px solid white",
              borderBottom: "1px solid white",
            }}
          >
            District Administrator Dashboard
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "black",
            }}
          >
            <button
              className="btn btn-dark"
              style={{
                borderRadius: "0 0 0 0",
                backgroundColor: "black",
                border: "none",
                height: "10vh",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Home
            </button>
            <button
              className="btn btn-dark"
              style={{
                borderRadius: "0 0 0 0",
                backgroundColor: "black",
                border: "none",
                height: "10vh",
              }}
              onClick={() => {
                setCurrentContent("tickets");
              }}
            >
              Tickets
            </button>
            <button
              className="btn btn-dark"
              style={{
                borderRadius: "0 0 0 0",
                backgroundColor: "black",
                border: "none",
                height: "10vh",
              }}
              onClick={() => {
                setCurrentContent("user-list-in-district");
              }}
            >
              User List in district
            </button>
            <button
              className="btn btn-dark"
              style={{
                borderRadius: "0 0 0 0",
                backgroundColor: "black",
                border: "none",
                height: "10vh",
              }}
              onClick={() => {
                setCurrentContent("requests-received-for-mandal-admin-access");
              }}
            >
              Requests Received For Mandal Admin Access
            </button>
            <button
              className="btn btn-dark"
              style={{
                borderRadius: "0 0 0 0",
                backgroundColor: "black",
                border: "none",
                height: "10vh",
              }}
              onClick={() => {
                setCurrentContent("existing-mandal-admins");
              }}
            >
              Existing Mandal Admins
            </button>
            <button
              className="btn btn-dark"
              style={{
                borderRadius: "0 0 0 0",
                backgroundColor: "black",
                border: "none",
                height: "10vh",
              }}
              onClick={() => {
                setCurrentContent("mandals-and-villages-list");
              }}
            >
              Mandals & Villages List
            </button>
            <button
              className="btn btn-dark"
              style={{
                borderRadius: "0 0 0 0",
                backgroundColor: "black",
                border: "none",
                height: "10vh",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div
          style={{
            width: "80%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "15vh",
              backgroundColor: "black",
              color: "white",
              fontSize: "4vh",
            }}
          >
            <div>Welcome to State Management System</div>
            <div>
              <img
                alt=""
                src={imageUrl}
                style={{ width: "15vh", height: "15vh", borderRadius: "50%" }}
                className="btn"
              />
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {currentContent === "default" && <div>Tickets</div>}
            {currentContent === "tickets" && <div>Tickets</div>}
            {currentContent === "user-list-in-district" && (
              <div>Users List in district</div>
            )}
            {currentContent === "requests-received-for-mandal-admin-access" && (
              <div>Requests for mandal admin access</div>
            )}
            {currentContent === "existing-mandal-admins" && (
              <div>Existing mandal Admins</div>
            )}
            {currentContent === "mandals-and-villages-list" && (
              <div>Mandals And Villages List</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictAdminDashboard;
