const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteDeveloperSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // Developer's name
    company_name: { type: String, required: true }, // Developer's company name (if applicable)
    contact_person: { type: String, required: true }, // Contact person at the developer's company
    contact_number: { type: String, required: true }, // Developer's contact number
    email: { type: String, required: true, unique: true }, // Developer's email address
    website: { type: String, required: false }, // Developer's website URL (optional)
    address: { type: String, required: false }, // Developer's office address
    city: { type: String, required: false }, // City where the developer is located
    state: { type: String, required: false }, // State where the developer is located
    country: { type: String, required: false }, // Country where the developer is located
    pincode: { type: String, required: false }, // Pincode/Postal code    
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      required: true,
      default: "active", // Developer status
    },
    contract_start_date: { type: Date, required: false }, // Start date of the developer's contract (if applicable)
    contract_end_date: { type: Date, required: false }, // End date of the developer's contract (if applicable)
    created_by: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the user who created the developer record
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("SiteDeveloper", siteDeveloperSchema);
