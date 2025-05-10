import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/profile_placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {

        console.log("Logged out successfully");
        setUser(null);
        navigate("/login");
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (err) {
      console.error("Logout error: ", err);
    }

  };
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <div className="navbar-logo">
            <img src={logo} alt="logo" />
            <h1>My Profile</h1>
          </div>
        </li>
        <li>
          <div className="navbar-right">
            <Link to="/Home" className="navbar-home-button">
              <FontAwesomeIcon icon={faHouse} size="m" />
              Home
            </Link>
            <div className="profile-menu-wrapper" ref={menuRef}>
              <button className="nav-profile-button" onClick={toggleMenu}>
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
              {isOpen && (
                <div className="profile-dropdown">
                  <button className="logout-btn" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} size="m" /> Log
                    out
                  </button>
                </div>
              )}
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
