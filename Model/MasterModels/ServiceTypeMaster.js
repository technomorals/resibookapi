const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceTypeMasterSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // Service type name (e.g., "Maintenance", "Security", etc.)
    description: { type: String, required: false }, // Optional description of the service type
    status: { 
      type: String, 
      enum: ["active", "inactive"], 
      required: true, 
      default: "active" 
    }, // Status to mark whether the service type is active or inactive
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceTypeMaster", serviceTypeMasterSchema);
