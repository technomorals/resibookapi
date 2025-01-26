var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var propertyStatusMasterSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // Name of the property status (e.g., "owned", "pending")
    description: { type: String, required: false }, // Optional description of the status
    is_active: { type: Boolean, required: true, default: true }, // Whether the status is active or not
  },
  { timestamps: true }
);

module.exports = mongoose.model("PropertyStatusMaster", propertyStatusMasterSchema);