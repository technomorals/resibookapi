const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // Vendor's name
    contact_person: { type: String, required: true }, // Contact person at the vendor company
    contact_number: { type: String, required: true }, // Vendor's contact number
    email: { type: String, required: true }, // Vendor's email address
    service_types: [
      {
        type: Schema.Types.ObjectId,
        ref: "ServiceTypeMaster", // Reference to the ServiceTypeMaster model
        required: true, // Vendor must have at least one service type
      },
    ], // Array of service types provided by the vendor
    company_name: { type: String, required: true }, // Vendor's company name (if applicable)
    address: { type: String, required: false }, // Vendor's address
    city: { type: String, required: false }, // Vendor's city
    state: { type: String, required: false }, // Vendor's state
    country: { type: String, required: false }, // Vendor's country
    pincode: { type: String, required: false }, // Vendor's pincode/postal code
    payment_terms: {
      type: String,
      enum: ["immediate", "30_days", "60_days", "90_days", "other"],
      required: true,
    }, // Payment terms (e.g., immediate, 30 days)
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      required: true,
      default: "active",
    }, // Current status of the vendor
    contract_start_date: { type: Date, required: false }, // Start date of the vendor contract
    contract_end_date: { type: Date, required: false }, // End date of the vendor contract
    created_by: { type: Schema.Types.ObjectId, ref: "users", required: true }, // User who added the vendor
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
