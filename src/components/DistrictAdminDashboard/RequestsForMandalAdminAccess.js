import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestsForMandalAdminAccess = () => {
  const [requestsForMandalAdminAccess, setRequestsForMandalAdminAccess] =
    useState([]);
  useEffect(() => {
    const fetchRequestsForMandalAdminAccess = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/requests-for-mandal-admin-access"
        );
        setRequestsForMandalAdminAccess(response.data);
      } catch (error) {
        console.error(
          "failed to fetch requests for mandal admin access",
          error
        );
      }
    };
    fetchRequestsForMandalAdminAccess();
  }, []);

  const handleAcceptMandalAdminRequest = async (requestId) => {
    try {
      await axios.post(
        `http://localhost:3001/accept-mandal-admin-access-request/${requestId}`
      );
      setRequestsForMandalAdminAccess(
        requestsForMandalAdminAccess.filter(
          (request) => request.request_id !== requestId
        )
      );
    } catch (error) {
      console.error("Error accepting the request", error);
    }
  };

  const handleRejectMandalAdminRequest = async (requestId) => {
    try {
      await axios.delete(`http://localhost:3001/delete-request/${requestId}`);
      setRequestsForMandalAdminAccess(
        requestsForMandalAdminAccess.filter(
          (request) => request.request_id !== requestId
        )
      );
      alert("Request Deleted Successfully");
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        padding: "2vh",
        height: "85vh",
        overflowY: "auto",
      }}
    >
      {requestsForMandalAdminAccess.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2vh" }}>
          No Requests Available
        </div>
      ) : (
        requestsForMandalAdminAccess.map((request) => (
          <div
            key={request.request_id}
            style={{
              backgroundColor: "black",
              width: "98%",
              color: "white",
              margin: "1vh",
              padding: "2vh",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "3vh" }}>
                Request From {request.name}
              </div>
              <div>{request.req_date_and_time}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              Requested For {request.request_for}
            </div>
            <div style={{ display: "flex", width: "100%" }}>
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
                  style={{ height: "25vh", width: "25vh", borderRadius: "50%" }}
                />
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
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
                  className="btn btn-light m-1"
                  onClick={() =>
                    handleAcceptMandalAdminRequest(request.request_id)
                  }
                  aria-label={`Accept request from ${request.name}`}
                >
                  Accept Request
                </button>
                <button
                  className="btn btn-light m-1"
                  onClick={() =>
                    handleRejectMandalAdminRequest(request.request_id)
                  }
                  aria-label={`Delete request from ${request.name}`}
                >
                  Delete Request
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestsForMandalAdminAccess;
