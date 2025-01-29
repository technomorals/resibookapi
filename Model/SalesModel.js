var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var salesSchema = new Schema(
  {
    site_id: { type: Schema.Types.ObjectId, ref: "Site", required: true }, // Reference to the site being sold
    property_id: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    }, // Reference to the property being sold
    buyer_id: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the buyer
    seller_id: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the site owner/seller
    sale_price: { type: Number, required: true }, // Final price of the sale
    total_paid: { type: Number, required: true, default: 0 }, // Total amount paid so far
    remaining_balance: { type: Number, required: true }, // Remaining balance for the sale
    payment_status: {
      type: Schema.Types.ObjectId, // Reference to PropertyStatusMaster
      ref: "PaymentStatusMaster", // Ensures consistent property status usage
      required: true,
    },
    sale_status: {
      type: Schema.Types.ObjectId, // Reference to PropertyStatusMaster
      ref: "PropertyStatusMaster", // Ensures consistent property status usage
      required: true,
    },

    sale_date: { type: Date, required: true, default: Date.now }, // Date of the sale
    documents: [
      {
        doc_name: { type: String, required: true }, // Name of the document (e.g., Sale Deed, Agreement)
        doc_url: { type: String, required: true }, // URL of the uploaded document
      },
    ], // List of associated sale documents
    remarks: { type: String, required: false }, // Additional remarks about the transaction
    created_by: { type: Schema.Types.ObjectId, ref: "users", required: true }, // User who created the sales record
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sales", salesSchema);
