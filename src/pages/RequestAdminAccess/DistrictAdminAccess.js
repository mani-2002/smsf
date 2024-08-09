import React, { useState } from "react";
import axios from "axios";

const DistrictAdminAccess = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [age, setAge] = useState("");
  const [village, setVillage] = useState("");
  const [mandal, setMandal] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const requestFor = "District Admin Access";

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobileNumber", mobileNumber);
    formData.append("age", age);
    formData.append("village", village);
    formData.append("mandal", mandal);
    formData.append("district", district);
    formData.append("state", state);
    formData.append("requestFor", requestFor);
    if (file) {
      formData.append("file", file);
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/request-admin-access",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setName("");
      setMobileNumber("");
      setAge("");
      setVillage("");
      setMandal("");
      setDistrict("");
      setState("");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Spinner style
  const spinnerStyle = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    borderTop: "4px solid white",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    margin: "20px auto",
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "black",
          color: "white",
          padding: "4vh",
          width: "80%",
        }}
      >
        <div style={{ fontSize: "4vh" }}>Request for District Admin Access</div>
        <div
          style={{
            margin: "3vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            onSubmit={handleRequest}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "1vh",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <input
                type="text"
                className="form-control"
                style={{ width: "48%" }}
                placeholder="Enter Your Name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="tel"
                className="form-control"
                style={{ width: "48%" }}
                placeholder="Enter Mobile Number"
                required
                maxLength={10}
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "1vh",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <input
                type="number"
                className="form-control"
                placeholder="Enter Your Age"
                style={{ width: "48%" }}
                required
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Enter Village Name"
                style={{ width: "48%" }}
                required
                value={village}
                onChange={(e) => {
                  setVillage(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "1vh",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Enter Mandal Name"
                style={{ width: "48%" }}
                required
                value={mandal}
                onChange={(e) => {
                  setMandal(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Enter District Name"
                style={{ width: "48%" }}
                required
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "1vh",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Enter State Name"
                style={{ width: "48%" }}
                required
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <input
                type="file"
                className="form-control"
                style={{ width: "48%" }}
                required
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
            <div style={{ margin: "1vh" }}>
              <button type="submit" className="btn btn-light">
                Request Access
              </button>
            </div>
            {loading && (
              <div style={spinnerStyle}>
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}
                </style>
              </div>
            )}
            <div>{message && <div>{message}</div>}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DistrictAdminAccess;
