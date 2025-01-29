const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inquirySchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the user making the inquiry
    inquiry_type: { 
      type: String, 
      enum: ["property", "building", "site", "other"], 
      required: true 
    }, // Type of inquiry (Property, Building, Site, etc.)
    inquiry_details: { type: String, required: true }, // Details of the inquiry
    related_site_id: { type: Schema.Types.ObjectId, ref: "Site", required: false }, // Reference to the related site (if applicable)
    related_building_id: { type: Schema.Types.ObjectId, ref: "Building", required: false }, // Reference to the related building (if applicable)
    related_property_id: { type: Schema.Types.ObjectId, ref: "Property", required: false }, // Reference to the related property (if applicable)
    vendor_id: { type: Schema.Types.ObjectId, ref: "Vendor", required: false }, // Reference to the vendor associated with the inquiry
    inquiry_date: { type: Date, required: true, default: Date.now }, // Date of the inquiry
    status: { 
      type: String, 
      enum: ["pending", "in_progress", "responded", "closed", "rejected"], 
      required: true, 
      default: "pending" 
    }, // Status of the inquiry
    assigned_to: { type: Schema.Types.ObjectId, ref: "users", required: false }, // Reference to the user assigned to handle the inquiry (if any)
    response_due_date: { type: Date, required: false }, // Date by which a response should be provided (if any)
    response: { type: String, required: false }, // Response to the inquiry
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
