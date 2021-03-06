let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    access: {
        type: String
    },
    avatar: String,
    resetPasswordToken:{
        type: String
    },
    resetPasswordTokenExpiry: {
        type: Date
    }
});

module.exports = mongoose.model('user', userSchema);