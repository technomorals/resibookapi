const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followUpSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: false },
    inquiry_id: { type: Schema.Types.ObjectId, ref: "PropertyInquiry", required: true }, // Reference to the Property Inquiry
    follow_up_date: { type: Date, default: Date.now, required: true }, // Date of the follow-up
    follow_up_notes: { type: String, required: true }, // Notes about the follow-up action
    follow_up_status: {
      type: String,
      enum: ["contacted", "pending", "no_response", "resolved", "rejected"],
      required: true, // Status of follow-up
    },
    next_follow_up_date: { type: Date, required: false }, // Optional: Next follow-up date
  },
  { timestamps: true }
);

module.exports = mongoose.model("FollowUp", followUpSchema);
