const express = require('express');
const router = express.Router();
const vendorController = require('../Controller/VendorController'); // Path to your vendorController

// Routes for vendor operations
router.post('/vendors', vendorController.createVendor); // Create a new vendor
router.get('/vendors', vendorController.getAllVendors); // Get all vendors
router.get('/vendors/:id', vendorController.getVendorById); // Get vendor by ID
router.put('/vendors/:id', vendorController.updateVendor); // Update vendor by ID
router.delete('/vendors/:id', vendorController.deleteVendor); // Delete vendor by ID

module.exports = router;
