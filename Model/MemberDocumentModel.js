const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberDocumentSchema = new Schema(
  {
    member_id: {
      type: Schema.Types.ObjectId,
      ref: "Member", // Reference to the Member model
      required: true, // Document belongs to a specific member
    },
    document_type: {
      type: String,
      enum: ["license", "aadharcard", "pancard", "visa", "insurance"], // Document types
      required: true, // Type of the document
    },
    document_title: {
      type: String,
      required: true, // Title of the document (e.g., "Driving License", "Aadhar Card")
    },
    document_description: {
      type: String,
      required: false, // Optional description of the document (e.g., additional info)
    },
    document_file: {
      type: String,
      required: false, // URL or path to the document file (optional)
    },
    renewal_date: {
      type: Date,
      required: false, // Date when the document is due for renewal (if applicable)
    },
    issue_date: {
      type: Date,
      required: true, // Date when the document was issued
    },
    expiration_date: {
      type: Date,
      required: false, // Expiration date of the document (if applicable)
    },
    status: {
      type: String,
      enum: ["active", "expired", "pending_renewal"], // Status of the document
      required: true,
      default: "active", // Default status is active
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "users", // Reference to the user who uploaded the document
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MemberDocument", memberDocumentSchema);
