const express = require("express");
const router = express.Router();
const facilitiesController = require("../../Controller/MasterController/FacilitiesController.js");

// Create a new facility
router.post("/", facilitiesController.createFacility);

// Get all facilities
router.get("/", facilitiesController.getAllFacilities);

// Get a single facility by ID
router.get("/:id", facilitiesController.getFacilityById);

// Update a facility by ID
router.put("/:id", facilitiesController.updateFacility);

// Delete a facility by ID
router.delete("/:id", facilitiesController.deleteFacility);

module.exports = router;
