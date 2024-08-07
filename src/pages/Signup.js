import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [village, setVillage] = useState("");
  const [mandal, setMandal] = useState("");
  const [district, setDistrict] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobileNumber", mobileNumber);
    formData.append("userName", userName);
    formData.append("password", password);
    formData.append("village", village);
    formData.append("mandal", mandal);
    formData.append("district", district);
    if (file) {
      formData.append("file", file);
    }
    try {
      const response = await axios.post(
        "https://smsb-pa7e.onrender.com/signup",
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
      setUserName("");
      setPassword("");
      setVillage("");
      setMandal("");
      setDistrict("");
      setFile(null);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: "15vh",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20%",
            height: "15vh",
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
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            height: "15vh",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Link
              to="/"
              style={{
                color: "white",
                fontSize: "3.5vh",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
            <Link
              to="/aboutus"
              style={{
                color: "white",
                fontSize: "3.5vh",
                textDecoration: "none",
              }}
            >
              About Us
            </Link>
            <Link
              to="/contactus"
              style={{
                color: "white",
                fontSize: "3.5vh",
                textDecoration: "none",
              }}
            >
              Contact Us
            </Link>
            <Link
              to="/login"
              style={{
                color: "white",
                fontSize: "3.5vh",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                color: "white",
                fontSize: "3.5vh",
                textDecoration: "none",
              }}
            >
              Signup
            </Link>
          </div>
        </nav>
      </header>
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "85vh",
        }}
      >
        <div
          style={{
            display: "flex",
            border: "1px solid black",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "4vh",
            backgroundColor: "black",
            color: "white",
            width: "80%",
          }}
        >
          <h2>Register Here...</h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            onSubmit={handleRegister}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "1vh",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <input
                type="text"
                className="form-control"
                style={{ width: "48%" }}
                placeholder="Enter Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                style={{ width: "48%" }}
                placeholder="Enter Mobile Number"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                maxLength={10}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "1vh",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                style={{ width: "48%" }}
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                style={{ width: "48%" }}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "1vh",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Enter Village Name"
                style={{ width: "48%" }}
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Enter Mandal Name"
                style={{ width: "48%" }}
                required
                value={mandal}
                onChange={(e) => setMandal(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "1vh",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Enter District Name"
                style={{ width: "48%" }}
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
              <input
                type="file"
                className="form-control"
                style={{ width: "48%" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div style={{ margin: "1vh" }}>
              <button
                type="submit"
                className="btn btn-light d-flex align-items-center"
                disabled={loading}
                style={{ position: "relative" }}
              >
                {loading ? (
                  <div
                    className="spinner-border text-light"
                    role="status"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>
            {message && <p style={{ color: "white" }}>{message}</p>}
          </form>
          <hr
            style={{
              borderColor: "white",
              borderStyle: "solid",
              width: "85%",
            }}
          />
          <div>
            Already Have an Account?{" "}
            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
          </div>
          <div>
            <Link to="/" style={{ color: "white" }}>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
