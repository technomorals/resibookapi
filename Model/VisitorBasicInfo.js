const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitorBasicInfoSchema = new Schema(
  {
    // Basic visitor details
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    full_name: { type: String, required: true }, // Full name of the visitor
    phone_number: { type: String, required: true }, // Visitor's contact number
    gender: { type: String, required: false }, // Optional email address
    birthdate: { type: String, required: false }, // Optional email address
    email: { type: String, required: false }, // Optional email address
    address: { type: String, required: false }, // Visitor's address (optional)
    city: { type: String, required: false }, // City (optional)
    state: { type: String, required: false }, // State (optional)
    country: { type: String, required: false }, // Country (optional)
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("VisitorBasicInfo", visitorBasicInfoSchema);
