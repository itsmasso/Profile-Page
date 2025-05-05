import React, { useEffect, useState } from "react";
import "./SignupStep1.css";
import { Link } from "react-router";

const Signup = ({ formData, setFormData, nextStep }) => {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    passwordMismatch: false,
  });

  useEffect(() => {
    const { firstName, lastName, email, username, password } = formData;
    const allFilled = firstName && lastName && email && username && password;
    setIsValid(allFilled);
  }, [formData]);

  const handleNext = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordMatching = formData.password === formData.confirmPassword;
    setErrors({
      email: !isEmailValid,
      passwordMismatch: !isPasswordMatching,
    });
    if (isEmailValid && isPasswordMatching) {
      nextStep();
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
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`signup-input full-width ${
                    errors.email ? "input-error" : ""
                  }`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="input-error-text">Invalid email format.</p>
                )}
              </div>
              <div className="signup-field">
                <label htmlFor="username" className="signup-label">
                  Username
                </label>
                <input
                  type="username"
                  name="username"
                  placeholder="Username"
                  className="signup-input full-width"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div className="signup-field">
                <label htmlFor="password" className="signup-label">
                  Password
                </label>
                <input
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
                  type="password"
                  placeholder="Confirm Password"
                  className="signup-input full-width"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
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
