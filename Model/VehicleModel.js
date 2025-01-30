const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    property_id: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: false,
    }, // Reference to the property
    building_id: {
      type: Schema.Types.ObjectId,
      ref: "Building",
      required: false,
    }, // Reference to the building
    floor_id: { type: Schema.Types.ObjectId, ref: "Floor", required: false }, // Reference to the floor
    site_id: { type: Schema.Types.ObjectId, ref: "Site", required: false }, // Reference to the site

    vehicle_number: {
      type: String,
      required: true,
      unique: true, // Ensures the vehicle number is unique
    }, // Vehicle's registration number (e.g., "XYZ-1234")

    vehicle_type: {
      type: String,
      enum: ["car", "bike", "truck", "bus", "other"], // Types of vehicles
      required: true,
    }, // Type of the vehicle (Car, Bike, Truck, etc.)

    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "users", // Reference to the User model (vehicle owner)
      required: false,
    }, // Owner of the vehicle (linked to the User model)

    brand: {
      type: String,
      required: true,
    }, // Vehicle's brand (e.g., Toyota, Honda, etc.)

    model: {
      type: String,
      required: true,
    }, // Model of the vehicle (e.g., Corolla, Civic, etc.)

    color: {
      type: String,
      required: true,
    }, // Vehicle's color (e.g., Red, Blue, etc.)

    year_of_manufacture: {
      type: Number,
      required: true,
    }, // Year the vehicle was manufactured (e.g., 2020)

    engine_capacity: {
      type: String,
      required: false,
    }, // Engine capacity (e.g., 2.0L, 1500cc)

    fuel_type: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid", "CNG", "other"],
      required: true,
    }, // Fuel type (Petrol, Diesel, Electric, etc.)

    insurance_expiry_date: {
      type: Date,
      required: false,
    }, // Date when the vehicle's insurance expires

    registration_date: {
      type: Date,
      required: true,
      default: Date.now,
    }, // Date when the vehicle was registered

    status: {
      type: String,
      enum: ["active", "inactive", "sold", "scrapped"],
      default: "active",
      required: true,
    }, // Status of the vehicle (Active, Inactive, Sold, Scrapped)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
