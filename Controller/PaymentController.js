const Payment = require('../Model/PaymentModel.js'); // Path to your Payment model
const Sales = require('../Model/SalesModel.js'); // Path to your Sales model
const PaymentStatusMaster = require('../Model/MasterModels/PaymentStatusMaster.js'); // Path to your PaymentStatusMaster model

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { sale_id, payment_amount, payment_method, payment_status, payment_reference, transaction_document, created_by } = req.body;

    // Check if the sale exists
    const sale = await Sales.findById(sale_id);
    if (!sale) {
      return res.json({
        status: false,
        message: 'Sale not found',
        data: null,
        error: null,
      });
    }

    // Check if the payment status exists
    const status = await PaymentStatusMaster.findById(payment_status);
    if (!status) {
      return res.json({
        status: false,
        message: 'Payment status not found',
        data: null,
        error: null,
      });
    }

    const newPayment = new Payment({
      sale_id,
      payment_amount,
      payment_method,
      payment_date: new Date(),
      payment_status,
      payment_reference,
      transaction_document,
      created_by,
    });

    // Save the payment to the database
    await newPayment.save();

    return res.json({
      status: true,
      message: 'Payment recorded successfully',
      data: newPayment,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error creating payment',
      data: null,
      error: error.message,
    });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('sale_id payment_status created_by') // Populate related fields
      .exec();

    if (!payments.length) {
      return res.json({
        status: false,
        message: 'No payments found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Payments retrieved successfully',
      data: payments,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving payments',
      data: null,
      error: error.message,
    });
  }
};

// Get a specific payment by ID
exports.getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id)
      .populate('sale_id payment_status created_by'); // Populate related fields

    if (!payment) {
      return res.json({
        status: false,
        message: 'Payment not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Payment retrieved successfully',
      data: payment,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving payment',
      data: null,
      error: error.message,
    });
  }
};

// Update a payment record
exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { payment_amount, payment_method, payment_status, payment_reference, transaction_document } = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { payment_amount, payment_method, payment_status, payment_reference, transaction_document },
      { new: true } // Return updated document
    );

    if (!updatedPayment) {
      return res.json({
        status: false,
        message: 'Payment not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Payment updated successfully',
      data: updatedPayment,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error updating payment',
      data: null,
      error: error.message,
    });
  }
};

// Delete a payment record
exports.deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.json({
        status: false,
        message: 'Payment not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Payment deleted successfully',
      data: deletedPayment,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error deleting payment',
      data: null,
      error: error.message,
    });
  }
};
