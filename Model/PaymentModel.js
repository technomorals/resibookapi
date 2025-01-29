var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var paymentSchema = new Schema(
  {
    sale_id: { type: Schema.Types.ObjectId, ref: "Sales", required: true }, // Reference to the related sale
    payment_amount: { type: Number, required: true }, // Amount paid in this transaction
    payment_method: {
      type: String,
      enum: ["bank_transfer", "cheque", "cash", "online", "other"],
      required: true, // Payment method used
    },
    payment_date: { type: Date, required: true, default: Date.now }, // Date of the payment
    payment_status: {
      type: Schema.Types.ObjectId,
      ref: "PaymentStatusMaster", // Reference to Payment Status Master
      required: true,
    },
    payment_reference: { type: String, required: false }, // Payment reference number (e.g., transaction ID)
    transaction_document: { type: String, required: false }, // Document URL or attachment related to the payment (e.g., bank receipt)
    created_by: { type: Schema.Types.ObjectId, ref: "users", required: true }, // User who recorded the payment
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
