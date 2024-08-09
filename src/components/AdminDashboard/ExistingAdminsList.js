import React, { useEffect, useState } from "react";
import axios from "axios";

const ExistingAdminsList = () => {
  const [districtAdminsList, setDistrictAdminsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/district-admins-list"
        );
        setDistrictAdminsList(response.data);
      } catch (err) {
        setError("Failed to fetch district admins.");
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  return (
    <div
      style={{
        overflowY: "auto",
        height: "85vh",
        width: "100%",
        padding: "3vh",
      }}
    >
      <div>
        <h2>District Admins List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
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
                    border: "1px solid #dddddd",
                    textAlign: "left",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "left",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Mobile Number
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "left",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  User Name
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "left",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  District
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "left",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Profile Photo
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "left",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {districtAdminsList.map((dadmin) => (
                <tr key={dadmin.user_id}>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {dadmin.name}
                  </td>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {dadmin.mobile_number}
                  </td>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {dadmin.username}
                  </td>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {dadmin.district}
                  </td>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "left",
                      padding: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      alt=""
                      src={dadmin.profile_pic}
                      style={{ height: "15vh", width: "15vh" }}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
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
        <h2>Mandal Admins List</h2>
      </div>
      <div>
        <h2>Village Admins List</h2>
      </div>
    </div>
  );
};

export default ExistingAdminsList;
