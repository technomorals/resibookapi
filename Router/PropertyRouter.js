const express = require('express');
const router = express.Router();
const propertyController = require('../Controller/PropertyController'); // Path to your controller

// Routes for property management
router.post('/property', propertyController.createProperty); // Create a new property
router.get('/property', propertyController.getAllProperties); // Get all properties
router.get('/property/:id', propertyController.getPropertyById); // Get a specific property by ID
router.put('/property/:id', propertyController.updateProperty); // Update a property by ID
router.delete('/property/:id', propertyController.deleteProperty); // Delete a property by ID

module.exports = router;
