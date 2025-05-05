import React from "react";
import "./Login.css";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        username,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
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
                  <h2>Username</h2>
                  <input
                    type="text"
                    placeholder="Username"
                    className="login-input full-width"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="login-field">
                  <h2>Password</h2>
                  <input
                    type="password"
                    placeholder="Password"
                    className="login-input full-width"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </fieldset>
              <div className="login-submit">
                <button type="submit">Sign in</button>
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
