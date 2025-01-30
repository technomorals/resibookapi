const Property = require('../Model/PropertyModel'); // Path to your Property model
const Floor = require('../Model/FloorModel'); // Path to your Floor model
const PropertyTypeMaster = require('../Model/MasterModels/PropertyTypeMaster'); // Path to PropertyTypeMaster model
const PropertyStatusMaster = require('../Model/MasterModels/PropertyStatusMaster'); // Path to PropertyStatusMaster model
const FacilitiesMaster = require('../Model/MasterModels/FacilitiesMaster'); // Path to FacilitiesMaster model

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const { floor_id, property_name, property_type, size, price, description, facilities, property_status, is_available } = req.body;

    // Check if the Floor exists
    const floor = await Floor.findById(floor_id);
    if (!floor) {
      return res.json({
        status: false,
        message: 'Floor not found',
        data: null,
        error: null,
      });
    }

    // Check if PropertyTypeMaster exists
    const propertyType = await PropertyTypeMaster.findById(property_type);
    if (!propertyType) {
      return res.json({
        status: false,
        message: 'Property type not found',
        data: null,
        error: null,
      });
    }

    // Check if PropertyStatusMaster exists
    const propertyStatus = await PropertyStatusMaster.findById(property_status);
    if (!propertyStatus) {
      return res.json({
        status: false,
        message: 'Property status not found',
        data: null,
        error: null,
      });
    }

    // Check if FacilitiesMaster exists (if facilities are provided)
    if (facilities && facilities.length > 0) {
      const facilitiesExist = await FacilitiesMaster.find({ '_id': { $in: facilities } });
      if (facilitiesExist.length !== facilities.length) {
        return res.json({
          status: false,
          message: 'Some facilities not found',
          data: null,
          error: null,
        });
      }
    }

    // Create a new Property
    const newProperty = new Property({
      floor_id,
      property_name,
      property_type,
      size,
      price,
      description,
      facilities,
      property_status,
      is_available,
    });

    // Save the property
    const savedProperty = await newProperty.save();

    return res.json({
      status: true,
      message: 'Property created successfully',
      data: savedProperty,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error creating Property',
      data: null,
      error: error.message,
    });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('floor_id property_type property_status facilities') // Populate related fields (floor, type, status, facilities)
      .exec();

    if (!properties.length) {
      return res.json({
        status: false,
        message: 'No properties found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Properties retrieved successfully',
      data: properties,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving properties',
      data: null,
      error: error.message,
    });
  }
};

// Get a specific property by ID
exports.getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id)
      .populate('floor_id property_type property_status facilities'); // Populate related fields

    if (!property) {
      return res.json({
        status: false,
        message: 'Property not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Property retrieved successfully',
      data: property,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving Property',
      data: null,
      error: error.message,
    });
  }
};

// Update a property by ID
exports.updateProperty = async (req, res) => {
  const { id } = req.params;
  const { property_name, property_type, size, price, description, facilities, property_status, is_available } = req.body;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { property_name, property_type, size, price, description, facilities, property_status, is_available },
      { new: true } // Return the updated document
    );

    if (!updatedProperty) {
      return res.json({
        status: false,
        message: 'Property not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Property updated successfully',
      data: updatedProperty,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error updating Property',
      data: null,
      error: error.message,
    });
  }
};

// Delete a property by ID
exports.deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.json({
        status: false,
        message: 'Property not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Property deleted successfully',
      data: deletedProperty,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error deleting Property',
      data: null,
      error: error.message,
    });
  }
};
