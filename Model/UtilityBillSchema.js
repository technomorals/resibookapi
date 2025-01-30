const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const utilityBillSchema = new Schema(
  {
    property_id: {
      type: Schema.Types.ObjectId,
      ref: "Property", // Reference to the Property model
      required: false, // Bill is related to a property
    },
    building_id: {
      type: Schema.Types.ObjectId,
      ref: "Building",
      required: false,
    }, // Reference to the building
    floor_id: { type: Schema.Types.ObjectId, ref: "Floor", required: false }, // Reference to the floor
    site_id: { type: Schema.Types.ObjectId, ref: "Site", required: false }, // Reference to the site
    bill_type: {
      type: String,
      enum: ["electricity", "water", "gas"], // Utility type
      required: true, // Bill must be of a certain type
    },
    bill_month: {
      type: String,
      required: true, // Month the bill is for (e.g., "January 2025")
    },
    bill_year: {
      type: Number,
      required: true, // Year the bill is for
    },
    amount_due: {
      type: Number,
      required: true, // Amount to be paid for the bill
    },
    due_date: {
      type: Date,
      required: true, // Due date for the bill payment
    },
    payment_status: {
      type: String,
      enum: ["paid", "unpaid", "partially_paid", "pending"], // Payment status of the bill
      required: true,
      default: "unpaid", // Default status is unpaid
    },
    paid_amount: {
      type: Number,
      required: false, // Amount paid towards the bill
      default: 0,
    },
    payment_date: {
      type: Date,
      required: false, // Date of payment (if paid)
    },
    invoice_url: {
      type: String,
      required: false, // URL to the electronic copy of the bill (e.g., uploaded file or link to a cloud storage)
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "users", // Reference to the user who created the bill entry
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now, // Timestamp for when the bill was created
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UtilityBill", utilityBillSchema);
