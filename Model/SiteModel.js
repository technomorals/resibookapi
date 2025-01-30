var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var site = new Schema(
  {
    name: { type: String, required: true }, // Name of the site/property
    description: { type: String, required: false }, // Brief description of the site
    address: { type: String, required: true }, // Full address of the site
    pincode: { type: String, required: true }, // Pincode/Postal code
    country: { type: String, required: true }, // Country where the site is located
    state: { type: String, required: true }, // State where the site is located
    city: { type: String, required: true }, // City where the site is located
    latitude: { type: Number, required: false }, // Latitude for geolocation
    longitude: { type: Number, required: false }, // Longitude for geolocation
    owner_id: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the owner (user) of the property
    is_active: { type: Boolean, required: true, default: true }, // Status of the site (active/inactive)
    is_verified: { type: Boolean, required: true, default: false }, // Verification status of the site
    images: [{ type: String, required: false }], // Array of image URLs for the site
    site_type: { type: String, required: true }, // Type of site (e.g., residential, commercial, etc.)
    created_by: { type: Schema.Types.ObjectId, ref: "users", required: true }, // User who created the site entry
    developer_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "SiteDeveloper",
      },
    ],
    amenities: [
      {
        type: Schema.Types.ObjectId,
        ref: "AmenitiesMaster",
        required: false, // Array of references to the AmenitiesMaster model
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Site", site);
