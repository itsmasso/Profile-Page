import React from "react";
import "./EditProfileContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const EditProfileContainer = () => {
  return (
    <section className="edit-profile-container">
      <div className="edit-container-info">
        <div class="edit-form-group">
          <label>First Name</label>
          <input type="text" placeholder="First Name" />
          <small>Enter your first name</small>
        </div>

        <div class="edit-form-group">
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" />
          <small>Enter your last name</small>
        </div>

        <div class="edit-form-group">
          <label>Username</label>
          <input type="text" placeholder="Username" />
          <small>Choose a username</small>
        </div>

        <div class="edit-form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
          <small>Choose a secure password</small>
        </div>

        <div class="edit-form-group">
          <label>Email</label>
          <input type="email" placeholder="john@example.com" />
          <small>Enter your email</small>
        </div>

        <div class="edit-form-group">
          <label>Birthday</label>
          <input type="date" />
          <small>MM/DD/YYYY</small>
        </div>

        <div class="edit-form-group">
          <label>Favorite Number</label>
          <input type="number" placeholder="7" />
          <small>What's your favorite number?</small>
        </div>

        <div class="edit-form-group">
          <label>Biography</label>
          <textarea placeholder="Tell us something about yourself"></textarea>
        </div>
      </div>
      <div className="edit-bottom-buttons">
        <button className="save-button">
          <FontAwesomeIcon icon={faCheck} size="m" />
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default EditProfileContainer;
