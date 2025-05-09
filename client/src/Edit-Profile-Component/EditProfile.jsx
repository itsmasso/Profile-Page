import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { checkAuth } from "../userAuthUtil.js";
import { useNavigate } from "react-router";
import EditProfileContainer from "./EditProfileContainer.jsx";
import ProfileContainer from "./ProfileContainer.jsx";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [editProfile, setEditProfile] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const verify = async () => {
      try {
        const userData = await checkAuth();
        setUser(userData);
      } catch {
        navigate("/login");
      }
    };
    verify();
  }, []);

  return (
    <main className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="edit-container">
          <div className="edit-container-pic">
            <img
              src={
                user?.profilePicturePath
                  ? `http://localhost:3001/${user.profilePicturePath.replace(
                      /\\/g,
                      "/"
                    )}`
                  : "/default-avatar.png"
              }
              alt="Profile"
            />
          </div>
          <ProfileContainer/>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
