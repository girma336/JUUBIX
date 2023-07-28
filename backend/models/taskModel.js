const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide an input name"],
    }
})

module.exports = mongoose.model('Task', taskSchema)