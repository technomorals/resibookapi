var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var paymentStatusMasterSchema = new Schema(
  {
    status_name: { type: String, required: true, unique: true }, // Name of the payment status
    status_code: { type: String, required: true, unique: true }, // Code representing the status (e.g., "PENDING", "COMPLETED")
    description: { type: String, required: false }, // Description or extra information about the status
    is_active: { type: Boolean, required: true, default: true }, // Whether the status is active or not
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentStatusMaster", paymentStatusMasterSchema);