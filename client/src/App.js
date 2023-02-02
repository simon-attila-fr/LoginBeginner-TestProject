import React, { useState } from 'react';
import './App.css';

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  return (
    <div className="App">
      <div className="Registration">
        <h1>Registration</h1>
        <label>Username:</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button>Register</button>
      </div>
      <div className="Login">
        <h1>Login</h1>
        <input type="text" placeholder="Username..." />
        <input type="text" placeholder="Password..." />
        <button>Login</button>
      </div>
    </div>
  );
}

export default App;
