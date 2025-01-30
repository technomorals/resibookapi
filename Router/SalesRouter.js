const express = require('express');
const router = express.Router();
const salesController = require('../Controller/SalesController'); // Path to your salesController

// Routes for sales management
router.post('/sales', salesController.createSale); // Create a new sale
router.get('/sales', salesController.getAllSales); // Get all sales
router.get('/sales/:id', salesController.getSaleById); // Get a specific sale by ID
router.put('/sales/:id', salesController.updateSale); // Update a sale by ID
router.delete('/sales/:id', salesController.deleteSale); // Delete a sale by ID

module.exports = router;
