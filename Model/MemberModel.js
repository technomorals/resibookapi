const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    property_id: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: false,
    }, // Reference to the property
    building_id: {
      type: Schema.Types.ObjectId,
      ref: "Building",
      required: false,
    }, // Reference to the building
    floor_id: { type: Schema.Types.ObjectId, ref: "Floor", required: false }, // Reference to the floor
    site_id: { type: Schema.Types.ObjectId, ref: "Site", required: false }, // Reference to the site

    name: { type: String, required: true }, // Name of the member
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    }, // Gender of the member
    birthdate: { type: Date, required: true }, // Member's birthdate
    blood_group: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "other"],
      required: true,
    }, // Blood group of the member
    contact_number: { type: String, required: false }, // Contact number of the member
    email: { type: String, required: false, unique: true }, // Email address of the member
    address: { type: String, required: false }, // Address of the member
    emergency_contact_name: { type: String, required: false }, // Emergency contact name
    emergency_contact_number: { type: String, required: false }, // Emergency contact number
    occupation: { type: String, required: false }, // Occupation of the member
    photo: { type: String, required: false }, // URL to member's photo (optional)
    is_active: { type: Boolean, required: true, default: true }, // Status of the member (active or inactive)
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps automatically
);

module.exports = mongoose.model("Member", memberSchema);
