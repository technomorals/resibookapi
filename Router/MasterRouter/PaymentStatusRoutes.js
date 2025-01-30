const express = require("express");
const router = express.Router();
const paymentStatusController = require("../../Controller/MasterController/PaymentStatusController.js");

// Create a new payment status
router.post("/", paymentStatusController.createPaymentStatus);

// Get all payment statuses
router.get("/", paymentStatusController.getAllPaymentStatuses);

// Get a single payment status by ID
router.get("/:id", paymentStatusController.getPaymentStatusById);

// Update a payment status by ID
router.put("/:id", paymentStatusController.updatePaymentStatus);

// Delete a payment status by ID
router.delete("/:id", paymentStatusController.deletePaymentStatus);

module.exports = router;