

import React from "react";
import "../home/Homepage.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        {/* <img src="/logo.png" alt="logo" /> */}
        <span className="navbar-title">StudentConnect</span>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/homepage">Home</Link>
        <Link to="/customresource">Resources</Link>
        <Link to="/customeopportunity">Opportunities</Link>
        <Link to="/customevents">Events</Link>
        {/* <a href="/tips">Tips</a>
        <a href="/learningpaths">Learning Paths</a> */}
      </div>

      {/* Profile/Login */}
      <div className="navbar-profile">
        {/* Show Dashboard only for admin */}
        {isAdmin && (
          <Link to="/admindashboard">
            <button className="dashboard-button">Dashboard</button>
          </Link>
        )}

        <Link to="/profile">
          <button className="profile-button">Profile</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
