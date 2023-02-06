import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";

const EMAIL_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const usernameRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "/register";

const Register = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [passwordVerif, setPasswordVerif] = useState("");
  const [validPasswordVerif, setValidPasswordVerif] = useState(false);
  const [passwordVerifFocus, setPasswordVerifFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_regex.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = usernameRegex.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_regex.test(password);
    setValidPassword(result);
    const match =
      password === passwordVerif &&
      password.length >= 8 &&
      passwordVerif.length >= 8;
    setValidPasswordVerif(match);
  }, [password, passwordVerif, validPasswordVerif]);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password, passwordVerif]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email, username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setEmail("");
      setUsername("");
      setPassword("");
      setPasswordVerif("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No server response.");
      } else if (error.response.status === 409) {
        setErrorMsg("Username or email taken.");
      } else {
        setErrorMsg("Registration failed.");
      }
      errorRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errorRef} aria-live="assertive">
            {errorMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              autoComplete="off"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              required
              aria-invalid={validUsername ? "false" : "true"}
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? "false" : "true"}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <label htmlFor="passwordVerif">Verify you email:</label>
            <input
              type="password"
              id="passwordVerif"
              autoComplete="off"
              onChange={(e) => setPasswordVerif(e.target.value)}
              required
              aria-invalid={validPasswordVerif ? "false" : "true"}
              onFocus={() => {
                setPasswordVerifFocus(true);
              }}
              value={passwordVerif}
              onBlur={() => setPasswordVerifFocus(false)}
            />
            <button
              disabled={
                !validEmail ||
                !validUsername ||
                !validPassword ||
                !validPasswordVerif
                  ? true
                  : false
              }
            >
              Sign Up
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
