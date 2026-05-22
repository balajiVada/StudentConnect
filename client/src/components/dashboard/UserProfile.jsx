
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import useAuth from "../../hooks/useAuth";
import Loader from "../common/Loader";
import "./Profile.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await logout(); 
    navigate("/login"); 
  };

  if (loading) {
    return (
      <div className="p-dashboard-loader">
        <Loader/>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-dashboard-loader">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="p-dashboard-wrapper">
      <div className="p-dashboard-welcome">
        <div className="profile-name">
          <h1 className="p-dashboard-heading">Welcome, {user.firstname}!</h1>
          <p className="p-dashboard-subtext">
            This is your personal dashboard where you can manage your profile
            and preferences.
          </p>
        </div>
        <div>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="p-dashboard-grid">
        {/* Your Profile Card */}
        <div className="p-dashboard-card-container p-dashboard-card">
          <h2 className="p-dashboard-card-title">Your Profile</h2>
          <p className="p-dashboard-card-subtitle">
            Personal information and qualifications
          </p>
          <div className="p-dashboard-card-content">
            <p className="p-dashboard-detail">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="p-dashboard-detail">
              <strong>Qualification:</strong> {user.qualification}
            </p>
            <p className="p-dashboard-detail">
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </div>

        {/* Your Interests Card */}
        <div className="p-dashboard-card-container p-dashboard-card">
          <h2 className="p-dashboard-card-title">Your Interests</h2>
          <p className="p-dashboard-card-subtitle">
            Topics you are interested in
          </p>
          <div className="p-dashboard-card-content">
            <div className="p-dashboard-tags-wrapper">
              {user.interests &&
                user.interests.map((interest, index) => (
                  <span key={index} className="p-dashboard-tag">
                    {interest}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className="p-dashboard-card-container p-dashboard-card">
          <h2 className="p-dashboard-card-title">Account Status</h2>
          <p className="p-dashboard-card-subtitle">Your account information</p>
          <div className="p-dashboard-card-content">
            <div className="p-dashboard-status">
              <div className="p-dashboard-indicator"></div>
              <span className="p-dashboard-detail">Active</span>
            </div>
            <p className="p-dashboard-detail">
              <strong>Account Type:</strong>{" "}
              {user.role === "admin" ? "Administrator" : "Standard User"}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity Card */}
      {/* <div className="p-dashboard-card-container p-dashboard-card">
        <h2 className="p-dashboard-card-title">Recent Activity</h2>
        <div className="p-dashboard-card-content">
          <p className="p-dashboard-detail">No recent activity to display.</p>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
