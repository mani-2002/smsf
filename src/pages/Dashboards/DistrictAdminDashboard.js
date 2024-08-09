import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import UserListInDistricts from "../../components/DistrictAdminDashboard/UserListInDistricts";
import RequestsForMandalAdminAccess from "../../components/DistrictAdminDashboard/RequestsForMandalAdminAccess";
import ExistingMandalAdminsList from "../../components/DistrictAdminDashboard/ExistingMandalAdminsList";

const DistrictAdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [imageUrl, setImageUrl] = useState("");
  const [currentContent, setCurrentContent] = useState("default");
  const [district, setDistrict] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);

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
          setDistrict(response.data.district);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };
      fetchLoggedInUserDetails();
    }
  }, [navigate, token]);

  useEffect(() => {
    if (currentContent === "user-details" && userId !== null) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/user-details/${userId}`
          );
          setUserDetails(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUserDetails();
    }
  }, [currentContent, userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleViewUser = (userId) => {
    setUserId(userId);
    setCurrentContent("user-details");
  };
  const handleDeleteUser = async (userId) => {
    setUserId(userId);
    await axios.delete(`http://localhost:3001/user-delete/${userId}`);
    alert("User Deleted Successfully");
  };
  const handleGoBack = () => {
    setCurrentContent("user-list-in-district");
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
              <div style={{ width: "100%" }}>
                <UserListInDistricts
                  district={district}
                  onViewUser={handleViewUser}
                  onDeleteUser={handleDeleteUser}
                />
              </div>
            )}
            {currentContent === "requests-received-for-mandal-admin-access" && (
              <RequestsForMandalAdminAccess />
            )}
            {currentContent === "existing-mandal-admins" && (
              <ExistingMandalAdminsList district={district} />
            )}
            {currentContent === "mandals-and-villages-list" && (
              <div>Mandals And Villages List</div>
            )}
            {currentContent === "user-details" && userDetails && (
              <div style={{ width: "100%", padding: "3vh" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "20%" }}>
                    <button className="btn btn-dark" onClick={handleGoBack}>
                      go back
                    </button>
                  </div>
                  <div
                    style={{
                      width: "80%",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "4vh",
                      fontWeight: "bold",
                    }}
                  >
                    {userDetails.name} Details
                  </div>
                </div>
                <div
                  style={{
                    border: "1px solid black",
                    margin: "3vh 0 0 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "35%", padding: "4vh" }}>
                    <img
                      src={userDetails.profile_pic}
                      alt=""
                      style={{ height: "45vh", width: "45vh" }}
                    />
                  </div>
                  <div style={{ width: "60%" }}>
                    <div>
                      <p>
                        <b>Name:</b> {userDetails.name}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>Mobile Number:</b> {userDetails.mobile_number}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>Username:</b> {userDetails.username}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>Village:</b> {userDetails.village}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>Mandal:</b> {userDetails.mandal}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>District:</b> {userDetails.district}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictAdminDashboard;
