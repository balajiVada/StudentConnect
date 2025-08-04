const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['internship', 'full time', 'part time'],
        default: 'full time',
    },
    link: {
        type: String,
        required: true,
    },
    applicationDeadline: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    }
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
