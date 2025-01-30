const express = require('express');
const router = express.Router();
const inquiryController = require('../Controller/InquiryController'); // Path to your controller file

// Routes for inquiries
router.post('/inquiries', inquiryController.createInquiry); // Create an inquiry
router.get('/inquiries', inquiryController.getAllInquiries); // Get all inquiries
router.get('/inquiries/:id', inquiryController.getInquiryById); // Get an inquiry by ID
router.put('/inquiries/:id', inquiryController.updateInquiry); // Update an inquiry
router.delete('/inquiries/:id', inquiryController.deleteInquiry); // Delete an inquiry

module.exports = router;
