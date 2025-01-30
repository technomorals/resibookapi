var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var facilitiesMasterSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // Name of the facility (e.g., "Parking", "Gym")
    description: { type: String, required: false }, // Optional description about the facility
    emoji: { type: String, required: false },
    is_active: { type: Boolean, required: true, default: true }, // Whether the facility is currently active or not
  },
  { timestamps: true }
);

module.exports = mongoose.model("FacilitiesMaster", facilitiesMasterSchema);