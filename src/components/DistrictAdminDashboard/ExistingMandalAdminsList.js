import React, { useEffect, useState } from "react";
import axios from "axios";

const ExistingMandalAdminsList = ({ district }) => {
  const [mandalAdminsList, setMandalAdminsList] = useState([]);
  useEffect(() => {
    const fetchMandalAdminsList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/mandal-admins-list/${district}`
        );
        setMandalAdminsList(response.data);
      } catch (error) {
        console.error("Error fetching mandal admins", error);
      }
    };
    fetchMandalAdminsList();
  }, [district]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        padding: "4vh",
        height: "85vh",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <div style={{ width: "100%", marginBottom: "3vh" }}>
        <h3>Mandal Admins List</h3>
        {mandalAdminsList.length === 0 ? (
          <div>No Mandal Admins Available For this Region</div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid black",
                    backgroundColor: "#f4f4f4",
                    color: "#333",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "6px",
                    backgroundColor: "#f4f4f4",
                    color: "#333",
                  }}
                >
                  Mobile Number
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "6px",
                    backgroundColor: "#f4f4f4",
                    color: "#333",
                  }}
                >
                  Username
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "6px",
                    backgroundColor: "#f4f4f4",
                    color: "#333",
                  }}
                >
                  Village
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "6px",
                    backgroundColor: "#f4f4f4",
                    color: "#333",
                  }}
                >
                  Mandal
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "6px",
                    backgroundColor: "#f4f4f4",
                    color: "#333",
                  }}
                >
                  District
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "6px",
                    backgroundColor: "#f4f4f4",
                    color: "#333",
                  }}
                >
                  Profile Photo
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "6px",
                    backgroundColor: "#f4f4f4",
                    color: "#333",
                  }}
                >
                  UID.
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "6px",
                    backgroundColor: "#f4f4f4",
                    color: "#333",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mandalAdminsList.map((madmin, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {madmin.name}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {madmin.mobile_number}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {madmin.username}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {madmin.village}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {madmin.mandal}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {madmin.district}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    <img
                      src={madmin.profile_pic}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "auto",
                        borderRadius: "4px",
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {madmin.uid}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    <button className="btn btn-dark m-1">View</button>
                    <button className="btn btn-dark m-1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <h3>Village Admins List</h3>
      </div>
    </div>
  );
};

export default ExistingMandalAdminsList;
