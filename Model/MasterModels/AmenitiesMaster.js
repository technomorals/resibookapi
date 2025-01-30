var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var amenitiesMaster = new Schema(
  {    
    name: { type: String, required: true, unique: true }, // Name of the amenity (e.g., "Swimming Pool", "Gym")
    description: { type: String, required: false }, // Optional description of the amenity
    icon: { type: String, required: false }, // URL or path to an icon/image representing the amenity
    emoji: { type: String, required: false },
    is_active: { type: Boolean, required: true, default: true }, // Status to check if the amenity is active
  },
  { timestamps: true }
);

module.exports = mongoose.model("AmenitiesMaster", amenitiesMaster);
