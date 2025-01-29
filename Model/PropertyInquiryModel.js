const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertyInquirySchema = new Schema(
  {
    client_name: { type: String, required: true }, // Client's name
    client_email: { type: String, required: true }, // Client's email
    client_phone: { type: String, required: true }, // Client's phone number
    client_message: { type: String, required: false }, // Optional message from client
    property_id: { type: Schema.Types.ObjectId, ref: "Property", required: true }, // Reference to the Property
    inquiry_date: { type: Date, default: Date.now, required: true }, // Date the inquiry was made
    status: {
      type: String,
      enum: ["new", "contacted", "pending", "closed", "resolved"],
      default: "new", // Default status for new inquiries
      required: true,
    },
    follow_up_details: [{ type: Schema.Types.ObjectId, ref: "FollowUp" }], // References to FollowUp schema
  },
  { timestamps: true }
);

module.exports = mongoose.model("PropertyInquiry", propertyInquirySchema);
