import React, { useState } from "react";
import "./EditProfile.css";
import EditProfileContainer from "./EditProfileContainer.jsx";
import ProfileContainer from "./ProfileContainer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const EditProfile = ({user, setUser}) => {

  const [isEditing, setIsEditing] = useState(false);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/update-profile-picture`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        setUser(data.user); // update user with new profilePicturePath
      } else {
        console.error("Upload failed:", data.message);
      }
    } catch (err) {
      console.error("Error uploading profile picture:", err);
    }
  };
  return (
    <main className="dashboard-wrapper">
      <div className="dashboard-container">
        <h1>Profile Settings</h1>
        <div className="edit-container">
          <button
            className="edit-profile-pic-button"
            onClick={() => document.getElementById("profilePicInput").click()}
          >
            <FontAwesomeIcon icon={faCamera} className="camera-icon" />
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
          </button>
          <input
            type="file"
            id="profilePicInput"
            accept="image/jpeg,image/jpg"
            style={{ display: "none" }}
            onChange={handleProfilePicChange}
          />
          {isEditing ? (
            <EditProfileContainer
              user={user}
              setUser={setUser}
              onEditClick={() => setIsEditing(false)}
            />
          ) : (
            <ProfileContainer
              user={user}
              onEditClick={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
