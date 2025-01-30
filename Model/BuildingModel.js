var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var buildingSchema = new Schema(
    {
      site_id: { type: Schema.Types.ObjectId, ref: "Site", required: true }, // Reference to the Site
      name: { type: String, required: true }, // Name of the building/line
      description: { type: String, required: false }, // Optional description
      floors: { type: Number, required: false }, // Number of floors
      units: { type: Number, required: false }, // Number of units
      is_active: { type: Boolean, required: true, default: true }, // Active status
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Building", buildingSchema);
  