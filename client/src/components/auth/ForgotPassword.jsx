// src/components/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validation';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const { forgotPassword, error: authError, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const { values, errors, handleChange, handleBlur, setErrors } = useForm({
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !validateEmail(values.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    setLoading(true);
    try {
      await forgotPassword(values.email);
      setSuccess(true);
      setTimeout(() => {
        navigate('/reset-password');
      }, 1000);
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-card">
      <div className="fp-header">
        <h3>Forgot Password</h3>
        <p>Enter your email and we'll send you a token to reset your password</p>
      </div>

      {authError && <div className="fp-alert fp-error">{authError}</div>}

      {success ? (
        <div className="fp-success-container">
          <div className="fp-alert fp-success">
            Reset token sent! Check your email for the token.
          </div>
          <button
            className="fp-btn-primary"
            onClick={() => {
              setError(null);
              navigate('/reset-password');
            }}
          >
            Reset Password
          </button>
          <div className="fp-login-text">
            <Link
              to="/login"
              className="fp-login-link"
              onClick={() => setError(null)}
            >
              Back to Login
            </Link>
          </div>
        </div>
      ) : (
        <form className="fp-form" onSubmit={handleSubmit} noValidate>
          <div className="fp-form-group">
            <label htmlFor="fp-email">Email Address *</label>
            <input
              type="email"
              id="fp-email"
              name="email"
              placeholder="Enter your email address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={errors.email ? "fp-input-error" : ""}
            />
            {errors.email && (
              <small className="fp-error-text">{errors.email}</small>
            )}
          </div>

          <button className="fp-btn-primary" type="submit" disabled={loading}>
            {loading ? (
              <div className="fp-loader"></div>
            ) : (
              "Send Reset Token"
            )}
          </button>
          
          <div className="fp-login-text">
            <Link
              to="/login"
              className="fp-login-link"
              onClick={() => setError(null)}
            >
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
