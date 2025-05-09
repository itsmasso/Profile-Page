import React from "react";
import "./ProfileContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ProfileContainer = ({ user, onEditClick }) => {
  return (
    <section className="profile-info-wrapper">
      <div className="profile-container-wrapper">
        <section className="profile-container-right">
          <div className="form-group">
            <label>First Name</label>
            <p>{`${user?.firstName}`}</p>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <p>{`${user?.lastName}`}</p>
          </div>
          <div className="form-group">
            <label>Username</label>
            <p>{`${user?.username}`}</p>
          </div>
          <div className="form-group">
            <label>Password</label>
            <p>{"•".repeat(8)}</p>
          </div>
        </section>

        <section className="profile-container-left">
          <div className="form-group">
            <label>Email</label>
            <p>{`${user?.email}`}</p>
          </div>
          <div className="form-group">
            <label>Birthday</label>
            <p>{`${new Date(user?.birthday).toLocaleDateString("en-US")}`}</p>
          </div>
          <div className="form-group">
            <label>Favorite Number</label>
            <p>{`${user?.favoriteNumber}`}</p>
          </div>
          <div className="form-group">
            <label>Biography</label>
            <p className="bio-text">{`${user?.biography}`}</p>
          </div>
        </section>
      </div>
      <div className="bottom-buttons">
        <button className="edit-button" onClick={onEditClick}>
          <FontAwesomeIcon icon={faPenToSquare} size="lg" />
          Edit Profile
        </button>
      </div>
    </section>
  );
};

export default ProfileContainer;
