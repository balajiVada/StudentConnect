// middleware/extractUser.js
const User = require('../models/userModel');

async function extractUser(req, res, next) {
  const userId = req.header('x-user-id');
  console.log("hello iam in");
  if (!userId) {
    console.warn('User ID header missing');
    return res.status(400).json({ message: 'User ID header missing' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.warn(`User not found with ID: ${userId}`);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user); // <-- add this
    req.user = user;
    next();
  } catch (error) {
    console.error('Error fetching user in middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// async function extractUser(req, res, next) {
//   const userId = req.header('x-user-id');
//   if (!userId) {
//     return res.status(400).json({ message: 'User ID header missing' });
//   }

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error('Error fetching user in middleware:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

module.exports = extractUser;
