import { useRef, useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const SIGNIN_URL = "/login";

const SignIn = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        SIGNIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAuth({
        username: response.data.username,
        loggedIn: true,
        status: [response.data.status],
        message: response.data.message,
        })
      setEmail("");
      setPassword("");
      console.log(from);
      navigate(from, { replace: true });
    } catch (error) {
        if (!error.response) {
            setErrorMsg("No server response.")
        } else if (error.response?.status === 400) {
            setErrorMsg("Missing email or password.")
        } else if (error.response?.status === 401) {
            setErrorMsg("Wrong credentials.")
        } else {
            setErrorMsg("Login failed.")
        }
        errorRef.current.focus();
    }
  };

  return (
        <section>
          <p ref={errorRef} aria-live="assertive">
            {errorMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSignIn}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              ref={emailRef}
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>Sign In</button>
            <p>
              Don't already registered?
              <br />
              <span>
                {/*Router link*/}
                <a href="#">Sign Up</a>
              </span>
            </p>
          </form>
        </section>
  );
};

export default SignIn;
