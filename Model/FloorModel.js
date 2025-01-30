var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var floorSchema = new Schema(
  {
    site_id: { type: Schema.Types.ObjectId, ref: "Site", required: true },
    building_id: {
      type: Schema.Types.ObjectId,
      ref: "Building",
      required: true,
    }, // Reference to the Building
    floor_number: { type: String, required: true }, // Floor number (e.g., 1, 2, 3, etc.)
    unit_count: { type: Number, required: true }, // Number of units on this floor
    is_active: { type: Boolean, required: true, default: true }, // Active status
    description: { type: String, required: false }, // Optional description of the floor
  },
  { timestamps: true }
);

module.exports = mongoose.model("Floor", floorSchema);
