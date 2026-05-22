export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };
  
  export const validateSignup = (values) => {
    const errors = {};
  
    if (!values.firstname?.trim()) {
      errors.firstname = 'First name is required';
    }
  
    if (!values.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(values.password)) {
      errors.password = 'Password must be at least 8 characters with 1 uppercase letter, 1 lowercase letter, and 1 number';
    }
  
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    if (!values.qualification?.trim()) {
      errors.qualification = 'Qualification is required';
    }
  
    if (!values.interests || values.interests.length === 0) {
      errors.interests = 'At least one interest is required';
    }
  
    return errors;
  };
  
  export const validateLogin = (values) => {
    const errors = {};
  
    if (!values.email?.trim()) {
      errors.email = 'Email is required';
    }
  
    if (!values.password) {
      errors.password = 'Password is required';
    }
  
    return errors;
  };
  
  export const validateResetPassword = (values) => {
    const errors = {};
  
    if (!values.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    if (!values.token?.trim()) {
      errors.token = 'Reset token is required';
    }
  
    if (!values.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (!validatePassword(values.newPassword)) {
      errors.newPassword = 'Password must be at least 8 characters with 1 uppercase letter, 1 lowercase letter, and 1 number';
    }
  
    if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    return errors;
  };
  