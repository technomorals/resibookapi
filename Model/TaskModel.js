const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the task schema
const taskSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the users collection
  property_id: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: false,
  }, // Reference to the Property
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  category: {
    type: String,
    enum: ["Maintenance", "Event", "Payment", "Visitor", "General"],
    default: "General",
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Overdue"],
    default: "Pending",
  },
  reminders: [
    {
      type: Date,
    },
  ],
  recurring: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model for the task
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
