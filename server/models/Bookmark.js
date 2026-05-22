// models/Bookmark.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookmarkSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contentId: { type: Schema.Types.ObjectId, required: true, refPath: 'contentModel' },
  // contentModel is the name of the model that contentId refers to.
  contentModel: {
    type: String,
    required: true,
    enum: ['Resource', 'Event', 'Opportunity'] // adjust model names if yours differ
  },
  createdAt: { type: Date, default: Date.now }
});

// Ensure a user cannot bookmark the same item twice
BookmarkSchema.index({ user: 1, contentId: 1, contentModel: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);
