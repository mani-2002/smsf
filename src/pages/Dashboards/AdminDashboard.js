import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import ExistingAdminsList from "../../components/AdminDashboard/ExistingAdminsList";
import ViewDistrictsMandalsVillages from "../../components/AdminDashboard/ViewDistrictsMandalsVillages";
import EditAdminDetails from "../../components/AdminDashboard/EditAdminDetails";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [imageUrl, setImageUrl] = useState(null);
  const [currentDashboardContent, setCurrentDashboardContent] =
    useState("default");
  const [requestsForAdminAccess, setRequestsForAdminAccess] = useState([]);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState([]);

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
          setLoggedInUserDetails(response.data);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };
      const fetchRequests = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3001/requests-for-admin-access"
          );
          setRequestsForAdminAccess(response.data);
        } catch (error) {
          console.error("Error fetching requests:", error);
        }
      };
      fetchLoggedInUserDetails();
      fetchRequests();
    }
  }, [navigate, token]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [mandalVisibility, setMandalVisibility] = useState(false);
  const [villageVisibility, setVillageVisibility] = useState(false);
  const [districtsList, setDistrictsList] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [mandalsList, setMandalsList] = useState([]);
  const [selectedMandal, setSelectedMandal] = useState("");
  const [villagesList, setVillagesList] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [userTableVisibility, setUserTableVisibility] = useState(false);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/district-list");
        setDistrictsList(response.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    fetchDistricts();
  }, []);

  const handleDistrictSelect = async (districtId) => {
    setMandalVisibility(true);
    const dis = districtsList.find(
      (district) => district.district_id === parseInt(districtId, 10)
    )?.district_name;
    setSelectedDistrict(dis);
    try {
      const response = await axios.get(
        `http://localhost:3001/mandal-list/${dis}`
      );
      setMandalsList(response.data);
    } catch (error) {
      console.log("Error fetching mandals");
    }
  };

  const handleMandalSelect = async (eventKey) => {
    setVillageVisibility(true);
    setSelectedMandal(eventKey);
    const man = eventKey;
    const response = await axios.get(
      `http://localhost:3001/village-list/${man}`
    );
    setVillagesList(response.data);
  };

  const handleVillageSelect = async (eventKey) => {
    setSelectedVillage(eventKey);
    const vil = eventKey;
    const response = await axios.get(`http://localhost:3001/user-list/${vil}`);
    setUsersList(response.data);
    setUserTableVisibility(true);
  };

  const [userDetails, setUserDetails] = useState([]);

  const fetchViewUserDetails = async (i) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user-details/${i}`
      );
      setUserDetails([response.data]);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleUserDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/user-delete/${id}`);
      alert("User Deleted Successfully");
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const handleRequestDelete = async (requestId) => {
    try {
      await axios.delete(`http://localhost:3001/delete-request/${requestId}`);
      setRequestsForAdminAccess(
        requestsForAdminAccess.filter(
          (request) => request.request_id !== requestId
        )
      );
      alert("Request Deleted Successfully");
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.post(`http://localhost:3001/accept-request/${requestId}`);
      await axios.delete(`http://localhost:3001/delete-request/${requestId}`);
      setRequestsForAdminAccess(
        requestsForAdminAccess.filter(
          (request) => request.request_id !== requestId
        )
      );
    } catch (error) {
      console.error("Failed to accept the request");
    }
  };

  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const handleButtonClick = () => {
    setPopupVisible(!isPopupVisible);
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
            Administrator Dashboard
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
                setCurrentDashboardContent("ticketsfromdistrictadmin");
              }}
            >
              Tickets from Users
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
                setCurrentDashboardContent("user-list");
              }}
            >
              User List
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
                setCurrentDashboardContent("receivedrequestsforadminaccess");
              }}
            >
              Requests Received For Admin Access
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
                setCurrentDashboardContent("existingadminslist");
              }}
            >
              Existing Admins List
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
                setCurrentDashboardContent("viewdistrictsmandalsvillageslist");
              }}
            >
              View Districts, Mandals & Villages List
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
              height: "12vh",
              backgroundColor: "black",
              color: "white",
              fontSize: "4vh",
              flexDirection: "row",
            }}
          >
            <div>Welcome to State Management System</div>
            <div style={{ margin: "0", padding: "0" }}>
              <button
                onClick={handleButtonClick}
                className="btn"
                style={{ top: "10px", right: "10px" }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="User"
                    style={{
                      width: "9vh",
                      height: "9vh",
                      margin: "2vh",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <p>No Image Available</p>
                )}
              </button>
              {isPopupVisible && (
                <div
                  style={{
                    position: "absolute",
                    top: "13vh",
                    right: "10px",
                    backgroundColor: "black",
                    padding: "2vh",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                    color: "white",
                    zIndex: 1000,
                    width: "20%",
                    fontSize: "3vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                  ref={popupRef}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "5vh",
                      width: "0",
                      height: "0",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: "10px solid black",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div>{loggedInUserDetails.name}</div>
                    <div>+91{loggedInUserDetails.mobile_number}</div>
                    <div>Telangana State {loggedInUserDetails.username}</div>
                    <div>
                      <button
                        className="btn btn-light"
                        onClick={() => {
                          setCurrentDashboardContent("edit-admin-details");
                        }}
                      >
                        Edit Details
                      </button>
                      <button
                        className="btn btn-light m-2"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
            {currentDashboardContent === "default" && (
              <div>Tickets from users</div>
            )}
            {currentDashboardContent === "ticketsfromdistrictadmin" && (
              <div>Tickets from users</div>
            )}
            {currentDashboardContent === "user-list" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "90%",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "90%",
                    height: "10vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "4vh",
                  }}
                >
                  Select From Below Dropdown to Fetch User Details
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <Dropdown onSelect={handleDistrictSelect}>
                      <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        {selectedDistrict || "Select District"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {districtsList.map((district) => (
                          <Dropdown.Item
                            key={district.district_id}
                            eventKey={district.district_id}
                          >
                            {district.district_name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div>
                    {mandalVisibility && (
                      <Dropdown onSelect={handleMandalSelect}>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                          {selectedMandal || "Select Mandal"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {mandalsList.map((mandal, index) => (
                            <Dropdown.Item key={index} eventKey={mandal.mandal}>
                              {mandal.mandal}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                  <div>
                    {villageVisibility && (
                      <Dropdown onSelect={handleVillageSelect}>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                          {selectedVillage || "Select Village"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {villagesList.map((village, index) => (
                            <Dropdown.Item
                              key={index}
                              eventKey={village.village}
                            >
                              {village.village}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </div>
                <div style={{ margin: "5vh" }}>
                  {userTableVisibility && (
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            S.No
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            Name
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            Mobile Number
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            Username
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            Village
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            Mandal
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            District
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            Unique ID
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersList.map((user) => (
                          <tr key={user.user_id}>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {user.user_id}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {user.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {user.mobile_number}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {user.username}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {user.village}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {user.mandal}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {user.district}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {user.uid}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                                textAlign: "center",
                                display: "flex",
                              }}
                            >
                              <button
                                className="btn btn-dark m-1"
                                onClick={() => {
                                  setCurrentDashboardContent("user-profile");
                                  fetchViewUserDetails(user.user_id);
                                }}
                              >
                                View
                              </button>
                              <button
                                className="btn btn-dark m-1"
                                onClick={() => {
                                  handleUserDelete(user.user_id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
            {currentDashboardContent === "user-profile" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {userDetails.map((user, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      padding: "4vh",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        width: "100%",
                      }}
                    >
                      <div style={{ width: "20%" }}>
                        <button
                          onClick={() => {
                            setCurrentDashboardContent("user-list");
                          }}
                          className="btn btn-dark"
                        >
                          go back
                        </button>
                      </div>
                      <div
                        style={{
                          width: "80%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "left",
                        }}
                      >
                        <div style={{ fontWeight: "bold", fontSize: "4vh" }}>
                          {user.name} Details
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "right",
                        width: "100%",
                        padding: "3vh",
                      }}
                    ></div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        border: "1px solid black",
                        height: "60vh",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "40%",
                          height: "55vh",
                          paddingLeft: "2vh",
                        }}
                      >
                        <img
                          src={user.profile_pic}
                          alt={`${user.name}'s profile`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          width: "60%",
                          height: "60vh",
                          justifyContent: "center",
                          padding: "2vh",
                        }}
                      >
                        <div style={{ width: "90%" }}>
                          <p>
                            <b>Name:</b> {user.name}
                          </p>
                          <p>
                            <b>Mobile Number:</b> {user.mobile_number}
                          </p>
                          <p>
                            <b>Username: </b>
                            {user.username}
                          </p>
                          <p>
                            <b>Village: </b>
                            {user.village}
                          </p>
                          <p>
                            <b>Mandal: </b>
                            {user.mandal}
                          </p>
                          <p>
                            <b>District: </b>
                            {user.district}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {currentDashboardContent === "receivedrequestsforadminaccess" && (
              <div
                style={{
                  width: "100%",
                  height: "88vh",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {requestsForAdminAccess.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "2vh",
                    }}
                  >
                    No requests available.
                  </div>
                ) : (
                  requestsForAdminAccess.map((request) => (
                    <div
                      key={request.request_id}
                      style={{
                        border: "1px solid black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "98%",
                        backgroundColor: "black",
                        color: "white",
                        padding: "2vh",
                        margin: "1vh",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                          padding: "0 5vh 0 5vh",
                        }}
                      >
                        <div
                          style={{
                            width: "80%",
                            fontSize: "3vh",
                            fontWeight: "bold",
                          }}
                        >
                          Request From {request.name}
                        </div>
                        <div style={{ width: "20%" }}>
                          {request.req_date_and_time}
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
                        Requested for {request.request_for}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            width: "30%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            alt=""
                            src={request.photo}
                            style={{
                              height: "25vh",
                              width: "25vh",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "50%",
                          }}
                        >
                          <div>Name: {request.name}</div>
                          <div>Mobile Number: {request.mobile_number}</div>
                          <div>Age: {request.age}</div>
                          <div>Village: {request.village}</div>
                          <div>Mandal: {request.mandal}</div>
                          <div>District: {request.district}</div>
                          <div>State: {request.state}</div>
                        </div>
                        <div
                          style={{
                            width: "20%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <button
                            className="btn btn-light w-75 m-1"
                            onClick={() =>
                              handleAcceptRequest(request.request_id)
                            }
                          >
                            Accept Request
                          </button>
                          <button
                            className="btn btn-light w-75 m-1"
                            onClick={() =>
                              handleRequestDelete(request.request_id)
                            }
                          >
                            Reject Request
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {currentDashboardContent === "existingadminslist" && (
              <ExistingAdminsList role={loggedInUserDetails.role} />
            )}
            {currentDashboardContent === "viewdistrictsmandalsvillageslist" && (
              <ViewDistrictsMandalsVillages />
            )}
            {currentDashboardContent === "edit-admin-details" && (
              <EditAdminDetails role={loggedInUserDetails.role} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
