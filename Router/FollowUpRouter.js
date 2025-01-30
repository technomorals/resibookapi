const express = require('express');
const router = express.Router();
const followUpController = require('../Controller/FollowUpController'); // Path to your controller file

// Routes for follow-up
router.post('/follow-ups', followUpController.createFollowUp); // Create a follow-up
router.get('/follow-ups', followUpController.getAllFollowUps); // Get all follow-ups
router.get('/follow-ups/:id', followUpController.getFollowUpById); // Get a follow-up by ID
router.put('/follow-ups/:id', followUpController.updateFollowUp); // Update a follow-up
router.delete('/follow-ups/:id', followUpController.deleteFollowUp); // Delete a follow-up

module.exports = router;
