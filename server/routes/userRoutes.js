// routes/userRoutes.js
const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { handleUpdateProfile } = require('../controllers/handleUserAuth');
const router = express.Router();

router.put('/profile', protect, handleUpdateProfile);
router.get('/profile', protect, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

module.exports = router;
