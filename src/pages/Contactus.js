import React from "react";
import { Link } from "react-router-dom";

const Contactus = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "b9f543b9-9a00-4732-9b94-68b3af24d829");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
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
          flexDirection: "column",
          height: "80vh",
        }}
      >
        <div style={{ fontSize: "5vh", marginBottom: "3vh" }}>
          Email Your Query
        </div>
        <form
          style={{
            border: "1px solid black",
            padding: "4vh",
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          onSubmit={onSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name "
            required
            className="form-control"
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter Email "
            required
            className="form-control"
          />
          <br />
          <textarea
            style={{ width: "38vh" }}
            name="message"
            placeholder="Write your Query here...."
            className="form-control"
          ></textarea>
          <br />
          <button type="submit" className="btn btn-light">
            Send Email
          </button>
          <p style={{ color: "white" }}>{result}</p>
        </form>
      </div>
    </div>
  );
};

export default Contactus;
