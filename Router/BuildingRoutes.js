const express = require("express");
const router = express.Router();
const buildingController = require("../Controller/BuildingController");

// Create a new building
router.post("/", buildingController.createBuilding);

// Get all buildings
router.get("/", buildingController.getAllBuildings);

// Get a single building by ID
router.get("/:id", buildingController.getBuildingById);

// Update a building by ID
router.put("/:id", buildingController.updateBuilding);

// Delete a building by ID
router.delete("/:id", buildingController.deleteBuilding);

module.exports = router;