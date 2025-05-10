import React, { useState, useEffect } from "react";
import "./EditProfileContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const EditProfileContainer = ({ user, setUser, onEditClick }) => {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    invalidEmail: false,
    emailInUse: false,
    usernameInUse: false,
  });
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    password: "",
    email: user?.email || "",
    birthday: user?.birthday || "",
    favoriteNumber: user?.favoriteNumber || "",
    biography: user?.biography || "",
  });
  useEffect(() => {
    const { firstName, lastName, email, username, password } = formData;
    const allFilled = firstName && lastName && email && username && password;
    setIsValid(allFilled);
  }, [formData]);

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailHasError = !emailRegex.test(formData.email);
      setErrors({
        invalidEmail: emailHasError,
        emailInUse: false,
        usernameInUse: false,
      });
      if (emailHasError) return;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/edit-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!data.success) {
        if (data.message === "Email already exists.") {
          setErrors((prev) => ({ ...prev, emailInUse: true }));
        } else if (data.message === "Username already exists.") {
          setErrors((prev) => ({ ...prev, usernameInUse: true }));
        }
        return;
      }

      console.log("Updated:", data);
      setUser(data.user);
      onEditClick();
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };
  return (
    <section className="edit-profile-container">
      <form onSubmit={handleSubmit}>
        <fieldset className="edit-container-info">
          <div className="edit-form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <small>Enter your first name</small>
          </div>

          <div className="edit-form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <small>Enter your last name</small>
          </div>

          <div className="edit-form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <small>Choose a username</small>
            {errors.usernameInUse && (
              <p className="input-error-text">
                This username is already taken.
              </p>
            )}
          </div>

          <div className="edit-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            <small>Choose a secure password</small>
          </div>

          <div className="edit-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <small>Enter your email</small>
            {errors.invalidEmail ? (
              <p className="input-error-text">Invalid email format.</p>
            ) : errors.emailInUse ? (
              <p className="input-error-text">This email is already in use.</p>
            ) : null}
          </div>

          <div className="edit-form-group">
            <label htmlFor="birthday">Birthday</label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              value={formatDateForInput(formData.birthday)}
              onChange={handleChange}
            />
            <small>MM/DD/YYYY</small>
          </div>

          <div className="edit-form-group">
            <label htmlFor="favoriteNumber">Favorite Number</label>
            <input
              id="favoriteNumber"
              name="favoriteNumber"
              type="number"
              placeholder="7"
              value={formData.favoriteNumber}
              onChange={handleChange}
            />
            <small>What's your favorite number?</small>
          </div>

          <div className="edit-form-group">
            <label htmlFor="biography">Biography</label>
            <textarea
              id="biography"
              name="biography"
              placeholder="Tell us something about yourself"
              value={formData.biography}
              onChange={handleChange}
            ></textarea>
          </div>
        </fieldset>
        <div className="edit-bottom-buttons">
          <button
            type="submit"
            className="edit-profile-buttons"
            disabled={!isValid}
          >
            <FontAwesomeIcon
              icon={faCheck}
              size="m"
              style={{ marginRight: "0.4rem" }}
            />
            Save Changes
          </button>
          <button className="edit-profile-buttons" onClick={onEditClick}>
            <FontAwesomeIcon
              icon={faXmark}
              size="m"
              style={{ marginRight: "0.4rem" }}
            />
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProfileContainer;
