const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    },
    todoId: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("Todo", todoSchema);