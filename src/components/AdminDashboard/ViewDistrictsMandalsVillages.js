import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewDistrictsMandalsVillages = () => {
  const [districtsList, setDistrictsList] = useState([]);
  const [mandalsList, setMandalsList] = useState([]);
  const [villagesList, setVillagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/districts-list"
        );
        setDistrictsList(response.data);
      } catch (error) {
        setError("Failed to fetch districts.");
      } finally {
        setLoading(false);
      }
    };
    const fetchMandals = async () => {
      try {
        const response = await axios.get("http://localhost:3001/mandals-list");
        setMandalsList(response.data);
      } catch (error) {
        setError("Failed to fetch mandals.");
      } finally {
        setLoading(false);
      }
    };
    const fetchVillages = async () => {
      try {
        const response = await axios.get("http://localhost:3001/villages-list");
        setVillagesList(response.data);
      } catch (error) {
        setError("Failed to fetch villages.");
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
    fetchMandals();
    fetchVillages();
  }, []);

  return (
    <div
      style={{
        overflowY: "auto",
        height: "85vh",
        width: "100%",
        padding: "3vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "60%" }}>
        <h2>Districts List</h2>
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
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  District ID.
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  District Name
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {districtsList.map((district) => (
                <tr key={district.district_id}>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {district.district_id}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {district.district_name}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    <button className="btn btn-dark">Edit</button>
                    <button className="btn btn-dark m-1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div style={{ width: "60%" }}>
        <h2>Mandals List</h2>
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
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Mandal ID.
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Mandal Name
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mandalsList.map((mandal) => (
                <tr key={mandal.mandal_id}>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {mandal.mandal_id}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {mandal.mandal_name}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    <button className="btn btn-dark">Edit</button>
                    <button className="btn btn-dark m-1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div style={{ width: "60%" }}>
        <h2>Villages List</h2>
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
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Village ID.
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Village Name
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {villagesList.map((village) => (
                <tr key={village.village_id}>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {village.village_id}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {village.village_name}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    <button className="btn btn-dark">Edit</button>
                    <button className="btn btn-dark m-1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewDistrictsMandalsVillages;
