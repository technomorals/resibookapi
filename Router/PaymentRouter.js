const express = require('express');
const router = express.Router();
const paymentController = require('../Controller/PaymentController'); // Path to your controller

// Routes for payment management
router.post('/payment', paymentController.createPayment); // Create a new payment
router.get('/payment', paymentController.getAllPayments); // Get all payments
router.get('/payment/:id', paymentController.getPaymentById); // Get a specific payment by ID
router.put('/payment/:id', paymentController.updatePayment); // Update a payment record
router.delete('/payment/:id', paymentController.deletePayment); // Delete a payment record

module.exports = router;
