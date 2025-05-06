import React from "react";
import "./SignupStep2.css";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = ({ formData, setFormData, previousStep }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);
    //data.append("confirmPassword", formData.confirmPassword);
    data.append("email", formData.email);
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("birthday", formData.birthday);
    data.append("biography", formData.biography);
    data.append("favoriteNumber", formData.favoriteNumber);
    data.append("profilePicture", formData.profilePicture);

    try {
      const result = await axios.post("http://localhost:3001/register/second-step", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  const handlePrevious = (e) => {
    e.preventDefault();
    previousStep();
  };

  return (
    <section className="signup-wrapper">
      <div className="signup-container">
        <section className="signup-card">
          <aside className="signup-left">
            <h1 className="signup-welcome">Just a few more details</h1>
            <p className="signup-message">
              Tell us a bit about yourself to complete your profile.
            </p>
          </aside>
          <main className="signup-right">
            <header>
              <h2 className="signup-title">Join us</h2>
              <p className="signup-subtitle">
                Create your account and get started.
              </p>
            </header>
            <form onSubmit={handleSubmit}>
              <label htmlFor="birthdate" className="signup-label">
                Birthdate
              </label>
              <div className="signup-field">
                <input
                  id="birthdate"
                  type="date"
                  name="birthdate"
                  className="signup-input full-width"
                  value={formData.birthday}
                  onChange={(e) =>
                    setFormData({ ...formData, birthday: e.target.value })
                  }
                />
              </div>
              <div className="signup-field">
                <label htmlFor="biography" className="signup-label">
                  Biography
                </label>
                <textarea
                  id="biography"
                  type="text"
                  name="biography"
                  placeholder="Tell us about yourself..."
                  className="signup-input full-width biography-textarea"
                  rows="5"
                  value={formData.biography}
                  onChange={(e) =>
                    setFormData({ ...formData, biography: e.target.value })
                  }
                />
              </div>

              <div className="signup-field">
                <label htmlFor="favoriteNumber" className="signup-label">
                  Favorite Number
                </label>
                <input
                  id="favoriteNumber"
                  type="text"
                  name="favoriteNumber"
                  placeholder="Favorite Number"
                  className="signup-input full-width"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      favoriteNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="signup-field">
                <label htmlFor="profilePicture" className="signup-label">
                  Profile Picture
                </label>
                <input
                  id="profilePicture"
                  type="file"
                  name="profilePicture"
                  accept="image/jpeg,image/jpg"
                  className="signup-input-file"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profilePicture: e.target.files[0],
                    })
                  }
                />
              </div>
              <div className="signup-checkbox">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I accept the <a href="#">Terms of Use</a> &{" "}
                  <a href="#">Privacy Policy</a>
                </label>
              </div>
              <div className="signup-submit">
                <div className="submit-button-wrapper">
                  <button type="button" onClick={handlePrevious}>
                    Back
                  </button>
                  <button type="submit">Register</button>
                </div>
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
