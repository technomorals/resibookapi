const express = require('express');
const router = express.Router();
const propertyInquiryController = require('../Controller/PropertyInquiryController'); // Path to your controller

// Routes for property inquiry management
router.post('/property-inquiry', propertyInquiryController.createPropertyInquiry); // Create a new property inquiry
router.get('/property-inquiry', propertyInquiryController.getAllPropertyInquiries); // Get all property inquiries
router.get('/property-inquiry/:id', propertyInquiryController.getPropertyInquiryById); // Get a specific property inquiry by ID
router.put('/property-inquiry/:id', propertyInquiryController.updatePropertyInquiry); // Update a property inquiry by ID
router.delete('/property-inquiry/:id', propertyInquiryController.deletePropertyInquiry); // Delete a property inquiry by ID

module.exports = router;