const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Importing VisitorBasicInfo schema to reference it
const VisitorBasicInfo = require("./VisitorBasicInfo"); // Adjust the path as necessary

const visitorSchema = new Schema(
  {
    // Reference to the VisitorBasicInfo model
    visitor_basic_info: {
      type: Schema.Types.ObjectId,
      ref: "VisitorBasicInfo", // Referring to the VisitorBasicInfo schema
      required: true, // This is a required field
    },

    other_member: [
      {
        type: Schema.Types.ObjectId,
        ref: "VisitorBasicInfo", // Referring to the VisitorBasicInfo schema
        required: true, // This is a required field
      },
    ],

    visitor_created_by_user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    visitor_in_user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    visitor_out_user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },

    // Additional visitor-related information (optional)
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

    // In/Out Log information
    check_in_time: { type: Date, required: false }, // Time when the visitor checked in
    check_out_time: { type: Date, required: false }, // Time when the visitor checked out
    status: {
      type: String,
      enum: ["checked_in", "checked_out", "pending"], // Status of the visitor (checked-in, checked-out)
      default: "pending",
      required: true,
    },

    // Vehicle Information (optional)
    vehicle_number: { type: String, required: false }, // Vehicle number of the visitor
    vehicle_type: {
      type: String,
      enum: ["car", "bike", "other"],
      required: false,
    }, // Type of vehicle
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
