import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import { validateLogin } from '../../utils/validation';
import './Login.css'; 

const Login = () => {
  const navigate = useNavigate();
  const { login, error: authError, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const { values, errors, handleChange, handleBlur, setErrors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateLogin(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await login(values);
      navigate('/homepage');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="l-card">
      <div className="l-header">
        <h3>Login to Your Account</h3>
        <p>Enter your credentials to access your account</p>
      </div>

      {authError && <div className="l-alert l-error">{authError}</div>}

      <form className="l-form" onSubmit={handleSubmit} noValidate>
        <div className="l-form-group">
          <label htmlFor="l-email">Email Address *</label>
          <input
            type="email"
            id="l-email"
            name="email"
            placeholder="Enter your email address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={errors.email ? "l-input-error" : ""}
          />
          {errors.email && (
            <small className="l-error-text">{errors.email}</small>
          )}
        </div>

        <div className="l-form-group">
          <label htmlFor="l-password">Password *</label>
          <input
            type="password"
            id="l-password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={errors.password ? "l-input-error" : ""}
          />
          {errors.password && (
            <small className="l-error-text">{errors.password}</small>
          )}
        </div>
        
        <div className="l-login-options">
          <div className="l-remember-option">
            <input
              id="l-remember_me"
              name="remember_me"
              type="checkbox"
              className="l-checkbox"
            />
            <label htmlFor="l-remember_me" className="l-checkbox-label">
              Remember me
            </label>
          </div>
          
          <Link
            to="/forgot-password"
            className="l-forgot-link"
            onClick={() => setError(null)}
          >
            Forgot password?
          </Link>
        </div>

        <button className="l-btn-primary" type="submit" disabled={loading}>
          {loading ? (
            <div className="l-loader"></div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="l-signup-text">
        Don't have an account?{" "}
        <Link to="/signup" className="l-signup-link" onClick={() => setError(null)}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
