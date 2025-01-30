const express = require("express");
const router = express.Router();
const floorController = require("../Controller/FloorController.js");

// Create a new floor
router.post("/", floorController.createFloor);

// Get all floors
router.get("/", floorController.getAllFloors);

// Get a single floor by ID
router.get("/:id", floorController.getFloorById);

// Update a floor by ID
router.put("/:id", floorController.updateFloor);

// Delete a floor by ID
router.delete("/:id", floorController.deleteFloor);

module.exports = router;
