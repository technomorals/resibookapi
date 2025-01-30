const express = require("express");
const router = express.Router();
const amenitiesController = require("../../Controller/MasterController/AmenitiesController.js");

// Create a new amenity
router.post("/", amenitiesController.createAmenity);

// Get all amenities
router.get("/", amenitiesController.getAllAmenities);

// Get a single amenity by ID
router.get("/:id", amenitiesController.getAmenityById);

// Update an amenity by ID
router.put("/:id", amenitiesController.updateAmenity);

// Delete an amenity by ID
router.delete("/:id", amenitiesController.deleteAmenity);

module.exports = router;
