import React from "react";
import './Navbar.css';
import { FaUser } from "react-icons/fa";
import mlbLogo from './assets/mlb.png';

function Navbar({ setActiveTab, activeTab }) {
  return (
    <div className="navbar-wrapper">
      <div className="top-bar">
        <h1 className="logo-text">STATOOL</h1>
      </div>
      <div className="navbar">
        <img src={mlbLogo} alt="MLB" className="mlb-logo" />
        <div className="tabs">
          <div
            className={`tab ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </div>
          <div
            className={`tab ${activeTab === "metric" ? "active" : ""}`}
            onClick={() => setActiveTab("metric")}
          >
            Metric Experimenter
          </div>
        </div>
        <div className="profile-button">
          <FaUser />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
