// controllers/bookmarkController.js
const mongoose = require('mongoose');
const Bookmark = require('../models/Bookmark');

// Import your content models (adjust paths/names if needed)
const Resource = require('../models/resourceModel');
const Event = require('../models/EventModel');
const Opportunity = require('../models/opportunityModel');

const CONTENT_MAP = {
  resources: { modelName: 'Resource', Model: Resource },
  resource: { modelName: 'Resource', Model: Resource },

  events: { modelName: 'Event', Model: Event },
  event: { modelName: 'Event', Model: Event },

  opportunities: { modelName: 'Opportunity', Model: Opportunity },
  opportunity: { modelName: 'Opportunity', Model: Opportunity }
};

function resolveContentType(type) {
  if (!type) return null;
  const key = String(type).toLowerCase();
  return CONTENT_MAP[key] || null;
}

exports.createBookmark = async (req, res) => {
  try {
    const userId = req.user && req.user.id; // assumes 
    // auth middleware sets req.user
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const { type, id } = req.params; // route: /:type/:id
    const resolved = resolveContentType(type);
    if (!resolved) return res.status(400).json({ success: false, message: 'Invalid content type' });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid content id' });
    }

    // Verify content exists
    const doc = await resolved.Model.findById(id).lean();
    if (!doc) {
      return res.status(404).json({ success: false, message: `${resolved.modelName} not found` });
    }

    // Create or return existing
    const bookmarkData = {
      user: userId,
      contentId: id,
      contentModel: resolved.modelName
    };


    // Using upsert-like behavior but avoid duplicates due to unique index
    let bookmark;
    try {
      bookmark = await Bookmark.create(bookmarkData);
    } catch (err) {
      // If duplicate key error, return success but indicate already bookmarked
      if (err.code === 11000) {
        return res.status(200).json({ success: true, message: 'Already bookmarked' });
      }
      throw err;
    }

    // populate contentId using refPath
    await bookmark.populate('contentId').execPopulate?.() || (await bookmark.populate('contentId').execPopulate?.catch(()=>{}));
    // (If execPopulate isn't available, Mongoose's populate above still gives populated doc in Mongoose v5/6 via await bookmark.populate('contentId'))

    return res.status(201).json({ success: true, bookmark });
  } catch (error) {
    console.error('createBookmark error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const { type, id } = req.params;
    const resolved = resolveContentType(type);
    if (!resolved) return res.status(400).json({ success: false, message: 'Invalid content type' });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid content id' });
    }

    const removed = await Bookmark.findOneAndDelete({
      user: userId,
      contentId: id,
      contentModel: resolved.modelName
    });

    if (!removed) {
      return res.status(404).json({ success: false, message: 'Bookmark not found' });
    }

    return res.status(200).json({ success: true, message: 'Bookmark removed' });
  } catch (error) {
    console.error('deleteBookmark error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getUserBookmarks = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    // Fetch bookmarks and populate contentId via refPath
    const bookmarks = await Bookmark.find({ user: userId }).sort({ createdAt: -1 }).populate('contentId').lean();

    // Group by contentModel (Resource/Event/Opportunity)
    const grouped = {
      resources: [],
      events: [],
      opportunities: []
    };

    for (const bm of bookmarks) {
      const model = bm.contentModel;
      const content = bm.contentId || null; // could be null if content was deleted
      if (model === 'Resource') grouped.resources.push({ bookmarkId: bm._id, content });
      else if (model === 'Event') grouped.events.push({ bookmarkId: bm._id, content });
      else if (model === 'Opportunity') grouped.opportunities.push({ bookmarkId: bm._id, content });
    }

    return res.status(200).json({ success: true, bookmarks: grouped });
  } catch (error) {
    console.error('getUserBookmarks error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Body: { type: 'resources', ids: ['id1','id2', ...] }
 * Response: { success: true, bookmarkedIds: ['id2', ...] }
 */
exports.checkBookmarks = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const { type, ids } = req.body;
    const resolved = resolveContentType(type);
    if (!resolved) return res.status(400).json({ success: false, message: 'Invalid content type' });

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'ids must be a non-empty array' });
    }

    const validIds = ids.filter(i => mongoose.Types.ObjectId.isValid(i));
    if (validIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No valid ids' });
    }

    const bookmarked = await Bookmark.find({
      user: userId,
      contentModel: resolved.modelName,
      contentId: { $in: validIds }
    }).select('contentId').lean();

    const bookmarkedIds = bookmarked.map(b => String(b.contentId));
    return res.status(200).json({ success: true, bookmarkedIds });
  } catch (error) {
    console.error('checkBookmarks error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
