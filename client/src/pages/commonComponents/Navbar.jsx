

import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/homepage" style={{ textDecoration: 'none' }}>
          <span className="navbar-title">StudentConnect</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <NavLink to="/homepage" className={({isActive}) => isActive ? "active-link" : ""}>Home</NavLink>
        <NavLink to="/customresource" className={({isActive}) => isActive ? "active-link" : ""}>Resources</NavLink>
        <NavLink to="/customeopportunity" className={({isActive}) => isActive ? "active-link" : ""}>Opportunities</NavLink>
        <NavLink to="/customevents" className={({isActive}) => isActive ? "active-link" : ""}>Events</NavLink>
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
