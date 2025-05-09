import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const Header = ({ user }) => {
  return (
    <header className="header-container">
      <div className="header-banner">
        <nav className="navbar">
          <ul className="navbar-links">
            <li>
              <button className="nav-profile-button">
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
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="right-buttons">
        <button className="edit-button">
          <FontAwesomeIcon icon={faPenToSquare} size="lg" />
          <Link to="/edit-profile">Edit</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
