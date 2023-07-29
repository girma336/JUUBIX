const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide an input name"],
    },
    email: {
        type: String,
        required: [true, "Must provide an input email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Must provide an input password"],
    }
})

module.exports = mongoose.model('User', userSchema)