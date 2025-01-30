const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Membership Master Schema
const membershipMasterSchema = new Schema({
  membershipType: {
    type: String,
    enum: ["Basic", "Premium", "VIP", "Gold", "Platinum"], // Example of membership tiers
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true, // A description of the benefits and features
  },
  price: {
    type: Number,
    required: true, // The cost of the membership
  },
  durationMonths: {
    type: Number,
    required: true, // Duration of the membership in months (e.g., 1, 6, 12 months)
  },
  isActive: {
    type: Boolean,
    default: true, // Whether this membership plan is currently available
  },
  renewalAllowed: {
    type: Boolean,
    default: true, // Whether the membership allows renewal
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp of creation
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Timestamp of last update
  },
});

// Create the model for Membership Master
const MembershipMaster = mongoose.model(
  "MembershipMaster",
  membershipMasterSchema
);

module.exports = MembershipMaster;
