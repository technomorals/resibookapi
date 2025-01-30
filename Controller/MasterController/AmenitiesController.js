const AmenitiesMaster = require("..//..//Model/MasterModels/AmenitiesMaster.js");

// Create a new amenity
exports.createAmenity = [
  async (req, res) => {
    try {
      var data = {};
      var name = req.body.name;
      var description = req.body.description;
      var icon = req.body.icon;
      var is_active = req.body.is_active;
      var emoji = req.body.emoji;
      if (!name) {
        return res.json({
          status: false,
          message: "Name is required",
          data: null,
          error: null,
        });
      }

      data["name"] = name;
      data["description"] = description;
      data["icon"] = icon;
      data["is_active"] = is_active;
      data["emoji"] = emoji;
      
      let amenity = new AmenitiesMaster(data);
      await amenity.save();
      return res.json({
        status: true,
        message: "Amenity created successfully",
        data: amenity,
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

// Get all amenities
exports.getAllAmenities = async (req, res) => {
  try {
    const amenities = await AmenitiesMaster.find();
    res.json({
      status: true,
      message: "Amenities fetched successfully",
      data: amenities,
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

// Get a single amenity by ID
exports.getAmenityById = async (req, res) => {
  try {
    const amenity = await AmenitiesMaster.findById(req.params.id);
    if (!amenity)
      return res.json({
        status: false,
        message: "Amenity not found",
        data: null,
        error: null,
      });
    res.json({
      status: true,
      message: "Amenity fetched successfully",
      data: amenity,
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

// Update an amenity by ID
exports.updateAmenity = async (req, res) => {
  try {
    const { name, description, icon, is_active } = req.body;
    const amenity = await AmenitiesMaster.findByIdAndUpdate(
      req.params.id,
      { name, description, icon, is_active },
      { new: true, runValidators: true }
    );
    if (!amenity)
      return res.json({
        status: false,
        message: "Amenity not found",
        data: null,
        error: null,
      });
    res.json({
      status: true,
      message: "Amenity updated successfully",
      data: amenity,
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

// Delete an amenity by ID
exports.deleteAmenity = async (req, res) => {
  try {
    const amenity = await AmenitiesMaster.findByIdAndDelete(req.params.id);
    if (!amenity)
      return res.json({
        status: false,
        message: "Amenity not found",
        data: null,
        error: null,
      });
    res.json({
      status: true,
      message: "Amenity deleted successfully",
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
