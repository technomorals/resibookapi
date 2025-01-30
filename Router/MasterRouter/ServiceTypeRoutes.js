const express = require("express");
const router = express.Router();
const serviceTypeController = require("../../Controller/MasterController/ServiceTypeController.js");

// Create a new service type
router.post("/", serviceTypeController.createServiceType);

// Get all service types
router.get("/", serviceTypeController.getAllServiceTypes);

// Get a single service type by ID
router.get("/:id", serviceTypeController.getServiceTypeById);

// Update a service type by ID
router.put("/:id", serviceTypeController.updateServiceType);

// Delete a service type by ID
router.delete("/:id", serviceTypeController.deleteServiceType);

module.exports = router;