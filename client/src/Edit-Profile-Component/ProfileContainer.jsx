import React from "react";
import "./ProfileContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ProfileContainer = ({user}) => {
  return (
    <section className="profile-info-wrapper">
      <div className="profile-container-wrapper">
        <section className="profile-container-right">
          <div className="form-group">
            <label>First Name</label>
            <p>{`${user.firstName}`}</p>
            <label>{`${user.lastName}`}</label>
            <p>Name</p>
          </div>
          <div className="form-group">
            <label>{`${user.username}`}</label>
            <p>Name</p>
            <label>Password</label>
            <p>Name</p>
          </div>
        </section>

        <section className="profile-container-left">
          <div className="form-group">
            <label>Email</label>
            <p>Name</p>
            <label>Birthday</label>
            <p>Name</p>
          </div>
          <div className="form-group">
            <label>Favorite Number</label>
            <p>Name</p>
            <label>Biography</label>
            <p>Name</p>
          </div>
        </section>
      </div>
      <div className="bottom-buttons">
        <button className="edit-button">
          <FontAwesomeIcon icon={faPenToSquare} size="lg" />
          Edit Profile
        </button>
      </div>
    </section>
  );
};

export default ProfileContainer;
