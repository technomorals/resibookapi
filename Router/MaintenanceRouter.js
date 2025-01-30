const express = require('express');
const router = express.Router();
const maintenanceController = require('../Controller/MaintenanceController'); // Path to your controller file

// Routes for maintenance requests
router.post('/maintenance', maintenanceController.createMaintenanceRequest); // Create a new maintenance request
router.get('/maintenance', maintenanceController.getAllMaintenanceRequests); // Get all maintenance requests
router.get('/maintenance/:id', maintenanceController.getMaintenanceRequestById); // Get a maintenance request by ID
router.put('/maintenance/:id', maintenanceController.updateMaintenanceRequest); // Update a maintenance request
router.delete('/maintenance/:id', maintenanceController.deleteMaintenanceRequest); // Delete a maintenance request

module.exports = router;
