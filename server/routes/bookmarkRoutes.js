// routes/bookmarkRoutes.js
const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

// Protect these routes with your JWT middleware
// Example expects `verifyJWT` middleware to set req.user
const { verifyJWT } = require('../middlewares/authMiddleware'); // adjust path if needed

// Save/create bookmark
// POST /api/bookmarks/:type/:id
router.post('/:type/:id', verifyJWT, bookmarkController.createBookmark);

// Delete/un-save bookmark
// DELETE /api/bookmarks/:type/:id
router.delete('/:type/:id', verifyJWT, bookmarkController.deleteBookmark);

// Get all bookmarks grouped by type
// GET /api/bookmarks
router.get('/', verifyJWT, bookmarkController.getUserBookmarks);

// Check bookmarks in batch
// POST /api/bookmarks/check
router.post('/check', verifyJWT, bookmarkController.checkBookmarks);

module.exports = router;
