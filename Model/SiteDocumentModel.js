const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteDocumentSchema = new Schema(
  {
    site_id: { type: Schema.Types.ObjectId, ref: "Site", required: true }, // Reference to the site
    document_name: { type: String, required: true }, // Name of the document (e.g., Site Plan, Permit, Title Deed)
    document_type: {
      type: String,
      enum: [
        "land_title", // Title deed of the land
        "building_permit", // Permit to build on the site
        "site_plan", // Site layout or architectural plan
        "construction_contract", // Contract with construction company
        "tax_document", // Tax-related documents
        "agreement", // Various agreements like sale or lease
        "other", // Any other document type
      ],
      required: true, // Type of the document
    },
    document_url: { type: String, required: true }, // URL to the document (e.g., cloud storage, server)
    uploaded_by: { type: Schema.Types.ObjectId, ref: "users", required: true }, // User who uploaded the document
    upload_date: { type: Date, default: Date.now }, // Date when the document was uploaded
    expiration_date: { type: Date, required: false }, // Expiration date (if applicable for permits, contracts, etc.)
    status: {
      type: String,
      enum: ["active", "expired", "pending", "rejected"],
      default: "active", // Status of the document (active, expired, pending review, etc.)
      required: true,
    },
    description: { type: String, required: false }, // Optional field for additional description or notes on the document
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("SiteDocument", siteDocumentSchema);
