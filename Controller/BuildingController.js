const Building = require("../Model/BuildingModel");

// Create a new building
exports.createBuilding = [
  async (req, res) => {
    try {
      var data = {};
      var site_id = req.body.site_id;
      var name = req.body.name;
      var description = req.body.description;
      var floors = req.body.floors;
      var units = req.body.units;
      var is_active = req.body.is_active;

      if (!site_id) {
        return res.json({ status: false, message: "Site ID is required", data: null, error: null });
      }
      if (!name) {
        return res.json({ status: false, message: "Name is required", data: null, error: null });
      }

      data["site_id"] = site_id;
      data["name"] = name;
      data["description"] = description;
      data["floors"] = floors;
      data["units"] = units;
      data["is_active"] = is_active;

      let building = new Building(data);
      await building.save();
      return res.json({ status: true, message: "Building created successfully", data: building, error: null });
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

// Get all buildings
exports.getAllBuildings = async (req, res) => {
  try {
    const buildings = await Building.find().populate("site_id");
    res.json({ status: true, message: "Buildings fetched successfully", data: buildings, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Get a single building by ID
exports.getBuildingById = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id).populate("site_id");
    if (!building) return res.json({ status: false, message: "Building not found", data: null, error: null });
    res.json({ status: true, message: "Building fetched successfully", data: building, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Update a building by ID
exports.updateBuilding = async (req, res) => {
  try {
    const { site_id, name, description, floors, units, is_active } = req.body;
    const building = await Building.findByIdAndUpdate(req.params.id, { site_id, name, description, floors, units, is_active }, { new: true, runValidators: true });
    if (!building) return res.json({ status: false, message: "Building not found", data: null, error: null });
    res.json({ status: true, message: "Building updated successfully", data: building, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Delete a building by ID
exports.deleteBuilding = async (req, res) => {
  try {
    const building = await Building.findByIdAndDelete(req.params.id);
    if (!building) return res.json({ status: false, message: "Building not found", data: null, error: null });
    res.json({ status: true, message: "Building deleted successfully", data: null, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};
