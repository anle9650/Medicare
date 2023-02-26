const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date,
  }
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = { Task };