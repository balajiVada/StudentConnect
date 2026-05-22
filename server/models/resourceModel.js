const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['book', 'tutorial', 'course', 'article'],
        default: 'tutorial',
    },
    link: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    }
})

module.exports = mongoose.model('Resource', resourceSchema);