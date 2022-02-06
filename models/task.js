const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;


module.exports = Model("Task", new Schema({
  name: {
    type: String,
    required: [true, "Task name is required"],
    minlength: [3, "Task name must be at least 3 characters long"],
    maxlength: [20, "Task name must be less than 20 characters long"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
}));