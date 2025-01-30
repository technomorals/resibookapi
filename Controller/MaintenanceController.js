const Maintenance = require('../Model/MaintenanceModel.js'); // Path to your Maintenance model

// Create a new maintenance request
exports.createMaintenanceRequest = async (req, res) => {
  try {
    const { property_id, maintenance_type, description, requested_by, assigned_to, start_date, cost, invoices, documents } = req.body;

    const newMaintenance = new Maintenance({
      property_id,
      maintenance_type,
      description,
      requested_by,
      assigned_to,
      start_date,
      cost,
      invoices,
      documents,
    });

    // Save the maintenance request to the database
    await newMaintenance.save();

    return res.json({
      status: true,
      message: 'Maintenance request created successfully',
      data: newMaintenance,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error creating maintenance request',
      data: null,
      error: error.message,
    });
  }
};

// Get all maintenance requests
exports.getAllMaintenanceRequests = async (req, res) => {
  try {
    const maintenanceRequests = await Maintenance.find().populate('property_id requested_by assigned_to');

    if (!maintenanceRequests.length) {
      return res.json({
        status: false,
        message: 'No maintenance requests found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Maintenance requests retrieved successfully',
      data: maintenanceRequests,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving maintenance requests',
      data: null,
      error: error.message,
    });
  }
};

// Get a specific maintenance request by ID
exports.getMaintenanceRequestById = async (req, res) => {
  const { id } = req.params;

  try {
    const maintenanceRequest = await Maintenance.findById(id).populate('property_id requested_by assigned_to');

    if (!maintenanceRequest) {
      return res.json({
        status: false,
        message: 'Maintenance request not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Maintenance request retrieved successfully',
      data: maintenanceRequest,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving maintenance request',
      data: null,
      error: error.message,
    });
  }
};

// Update a maintenance request
exports.updateMaintenanceRequest = async (req, res) => {
  const { id } = req.params;
  const { status, assigned_to, end_date, cost, invoices, documents } = req.body;

  try {
    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      id,
      { status, assigned_to, end_date, cost, invoices, documents },
      { new: true }
    );

    if (!updatedMaintenance) {
      return res.json({
        status: false,
        message: 'Maintenance request not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Maintenance request updated successfully',
      data: updatedMaintenance,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error updating maintenance request',
      data: null,
      error: error.message,
    });
  }
};

// Delete a maintenance request
exports.deleteMaintenanceRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMaintenance = await Maintenance.findByIdAndDelete(id);

    if (!deletedMaintenance) {
      return res.json({
        status: false,
        message: 'Maintenance request not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Maintenance request deleted successfully',
      data: deletedMaintenance,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error deleting maintenance request',
      data: null,
      error: error.message,
    });
  }
};
