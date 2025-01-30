const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courierSchema = new Schema(
  {
    security_person: {
      type: Schema.Types.ObjectId,
      ref: "users", // Reference to the security personnel (user) who received the courier
      required: true,
    },
    site_id: { type: Schema.Types.ObjectId, ref: "Site", required: true },
    building_id: {
      type: Schema.Types.ObjectId,
      ref: "Building",
      required: false,
    },
    floor_id: { type: Schema.Types.ObjectId, ref: "Floor", required: false },
    property_id: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: false,
    }, // Reference to the Property
    received_at: {
      type: Date,
      required: true, // Date and time when the courier was received by security
      default: Date.now,
    },
    received_by: {
      type: String,
      required: true, // Name or ID of the security personnel who received the courier
    },
    courier_status_at_security: {
      type: String,
      enum: ["received", "pending_delivery", "delivered"],
      required: true,
      default: "received", // Status indicating the courier's handling by security
    },
    security_notes: {
      type: String,
      required: false, // Optional notes for any details or issues related to the courier handling
    },
    delivered_at: {
      type: Date,
      required: false, // Date and time when the courier was delivered to the recipient
    },
    delivery_notes: {
      type: String,
      required: false, // Optional notes for the final delivery of the courier
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Courier", courierSchema);
