

const express = require("express");
const router = express.Router();
const propertyStatusController = require("../../Controller/MasterController/PropertyStatusController.js");

// Create a new property status
router.post("/", propertyStatusController.createPropertyStatus);

// Get all property statuses
router.get("/", propertyStatusController.getAllPropertyStatuses);

// Get a single property status by ID
router.get("/:id", propertyStatusController.getPropertyStatusById);

// Update a property status by ID
router.put("/:id", propertyStatusController.updatePropertyStatus);

// Delete a property status by ID
router.delete("/:id", propertyStatusController.deletePropertyStatus);

module.exports = router;