var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var propertySchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: false },
    site_id: { type: Schema.Types.ObjectId, ref: "Site", required: true },
    building_id: {
      type: Schema.Types.ObjectId,
      ref: "Building",
      required: true,
    },
    floor_id: { type: Schema.Types.ObjectId, ref: "Floor", required: true }, // Reference to the Floor
    property_name: { type: String, required: true }, // Name or number of the property (e.g., "Apt 101", "Office 202")
    property_type: {
      type: Schema.Types.ObjectId, // Reference to PropertyTypeMaster
      ref: "PropertyTypeMaster", // Ensures consistent property type usage
      required: true, // Property type is mandatory
    },
    size: { type: String, required: true }, // Size of the property (e.g., in square feet or meters)
    price: { type: String, required: true }, // Price of the property
    is_available: { type: Boolean, required: true, default: true }, // Availability status
    description: { type: String, required: false }, // Optional description of the property
    facilities: [
      {
        type: Schema.Types.ObjectId,
        ref: "FacilitiesMaster", // Reference to the FacilitiesMaster model
        required: false, // Optional list of facilities
      },
    ],
    property_status: {
      type: Schema.Types.ObjectId, // Reference to PropertyStatusMaster
      ref: "PropertyStatusMaster", // Ensures consistent property status usage
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
