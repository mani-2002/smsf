import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DistrictAdminAccess from "./DistrictAdminAccess";
import MandalAdminAccess from "./MandalAdminAccess";
import VillageAdminAccess from "./VillageAdminAccess";

const RequestForAdminAccess = () => {
  const navigate = useNavigate();
  const [currentCurrent, setCurrentContent] = useState("default");
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
          width: "100%",
        }}
      >
        <div
          style={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "black",
            height: "85vh",
          }}
        >
          <div
            style={{
              color: "white",
              borderTop: "1px solid white",
              borderBottom: "1px solid white",
              padding: "2vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Request for Admin Access
          </div>
          <div
            style={{
              margin: "2vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <button
              className="btn p-3"
              style={{ color: "white" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Home
            </button>
            <button
              className="btn p-3"
              style={{ color: "white" }}
              onClick={() => {
                setCurrentContent("district-request");
              }}
            >
              Request for District Admin Access
            </button>
            <button
              className="btn p-3"
              style={{ color: "white" }}
              onClick={() => {
                setCurrentContent("mandal-request");
              }}
            >
              Request for Mandal Admin Access
            </button>
            <button
              className="btn p-3"
              style={{ color: "white" }}
              onClick={() => {
                setCurrentContent("village-request");
              }}
            >
              Request for Village Admin Access
            </button>
          </div>
        </div>
        <div
          style={{
            width: "80%",
            height: "85vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {currentCurrent === "default" && <DistrictAdminAccess />}
          {currentCurrent === "district-request" && <DistrictAdminAccess />}
          {currentCurrent === "mandal-request" && <MandalAdminAccess />}
          {currentCurrent === "village-request" && <VillageAdminAccess />}
        </div>
      </div>
    </div>
  );
};

export default RequestForAdminAccess;
