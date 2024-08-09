import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/login", {
        userName,
        password,
      });
      const { token,role } = response.data;
      localStorage.setItem("token", token);
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if(role === 'user') {
        navigate("/user-dashboard");
      } else if (role === 'dadmin'){
        navigate('/district-admin-dashboard');
      } else if(role === 'madmin'){
        navigate('/mandal-admin-dashboard');
      } else if(role === 'vadmin'){
        navigate('/village-admin-dashboard');
      }
      setMessage(response.data.message);
      setUserName("");
      setPassword("");
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn) {
        console.log("your session haven't expired yet...");
      }
    });
  }, []);
  return (
    <div>
      <div
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
        <div
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "85vh",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "4vh",
            backgroundColor: "black",
            color: "white",
            width: "40%",
          }}
        >
          <h2>Login to Your Portal</h2>
          <form
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              margin: "2vh",
            }}
            onSubmit={handleLogin}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <br />
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <input
              type="submit"
              className="btn btn-light"
              disabled={loading}
              value="Login"
            />
            <br />
            {loading && <Spinner animation="border" />}
            {message && <p style={{ color: "white" }}>{message}</p>}
          </form>
          <Link to="/forgot-password" style={{ color: "white" }}>
            forgot password?
          </Link>
          <p>
            Does not have an account Yet?{" "}
            <Link to="/signup" style={{ color: "white" }}>
              Signup
            </Link>
          </p>
          <Link to="/" style={{ color: "white" }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
