var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var propertyTypeMasterSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // Name of the property type (e.g., "apartment", "office")
    description: { type: String, required: false }, // Optional description of the property type
    is_active: { type: Boolean, required: true, default: true }, // Whether the property type is active or not
  },
  { timestamps: true }
);

module.exports = mongoose.model("PropertyTypeMaster", propertyTypeMasterSchema);