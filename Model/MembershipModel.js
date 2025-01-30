const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Membership Schema
const membershipSchema = new Schema({
  membership_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MembershipMaster", // Assuming you have a 'User' model to reference
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a 'User' model to reference
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  // Other optional fields for the membership model:
  renewalStatus: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    default: "",
  },
});

// Create the model
const Membership = mongoose.model("Membership", membershipSchema);

module.exports = Membership;
