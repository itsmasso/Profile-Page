import React from "react";
import "./Home.css";
import Header from "./Header";
import Profile from "./Profile";

const Home = ({user}) => {
  return (
    <main className="main-page-wrapper">
      <div className="main-page-container">
        <Header user={user} />
        <div className="main-page-profile">
          <Profile user={user} />
        </div>
      </div>
    </main>
  );
};

export default Home;
