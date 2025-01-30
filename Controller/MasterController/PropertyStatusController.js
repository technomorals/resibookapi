const PropertyStatusMaster = require("..//..//Model/MasterModels/PropertyStatusMaster");

// Create a new property status
exports.createPropertyStatus = [
  async (req, res) => {
    try {
      var data = {};
      var name = req.body.name;
      var description = req.body.description;
      var is_active = req.body.is_active;

      if (!name) {
        return res.json({ status: false, message: "Name is required", data: null, error: null });
      }

      data["name"] = name;
      data["description"] = description;
      data["is_active"] = is_active;

      let propertyStatus = new PropertyStatusMaster(data);
      await propertyStatus.save();
      return res.json({ status: true, message: "Property status created successfully", data: propertyStatus, error: null });
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

// Get all property statuses
exports.getAllPropertyStatuses = async (req, res) => {
  try {
    const propertyStatuses = await PropertyStatusMaster.find();
    res.json({ status: true, message: "Property statuses fetched successfully", data: propertyStatuses, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Get a single property status by ID
exports.getPropertyStatusById = async (req, res) => {
  try {
    const propertyStatus = await PropertyStatusMaster.findById(req.params.id);
    if (!propertyStatus) return res.json({ status: false, message: "Property status not found", data: null, error: null });
    res.json({ status: true, message: "Property status fetched successfully", data: propertyStatus, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Update a property status by ID
exports.updatePropertyStatus = async (req, res) => {
  try {
    const { name, description, is_active } = req.body;
    const propertyStatus = await PropertyStatusMaster.findByIdAndUpdate(req.params.id, { name, description, is_active }, { new: true, runValidators: true });
    if (!propertyStatus) return res.json({ status: false, message: "Property status not found", data: null, error: null });
    res.json({ status: true, message: "Property status updated successfully", data: propertyStatus, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Delete a property status by ID
exports.deletePropertyStatus = async (req, res) => {
  try {
    const propertyStatus = await PropertyStatusMaster.findByIdAndDelete(req.params.id);
    if (!propertyStatus) return res.json({ status: false, message: "Property status not found", data: null, error: null });
    res.json({ status: true, message: "Property status deleted successfully", data: null, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};