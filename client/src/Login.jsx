import React from "react";
import "./Login.css";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState({
    invalidCredentials: false,
  });

  useEffect(() => {
    const allCredentialsFilled = username && password;
    setIsValid(allCredentialsFilled);
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      console.log(result);
      if (result.data.status === "Success") {
        navigate("/home");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError({ invalidCredentials: true });
      } else {
        console.error("Login error: ", err);
      }
    }
  };
  return (
    <section className="login-wrapper">
      <div className="login-container">
        <section className="login-card">
          <main className="login-left">
            <header>
              <h2 className="login-title">Sign In</h2>
            </header>
            <form onSubmit={handleSubmit}>
              <fieldset className="login-grid">
                <div className="login-field">
                  <label htmlFor="username" className="login-label">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="login-input full-width"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="login-field">
                  <label htmlFor="password" className="login-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="login-input full-width"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error.invalidCredentials && (
                    <p className="input-error-text">
                      Invalid username or password.
                    </p>
                  )}
                </div>
              </fieldset>
              <div className="login-submit">
                <button type="submit" disabled={!isValid}>
                  Sign in
                </button>
              </div>
            </form>
          </main>
          <aside className="login-right">
            <h1 className="login-welcome">Welcome Back</h1>
            <p className="login-message">Don't have an account?</p>
            <Link to="/register" className="register-link">
              Sign up
            </Link>
          </aside>
        </section>
      </div>
    </section>
  );
};

export default Login;
