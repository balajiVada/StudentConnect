const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'super-admin'],
        default: 'user',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    interests: {
        type: [String],
        required: true,
    },
    phonenumber: {
        type: String,
    }
})

module.exports = mongoose.model('User', userSchema);