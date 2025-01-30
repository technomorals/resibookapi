const mongoose = require("mongoose");

const MobileNumberSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate numbers
      trim: true,
    },
    is_available: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

const MobileNumber = mongoose.model("MobileNumber", MobileNumberSchema);

module.exports = MobileNumber;
