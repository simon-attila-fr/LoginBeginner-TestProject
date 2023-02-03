import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // <<---- REGISTER ---->>
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [passwordRegVerif, setPasswordRegVerif] = useState("");
  const [registerResult, setRegisterResult] = useState("");
  const handleRegSubmit = (e) => {
    e.preventDefault();
    if (passwordReg !== passwordRegVerif) {
      console.error("Please, verify your password!");
    }

    axios
      .post(`http://localhost:${process.env.REACT_APP_BACK_PORT}/register`, {
        email: emailReg,
        username: usernameReg,
        password: passwordReg,
      })
      .then(function (response) {
        console.log("Response: ", response.status);
        setRegisterResult(response.status)
      })
      .catch(function (error) {
        console.log(error);
        setRegisterResult(error.response.status)
      });
  };

  // <<---- LOGIN ---->>
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loginResult, setLoginResult] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:${process.env.REACT_APP_BACK_PORT}/login`, {
      email: emailLogin,
      password: passwordLogin,
    })
    .then(function (response) {
      console.log(response);
      setLoginResult(response.status)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="App">
      <form className="Registration" onSubmit={handleRegSubmit}>
        <h1>Registration</h1>
        <label>E-mail:</label>
        <input
          type="email"
          autoComplete="email"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <label>Username:</label>
        <input
          type="text"
          autoComplete="username"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          autoComplete="new-password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <label>Verify password:</label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordRegVerif(e.target.value);
          }}
        />
        <input type="submit" value="Register" />
        <p>{registerResult}</p>
      </form>
      <form className="Login" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email..."
          onChange={(e) => {
            setEmailLogin(e.target.value)
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPasswordLogin(e.target.value)
          }}
        />
        <input type="submit" value="Login"/>
        <p>{loginResult}</p>
      </form>
    </div>
  );
}

export default App;
