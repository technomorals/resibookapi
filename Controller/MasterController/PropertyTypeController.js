const PropertyTypeMaster = require("..//..//Model/MasterModels/PropertyTypeMaster");

// Create a new property type
exports.createPropertyType = [
  async (req, res) => {
    try {
      var data = {};
      var name = req.body.name;
      var description = req.body.description;
      var is_active = req.body.is_active;

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
      data["is_active"] = is_active;

      let propertyType = new PropertyTypeMaster(data);
      await propertyType.save();
      return res.json({
        status: true,
        message: "Property type created successfully",
        data: propertyType,
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

// Get all property types
exports.getAllPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await PropertyTypeMaster.find();
    res.json({
      status: true,
      message: "Property types fetched successfully",
      data: propertyTypes,
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

// Get a single property type by ID
exports.getPropertyTypeById = async (req, res) => {
  try {
    const propertyType = await PropertyTypeMaster.findById(req.params.id);
    if (!propertyType)
      return res.json({
        status: false,
        message: "Property type not found",
        data: null,
        error: null,
      });
    res.json({
      status: true,
      message: "Property type fetched successfully",
      data: propertyType,
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

// Update a property type by ID
exports.updatePropertyType = async (req, res) => {
  try {
    const { name, description, is_active } = req.body;
    const propertyType = await PropertyTypeMaster.findByIdAndUpdate(
      req.params.id,
      { name, description, is_active },
      { new: true, runValidators: true }
    );
    if (!propertyType)
      return res.json({
        status: false,
        message: "Property type not found",
        data: null,
        error: null,
      });
    res.json({
      status: true,
      message: "Property type updated successfully",
      data: propertyType,
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

// Delete a property type by ID
exports.deletePropertyType = async (req, res) => {
  try {
    const propertyType = await PropertyTypeMaster.findByIdAndDelete(
      req.params.id
    );
    if (!propertyType)
      return res.json({
        status: false,
        message: "Property type not found",
        data: null,
        error: null,
      });
    res.json({
      status: true,
      message: "Property type deleted successfully",
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
