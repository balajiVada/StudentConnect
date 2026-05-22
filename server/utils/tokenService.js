const crypto = require('crypto');
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  }
});

const Token = mongoose.model('Token', tokenSchema);

exports.generateResetToken = async (email) => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  await Token.deleteMany({ email });
  
  await Token.create({
    email,
    token: resetToken,
    expires: Date.now() + 3600000, 
  });
  
  return resetToken;
};

exports.verifyResetToken = async (email, token) => {
  const storedToken = await Token.findOne({ 
    email, 
    token,
    expires: { $gt: Date.now() } 
  });
  
  return !!storedToken;
};

exports.deleteResetToken = async (email) => {
  await Token.deleteMany({ email });
};
