import React, { useState } from 'react';
import DashboardOverview from './DashboardOverview';
import UsersOverview from './UsersOverview';
import ResourceOverview from './ResourceOverview';
import EventOverview from './EventsOverview';
import OpportunitiesOverview from './OpportunitiesOverview';
import AdminPanel from './AdminPanel';
import Navbar from '../commonComponents/Navbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('resources');

  const renderSection = () => {
    switch (activeSection) {
      case 'adminpanel':
        return <AdminPanel />
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UsersOverview />;
      case 'resources':
        return <ResourceOverview />;
      case 'jobs':
        return <OpportunitiesOverview/>;
      case 'events':
        return <EventOverview />;
      case 'feedbacks':
        return <div className="section-content">\uD83D\uDCAC Feedbacks Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      {/* <div className="navbar">
        <div className="navbar-logo">Student Connect</div>
        <div className="navbar-title">Admin Dashboard</div>
        <div className="navbar-actions">
          <button className="profile">Profile</button>
        </div>
      </div> */}
      <Navbar />

      {/* Layout */}
      <div className="dashboard-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <nav className="sidebar-nav">
            {/* <button onClick={() => setActiveSection('adminpanel')} className={`sidebar-button ${activeSection === 'adminpanel' ? 'active' : ''}`}>Admin Panel</button> */}
            {/* <button onClick={() => setActiveSection('dashboard')} className={`sidebar-button ${activeSection === 'dashboard' ? 'active' : ''}`}>Dashboard Overview</button> */}
            {/* <button onClick={() => setActiveSection('users')} className={`sidebar-button ${activeSection === 'users' ? 'active' : ''}`}>Users Management</button> */}
            <button onClick={() => setActiveSection('resources')} className={`sidebar-button ${activeSection === 'resources' ? 'active' : ''}`}>Resource Management</button>
            <button onClick={() => setActiveSection('jobs')} className={`sidebar-button ${activeSection === 'jobs' ? 'active' : ''}`}>Jobs/Internships</button>
            <button onClick={() => setActiveSection('events')} className={`sidebar-button ${activeSection === 'events' ? 'active' : ''}`}>Events Management</button>
            {/* <button onClick={() => setActiveSection('feedbacks')} className={`sidebar-button ${activeSection === 'feedbacks' ? 'active' : ''}`}>Feedbacks</button> */}
          </nav>
        </div>

        {/* Main Content */}
        <main className="main-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
