const ServiceTypeMaster = require("..//..//Model/MasterModels/ServiceTypeMaster");

// Create a new service type
exports.createServiceType = [
  async (req, res) => {
    try {
      var data = {};
      var name = req.body.name;
      var description = req.body.description;
      var status = req.body.status;

      if (!name) {
        return res.json({ status: false, message: "Name is required", data: null, error: null });
      }

      data["name"] = name;
      data["description"] = description;
      data["status"] = status || "active";

      let serviceType = new ServiceTypeMaster(data);
      await serviceType.save();
      return res.json({ status: true, message: "Service type created successfully", data: serviceType, error: null });
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

// Get all service types
exports.getAllServiceTypes = async (req, res) => {
  try {
    const serviceTypes = await ServiceTypeMaster.find();
    res.json({ status: true, message: "Service types fetched successfully", data: serviceTypes, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Get a single service type by ID
exports.getServiceTypeById = async (req, res) => {
  try {
    const serviceType = await ServiceTypeMaster.findById(req.params.id);
    if (!serviceType) return res.json({ status: false, message: "Service type not found", data: null, error: null });
    res.json({ status: true, message: "Service type fetched successfully", data: serviceType, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Update a service type by ID
exports.updateServiceType = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const serviceType = await ServiceTypeMaster.findByIdAndUpdate(req.params.id, { name, description, status }, { new: true, runValidators: true });
    if (!serviceType) return res.json({ status: false, message: "Service type not found", data: null, error: null });
    res.json({ status: true, message: "Service type updated successfully", data: serviceType, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Delete a service type by ID
exports.deleteServiceType = async (req, res) => {
  try {
    const serviceType = await ServiceTypeMaster.findByIdAndDelete(req.params.id);
    if (!serviceType) return res.json({ status: false, message: "Service type not found", data: null, error: null });
    res.json({ status: true, message: "Service type deleted successfully", data: null, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};
