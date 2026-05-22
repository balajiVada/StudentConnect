// src/components/auth/ResetPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import { validateResetPassword } from '../../utils/validation';
import './ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, error: authError, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { values, errors, handleChange, handleBlur, setErrors } = useForm({
    email: '',
    token: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateResetPassword(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await resetPassword(values.email, values.token, values.newPassword);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="re-card">
      <div className="re-header">
        <h3>Reset Password</h3>
        <p>Enter your email, token, and new password</p>
      </div>

      {authError && <div className="re-alert re-error">{authError}</div>}

      {success && (
        <div className="re-alert re-success">
          Password reset successful! Redirecting to login...
        </div>
      )}

      <form className="re-form" onSubmit={handleSubmit} noValidate>
        <div className="re-form-group">
          <label htmlFor="re-email">Email Address *</label>
          <input
            type="email"
            id="re-email"
            name="email"
            placeholder="Enter your email address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={errors.email ? 're-input-error' : ''}
          />
          {errors.email && (
            <small className="re-error-text">{errors.email}</small>
          )}
        </div>

        <div className="re-form-group">
          <label htmlFor="re-token">Reset Token *</label>
          <input
            type="text"
            id="re-token"
            name="token"
            placeholder="Enter the token from your email"
            value={values.token}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={errors.token ? 're-input-error' : ''}
          />
          {errors.token && (
            <small className="re-error-text">{errors.token}</small>
          )}
        </div>

        <div className="re-form-group">
          <label htmlFor="re-newPassword">New Password *</label>
          <input
            type="password"
            id="re-newPassword"
            name="newPassword"
            placeholder="Create a new password"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={errors.newPassword ? 're-input-error' : ''}
          />
          {errors.newPassword && (
            <small className="re-error-text">{errors.newPassword}</small>
          )}
        </div>

        <div className="re-form-group">
          <label htmlFor="re-confirmPassword">Confirm Password *</label>
          <input
            type="password"
            id="re-confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your new password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={errors.confirmPassword ? 're-input-error' : ''}
          />
          {errors.confirmPassword && (
            <small className="re-error-text">{errors.confirmPassword}</small>
          )}
        </div>

        <button className="re-btn-primary" type="submit" disabled={loading || success}>
          {loading ? <div className="re-loader"></div> : 'Reset Password'}
        </button>

        <div className="re-login-text">
          <Link
            to="/login"
            className="re-login-link"
            onClick={() => setError(null)}
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;



// // src/components/auth/ResetPassword.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import useForm from '../../hooks/useForm';
// import useAuth from '../../hooks/useAuth';
// import { validateResetPassword } from '../../utils/validation';
// // import './ResetPassword.css';

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const { resetPassword, error: authError, setError } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
  
//   const { values, errors, handleChange, handleBlur, setErrors } = useForm({
//     email: '',
//     token: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const validationErrors = validateResetPassword(values);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setLoading(true);
//     try {
//       await resetPassword(values.email, values.token, values.newPassword);
//       setSuccess(true);
//       setTimeout(() => {
//         navigate('/login');
//       }, 3000);
//     } catch (error) {
//       console.error('Reset password error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card">
//       <div className="header">
//         <h3>Reset Password</h3>
//         <p>Enter your email, token, and new password</p>
//       </div>

//       {authError && <div className="alert error">{authError}</div>}
      
//       {success && (
//         <div className="alert success">
//           Password reset successful! Redirecting to login...
//         </div>
//       )}

//       <form className="form" onSubmit={handleSubmit} noValidate>
//         <div className="form-group">
//           <label htmlFor="email">Email Address *</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter your email address"
//             value={values.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             required
//             className={errors.email ? "input-error" : ""}
//           />
//           {errors.email && (
//             <small className="error-text">{errors.email}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="token">Reset Token *</label>
//           <input
//             type="text"
//             id="token"
//             name="token"
//             placeholder="Enter the token from your email"
//             value={values.token}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             required
//             className={errors.token ? "input-error" : ""}
//           />
//           {errors.token && (
//             <small className="error-text">{errors.token}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="newPassword">New Password *</label>
//           <input
//             type="password"
//             id="newPassword"
//             name="newPassword"
//             placeholder="Create a new password"
//             value={values.newPassword}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             required
//             className={errors.newPassword ? "input-error" : ""}
//           />
//           {errors.newPassword && (
//             <small className="error-text">{errors.newPassword}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm Password *</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             placeholder="Confirm your new password"
//             value={values.confirmPassword}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             required
//             className={errors.confirmPassword ? "input-error" : ""}
//           />
//           {errors.confirmPassword && (
//             <small className="error-text">{errors.confirmPassword}</small>
//           )}
//         </div>

//         <button className="btn-primary" type="submit" disabled={loading || success}>
//           {loading ? (
//             <div className="loader"></div>
//           ) : (
//             "Reset Password"
//           )}
//         </button>

//         <div className="login-text">
//           <Link 
//             to="/login" 
//             className="login-link" 
//             onClick={() => setError(null)}
//           >
//             Back to Login
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;