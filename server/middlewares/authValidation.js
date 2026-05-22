// middleware/authValidation.js
exports.signupValidation = (req, res, next) => {
    const { firstname, email, password, qualification, interests } = req.body;
    const errors = [];
  
    if (!firstname) errors.push('First name is required');
    if (!email) errors.push('Email is required');
    if (!password) errors.push('Password is required');
    if (!qualification) errors.push('Qualification is required');
    if (!interests || !interests.length) errors.push('At least one interest is required');
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) errors.push('Please provide a valid email address');
  
    if (password && password.length < 8) errors.push('Password must be at least 8 characters');
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password && !passwordRegex.test(password)) {
      errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    next();
  };