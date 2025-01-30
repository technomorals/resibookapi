const PaymentStatusMaster = require("..//..//Model/MasterModels/PaymentStatusMaster");

// Create a new payment status
exports.createPaymentStatus = [
  async (req, res) => {
    try {
      var data = {};
      var status_name = req.body.status_name;
      var status_code = req.body.status_code;
      var description = req.body.description;
      var is_active = req.body.is_active;

      if (!status_name) {
        return res.json({ status: false, message: "Status name is required", data: null, error: null });
      }
      if (!status_code) {
        return res.json({ status: false, message: "Status code is required", data: null, error: null });
      }

      data["status_name"] = status_name;
      data["status_code"] = status_code;
      data["description"] = description;
      data["is_active"] = is_active;

      let paymentStatus = new PaymentStatusMaster(data);
      await paymentStatus.save();
      return res.json({ status: true, message: "Payment status created successfully", data: paymentStatus, error: null });
    } catch (error) {
      return res.json({
        status: false,
        message: "error",
        data: null,
        error: error.message,
      });
    }
  },
];

// Get all payment statuses
exports.getAllPaymentStatuses = async (req, res) => {
  try {
    const paymentStatuses = await PaymentStatusMaster.find();
    res.json({ status: true, message: "Payment statuses fetched successfully", data: paymentStatuses, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Get a single payment status by ID
exports.getPaymentStatusById = async (req, res) => {
  try {
    const paymentStatus = await PaymentStatusMaster.findById(req.params.id);
    if (!paymentStatus) return res.json({ status: false, message: "Payment status not found", data: null, error: null });
    res.json({ status: true, message: "Payment status fetched successfully", data: paymentStatus, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Update a payment status by ID
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status_name, status_code, description, is_active } = req.body;
    const paymentStatus = await PaymentStatusMaster.findByIdAndUpdate(req.params.id, { status_name, status_code, description, is_active }, { new: true, runValidators: true });
    if (!paymentStatus) return res.json({ status: false, message: "Payment status not found", data: null, error: null });
    res.json({ status: true, message: "Payment status updated successfully", data: paymentStatus, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Delete a payment status by ID
exports.deletePaymentStatus = async (req, res) => {
  try {
    const paymentStatus = await PaymentStatusMaster.findByIdAndDelete(req.params.id);
    if (!paymentStatus) return res.json({ status: false, message: "Payment status not found", data: null, error: null });
    res.json({ status: true, message: "Payment status deleted successfully", data: null, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};
