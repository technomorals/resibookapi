const FacilitiesMaster = require("..//..//Model/MasterModels/FacilitiesMaster");

// Create a new facility
exports.createFacility = [
  async (req, res) => {
    try {
      var data = {};
      var name = req.body.name;
      var description = req.body.description;
      var is_active = req.body.is_active;
      var emoji = req.body.emoji;
      if (!name) {
        return res.json({ status: false, message: "Name is required", data: null, error: null });
      }

      data["name"] = name;
      data["description"] = description;
      data["is_active"] = is_active;
      data["emoji"] = emoji;
      
      let facility = new FacilitiesMaster(data);
      await facility.save();
      return res.json({ status: true, message: "Facility created successfully", data: facility, error: null });
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

// Get all facilities
exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await FacilitiesMaster.find();
    res.json({ status: true, message: "Facilities fetched successfully", data: facilities, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Get a single facility by ID
exports.getFacilityById = async (req, res) => {
  try {
    const facility = await FacilitiesMaster.findById(req.params.id);
    if (!facility) return res.json({ status: false, message: "Facility not found", data: null, error: null });
    res.json({ status: true, message: "Facility fetched successfully", data: facility, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Update a facility by ID
exports.updateFacility = async (req, res) => {
  try {
    const { name, description, is_active } = req.body;
    const facility = await FacilitiesMaster.findByIdAndUpdate(req.params.id, { name, description, is_active }, { new: true, runValidators: true });
    if (!facility) return res.json({ status: false, message: "Facility not found", data: null, error: null });
    res.json({ status: true, message: "Facility updated successfully", data: facility, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Delete a facility by ID
exports.deleteFacility = async (req, res) => {
  try {
    const facility = await FacilitiesMaster.findByIdAndDelete(req.params.id);
    if (!facility) return res.json({ status: false, message: "Facility not found", data: null, error: null });
    res.json({ status: true, message: "Facility deleted successfully", data: null, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};
