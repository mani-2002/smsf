import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

const UserListInDistricts = ({ district, onViewUser, onDeleteUser }) => {
  const [mandalsList, setMandalsList] = useState([]);
  const [selectedMandal, setSelectedMandal] = useState("");
  const [villageVisibility, setVillageVisibility] = useState(false);
  const [villagesList, setVillagesList] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [userTableVisibility, setUserTableVisibility] = useState(false);

  useEffect(() => {
    const fetchMandals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/mandal-list/${district}`
        );
        setMandalsList(response.data);
      } catch (error) {
        console.error("Error fetching mandals:", error);
      }
    };
    fetchMandals();
  }, [district]);

  const handleMandalSelect = async (eventKey) => {
    setSelectedMandal(eventKey);
    setVillageVisibility(true);
    setSelectedVillage(""); // Clear selected village when mandal changes
    try {
      const response = await axios.get(
        `http://localhost:3001/village-list/${eventKey}`
      );
      setVillagesList(response.data);
      setUsersList([]); // Clear user list when mandal changes
      setUserTableVisibility(false); // Hide user table when mandal changes
    } catch (error) {
      console.error("Error fetching villages:", error);
    }
  };

  const handleVillageSelect = async (eventKey) => {
    setSelectedVillage(eventKey);
    try {
      const response = await axios.get(
        `http://localhost:3001/user-list/${eventKey}`
      );
      setUsersList(response.data);
      setUserTableVisibility(true);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleViewClick = (userId) => {
    onViewUser(userId);
  };

  const handleDelete = async (userId) => {
    await onDeleteUser(userId);
    // Refresh user list after deletion
    try {
      const response = await axios.get(
        `http://localhost:3001/user-list/${selectedVillage}`
      );
      setUsersList(response.data);
      if (response.data.length === 0) {
        setUserTableVisibility(false);
      }
    } catch (error) {
      console.error("Error refreshing user list:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          padding: "5vh",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div>
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
        </div>
        {villageVisibility && (
          <div>
            <Dropdown onSelect={handleVillageSelect}>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {selectedVillage || "Select Village"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {villagesList.map((village, index) => (
                  <Dropdown.Item key={index} eventKey={village.village}>
                    {village.village}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
      <div style={{ padding: "4vh" }}>
        {userTableVisibility && usersList.length > 0 && (
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
                      onClick={() => handleViewClick(user.user_id)}
                      className="btn btn-dark m-1"
                    >
                      View
                    </button>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {userTableVisibility && usersList.length === 0 && (
          <div>No users found.</div>
        )}
      </div>
    </div>
  );
};

export default UserListInDistricts;
