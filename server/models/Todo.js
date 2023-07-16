const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  checked: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
