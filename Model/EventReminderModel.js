const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Event Schema
const eventSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: false, // Optional field for the contact person’s name
  },
  contactPhone: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
