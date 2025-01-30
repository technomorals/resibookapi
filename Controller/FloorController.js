const Floor = require("../Model/FloorModel.js");

// Create a new floor
exports.createFloor = [
  async (req, res) => {
    try {
      var data = {};
      var building_id = req.body.building_id;
      var floor_number = req.body.floor_number;
      var unit_count = req.body.unit_count;
      var is_active = req.body.is_active;
      var description = req.body.description;

      if (!building_id) {
        return res.json({
          status: false,
          message: "Building ID is required",
          data: null,
          error: null,
        });
      }
      if (floor_number === undefined) {
        return res.json({
          status: false,
          message: "Floor number is required",
          data: null,
          error: null,
        });
      }
      if (unit_count === undefined) {
        return res.json({
          status: false,
          message: "Unit count is required",
          data: null,
          error: null,
        });
      }

      data["building_id"] = building_id;
      data["floor_number"] = floor_number;
      data["unit_count"] = unit_count;
      data["is_active"] = is_active;
      data["description"] = description;

      let floor = new Floor(data);
      await floor.save();
      return res.json({
        status: true,
        message: "Floor created successfully",
        data: floor,
        error: null,
      });
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

// Get all floors
exports.getAllFloors = async (req, res) => {
  try {
    const floors = await Floor.find().populate("building_id");
    res.json({
      status: true,
      message: "Floors fetched successfully",
      data: floors,
      error: null,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "error",
      data: null,
      error: error.message,
    });
  }
};

// Get a single floor by ID
exports.getFloorById = async (req, res) => {
  try {
    const floor = await Floor.findById(req.params.id).populate("building_id");
    if (!floor)
      return res.json({
        status: false,
        message: "Floor not found",
        data: null,
        error: null,
      });
    res.json({
      status: true,
      message: "Floor fetched successfully",
      data: floor,
      error: null,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "error",
      data: null,
      error: error.message,
    });
  }
};

// Update a floor by ID
exports.updateFloor = async (req, res) => {
  try {
    const { building_id, floor_number, unit_count, is_active, description } =
      req.body;
    const floor = await Floor.findByIdAndUpdate(
      req.params.id,
      { building_id, floor_number, unit_count, is_active, description },
      { new: true, runValidators: true }
    );
    if (!floor)
      return res.json({
        status: false,
        message: "Floor not found",
        data: null,
        error: null,
      });
    res.json({
      status: true,
      message: "Floor updated successfully",
      data: floor,
      error: null,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "error",
      data: null,
      error: error.message,
    });
  }
};

// Delete a floor by ID
exports.deleteFloor = async (req, res) => {
  try {
    const floor = await Floor.findByIdAndDelete(req.params.id);
    if (!floor)
      return res.json({
        status: false,
        message: "Floor not found",
        data: null,
        error: null,
      });
    res.json({
      status: true,
      message: "Floor deleted successfully",
      data: null,
      error: null,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "error",
      data: null,
      error: error.message,
    });
  }
};
