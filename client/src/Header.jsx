import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-banner">
        
      </div>
      <div className="right-buttons">
        <Link to="/edit-profile" className="edit-button">
          <FontAwesomeIcon icon={faPenToSquare} size="lg" />
          Edit
        </Link>
      </div>
    </header>
  );
};

export default Header;
