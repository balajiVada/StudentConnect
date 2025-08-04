// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from "./hooks/useAuth";

import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

import Homepage from './pages/home/Homepage';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import ResourcePage from './pages/resourcePages/ResourcePage';
import OpportunitiesPage from './pages/opportunitiesPages/OpportunitiesPage';
import EventsPage from './pages/eventsPages/EventsPage';
import Profile from './components/dashboard/UserProfile';

import MainLayout from './components/layouts/MainLayout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  const role = user.role;
  // console.log(role);
  // console.log(role === 'user');
  if(role === 'user') return <Navigate to='/homepage' />

  return children;
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to="/homepage" />;

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Guest Routes */}
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
          <Route path="/reset-password" element={<GuestRoute><ResetPassword /></GuestRoute>} />

          {/* Protected Routes */}
          <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admindashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/customresource" element={<ResourcePage />} />
            <Route path="/customeopportunity" element={<OpportunitiesPage />} />
            <Route path="/customevents" element={<EventsPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Redirect root and unknown routes */}
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="*" element={<Navigate to="/homepage" />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
