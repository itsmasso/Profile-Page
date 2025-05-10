import React, { useEffect, useState } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

const Profile = ({ user }) => {
  return (
    <main className="profile-container">
      <div className="profile-pic">
        <img
          src={
            user?.profilePicturePath
              ? `${import.meta.env.VITE_API_URL}/${user.profilePicturePath.replace(
                  /\\/g,
                  "/"
                )}`
              : "/default-avatar.png"
          }
          alt="Profile"
        />
      </div>

      <div className="profile-information">
        <div className="profile-name">
          <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
        </div>
        <div className="profile-username">
          <h2>{`@${user?.username}`}</h2>
        </div>
        <div className="profile-info">
          <ul>
            <li className="profile-bio">{`${user?.biography}`}</li>
            <li className="profile-email">
              <FontAwesomeIcon icon={faEnvelope} size="m" />
              {`${user?.email}`}
            </li>
          </ul>
        </div>

        <ul className="profile-info-cards">
          <li>
            <FontAwesomeIcon icon={faCakeCandles} size="m" />
            {`${new Date(user?.birthday).toLocaleDateString("en-US")}`}
          </li>
          <li>
            <FontAwesomeIcon icon={faHashtag} size="m" />
            {`Favorite Number: ${user?.favoriteNumber}`}
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Profile;
