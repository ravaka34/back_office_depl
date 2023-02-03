import React, { useEffect, useState } from "react";

import DisplayError from "../components/DisplayError";

import { useParams } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if(id === 1){
      setError("Veuillez vous connecte")
    }
    setEmail("randria@gmail.com");
    setPwd("123");

  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: pwd,
    };
    fetch("https://api-production-6a5a.up.railway.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
        } else {
          localStorage.setItem("admin", JSON.stringify(data.data));
          window.location.href = "/home";
        }
      })
      .catch((error) => {
        //TODO implement error
          console.error(error);
      });
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <b>Auction BO</b>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  id="email"
                  className="form-control"
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  required
                />{" "}
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={pwd}
                  onChange={(event) => setPwd(event.target.value)}
                  placeholder="Password"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            <br />
            {error && <DisplayError error={error} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
