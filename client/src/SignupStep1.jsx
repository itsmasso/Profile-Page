import React, { useEffect, useState } from "react";
import "./SignupStep1.css";
import { Link } from "react-router";
import axios from "axios";

const Signup = ({ formData, setFormData, nextStep }) => {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    invalidEmail: false,
    emailInUse: false,
    usernameInUse: false,
    passwordMismatch: false,
  });

  useEffect(() => {
    const { firstName, lastName, email, username, password } = formData;
    const allFilled = firstName && lastName && email && username && password;
    setIsValid(allFilled);
  }, [formData]);

  const handleNext = async (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailHasError = !emailRegex.test(formData.email);
    const passwordMismatchError = password !== confirmPassword;
    setErrors({
      invalidEmail: emailHasError,
      passwordMismatch: passwordMismatchError,
      emailInUse: false,
      usernameInUse: false,
    });
    if (emailHasError || passwordMismatchError) return;
    try {
      const reponse = await axios.post(
        "http://localhost:3001/api/users/register/first-step",
        {
          username,
          email,
        },
        {
          withCredentials: true,
        }
      );

      if (!reponse.data.success) {
        if (reponse.data.message === "Email already exists.") {
          setErrors((prev) => ({ ...prev, emailInUse: true }));
        } else if (reponse.data.message === "Username already exists.") {
          setErrors((prev) => ({ ...prev, usernameInUse: true }));
        }
        return;
      }

      nextStep();
    } catch (err) {
      console.error("Error checking user info:", err);
    }
  };

  return (
    <section className="signup-wrapper">
      <div className="signup-container">
        <section className="signup-card">
          <aside className="signup-left">
            <h1 className="signup-welcome">Welcome</h1>
            <p className="signup-message">
              We're glad you're here. Let's get you set up.
            </p>
          </aside>
          <main className="signup-right">
            <header>
              <h2 className="signup-title">Join us</h2>
              <p className="signup-subtitle">
                Create your account and get started.
              </p>
            </header>
            <form onSubmit={handleNext}>
              <fieldset className="signup-grid">
                <div className="signup-field">
                  <label htmlFor="firstName" className="signup-label">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="signup-input full-width"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="signup-field">
                  <label htmlFor="lastName" className="signup-label">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="signup-input full-width"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </fieldset>
              <div className="signup-field">
                <label htmlFor="email" className="signup-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`signup-input full-width ${
                    errors.invalidEmail ? "input-error" : ""
                  }`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.invalidEmail ? (
                  <p className="input-error-text">Invalid email format.</p>
                ) : errors.emailInUse ? (
                  <p className="input-error-text">
                    This email is already in use.
                  </p>
                ) : null}
              </div>
              <div className="signup-field">
                <label htmlFor="username" className="signup-label">
                  Username
                </label>
                <input
                  id="username"
                  type="username"
                  name="username"
                  placeholder="Username"
                  className="signup-input full-width"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                {errors.usernameInUse && (
                  <p className="input-error-text">
                    This username is already taken.
                  </p>
                )}
              </div>
              <div className="signup-field">
                <label htmlFor="password" className="signup-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="signup-input full-width"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="signup-field">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="signup-input full-width"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                {errors.passwordMismatch && (
                  <p className="input-error-text">Passwords do not match.</p>
                )}
              </div>

              <div className="signup-next">
                <button type="submit" disabled={!isValid}>
                  Next
                </button>
                <div className="login-redirect">
                  <p>Already have an account?</p>
                  <Link to="/login" className="login-link">
                    Login here
                  </Link>
                </div>
              </div>
            </form>
          </main>
        </section>
      </div>
    </section>
  );
};

export default Signup;
