const express = require("express");
const router = express.Router();
const propertyTypeController = require("../../Controller/MasterController/PropertyTypeController.js");

// Create a new property type
router.post("/", propertyTypeController.createPropertyType);

// Get all property types
router.get("/", propertyTypeController.getAllPropertyTypes);

// Get a single property type by ID
router.get("/:id", propertyTypeController.getPropertyTypeById);

// Update a property type by ID
router.put("/:id", propertyTypeController.updatePropertyType);

// Delete a property type by ID
router.delete("/:id", propertyTypeController.deletePropertyType);

module.exports = router;