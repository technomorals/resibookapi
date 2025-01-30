const express = require('express');
const router = express.Router();
const siteController = require('../Controller/SiteController'); // Path to your siteController

// Routes for site management
router.post('/sites', siteController.createSite); // Create a new site
router.use('/sites', siteController.getAllSites);
router.get('/sites/:id', siteController.getSiteById); // Get a specific site by ID
router.put('/sites/:id', siteController.updateSite); // Update a site by ID
router.delete('/sites/:id', siteController.deleteSite); // Delete a site by ID

module.exports = router;