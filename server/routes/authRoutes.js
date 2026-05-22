const express = require('express');
const { handleUserSignUp, handleUserLogin, handleUserLogout, handleUserForgotPassword, handleUserPasswordReset } = require('../controllers/handleUserAuth');
const {signupValidation} = require('../middlewares/authValidation');
const router = express.Router();

router.post('/signup',signupValidation, handleUserSignUp);
router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);
router.post('/forgot-password', handleUserForgotPassword);
router.post('/reset-password', handleUserPasswordReset);

module.exports = router;