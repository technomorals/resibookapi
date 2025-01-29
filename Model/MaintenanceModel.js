var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var maintenanceSchema = new Schema(
  {
    property_id: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    }, // Reference to the Property
    maintenance_type: {
      type: String,
      enum: [
        "repair", // Repair work
        "renovation", // Renovation or improvement work
        "cleaning", // General cleaning
        "inspection", // Inspection for issues
        "other", // Other maintenance activities
      ],
      required: true,
    },
    description: { type: String, required: true }, // Description of the maintenance request
    status: {
      type: String,
      enum: [
        "pending", // Maintenance request is pending
        "in_progress", // Maintenance is being worked on
        "completed", // Maintenance has been completed
        "on_hold", // Maintenance is on hold
        "cancelled", // Maintenance request has been cancelled
      ],
      required: true,
      default: "pending", // Default status is pending
    },
    requested_by: { type: Schema.Types.ObjectId, ref: "users", required: true }, // User who requested the maintenance
    assigned_to: { type: Schema.Types.ObjectId, ref: "users", required: false }, // User assigned to perform the maintenance
    start_date: { type: Date, required: false }, // Start date for the maintenance task
    end_date: { type: Date, required: false }, // End date for the maintenance task (if completed)
    cost: { type: Number, required: false }, // Cost of the maintenance work
    // Invoices related to the maintenance (if applicable)
    invoices: [
      {
        invoice_number: { type: String, required: true }, // Invoice number
        invoice_date: { type: Date, required: true }, // Invoice date
        amount: { type: Number, required: true }, // Invoice amount
        status: {
          type: String,
          enum: ["paid", "unpaid", "partially_paid", "pending"],
          default: "unpaid", // Default invoice status is unpaid
          required: true,
        },
        document_url: { type: String, required: true }, // URL of the invoice document (stored on cloud or file system)
      },
    ],

    // Document attachments related to the maintenance request
    documents: [
      {
        document_type: {
          type: String,
          enum: [
            "repair_report", // Document for repair details
            "contract", // Maintenance contract
            "invoice", // Invoice document
            "inspection_report", // Inspection documents
            "other", // Any other document type
          ],
          required: true,
        },
        document_url: { type: String, required: true }, // URL of the document
        uploaded_by: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        }, // User who uploaded the document
        upload_date: { type: Date, default: Date.now }, // Date the document was uploaded
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
