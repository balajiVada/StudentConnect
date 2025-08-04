// controllers/handleUserAuth.js (improved version)
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenService = require('../utils/tokenService');
const emailService = require('../utils/emailService');

async function handleUserSignUp(req, res) {
    try {
        const { firstname, lastname, email, password, qualification, interests, phonenumber } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ 
            firstname, 
            lastname, 
            email, 
            password: hashedPassword, 
            qualification, 
            interests, 
            phonenumber 
        });
        
        await newUser.save();

        return res.status(201).json({ 
            success: true,
            message: "User registered successfully" 
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ error: "All fields are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({ 
            success: true,
            message: "Login Successful", 
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
                qualification: user.qualification,
                interests: user.interests
            },
            token 
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleUserLogout(req, res) {
    try {
        res.clearCookie("token");
        return res.status(200).json({ 
            success: true,
            message: "Logout Successful" 
        });
    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleUserForgotPassword(req, res) {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const resetToken = await tokenService.generateResetToken(email);

        await emailService.sendEmail({
            email,
            subject: 'Password Reset Request',
            message: `Use this token to reset your password: ${resetToken}`,
            html: `
                <h1>Password Reset</h1>
                <p>You requested a password reset.</p>
                <p>Use this token to reset your password: <strong>${resetToken}</strong></p>
                <p>This token will expire in 1 hour.</p>
            `
        });

        return res.status(200).json({ 
            success: true,
            message: "Reset token sent to email" 
        });
    } catch (err) {
        console.error("Forgot password error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleUserPasswordReset(req, res) {
    try {
        const { email, token, newPassword } = req.body;
        
        if (!email || !token || !newPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({ 
                error: "Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters long" 
            });
        }

        const isValidToken = await tokenService.verifyResetToken(email, token);
        if (!isValidToken) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        
        await tokenService.deleteResetToken(email);

        return res.status(200).json({ 
            success: true,
            message: "Password reset successful" 
        });
    } catch (err) {
        console.error("Reset password error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleUpdateProfile(req, res) {
    try {
        const { firstname, lastname, qualification, interests, phonenumber } = req.body;
        const userId = req.user.id; 

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstname, lastname, qualification, interests, phonenumber },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (err) {
        console.error("Update profile error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
    handleUserLogout,
    handleUserForgotPassword,
    handleUserPasswordReset,
    handleUpdateProfile
};