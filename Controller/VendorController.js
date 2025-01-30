const Vendor = require('../Model/VendorModel'); // Path to the Vendor model
const User = require('../Model/UserModel'); // Path to the Users model
const ServiceTypeMaster = require('../Model/MasterModels/ServiceTypeMaster'); // Path to ServiceTypeMaster model

// Create a new vendor
exports.createVendor = async (req, res) => {
  try {
    const {
      name,
      contact_person,
      contact_number,
      email,
      service_types,
      company_name,
      address,
      city,
      state,
      country,
      pincode,
      payment_terms,
      status,
      contract_start_date,
      contract_end_date,
      created_by,
    } = req.body;

    // Check if the user exists
    const user = await User.findById(created_by);
    if (!user) {
      return res.json({
        status: false,
        message: 'User not found',
        data: null,
        error: null,
      });
    }

    // Check if all service types exist
    const serviceTypes = await ServiceTypeMaster.find({
      '_id': { $in: service_types },
    });
    if (serviceTypes.length !== service_types.length) {
      return res.json({
        status: false,
        message: 'One or more service types not found',
        data: null,
        error: null,
      });
    }

    // Create a new vendor
    const newVendor = new Vendor({
      name,
      contact_person,
      contact_number,
      email,
      service_types,
      company_name,
      address,
      city,
      state,
      country,
      pincode,
      payment_terms,
      status,
      contract_start_date,
      contract_end_date,
      created_by,
    });

    const savedVendor = await newVendor.save();

    return res.json({
      status: true,
      message: 'Vendor created successfully',
      data: savedVendor,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error creating vendor',
      data: null,
      error: error.message,
    });
  }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find()
      .populate('service_types') // Populate the service types
      .populate('created_by'); // Populate the created_by field

    if (!vendors.length) {
      return res.json({
        status: false,
        message: 'No vendors found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Vendors retrieved successfully',
      data: vendors,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving vendors',
      data: null,
      error: error.message,
    });
  }
};

// Get vendor by ID
exports.getVendorById = async (req, res) => {
  const { id } = req.params;

  try {
    const vendor = await Vendor.findById(id)
      .populate('service_types')
      .populate('created_by');

    if (!vendor) {
      return res.json({
        status: false,
        message: 'Vendor not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Vendor retrieved successfully',
      data: vendor,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving vendor',
      data: null,
      error: error.message,
    });
  }
};

// Update vendor by ID
exports.updateVendor = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    contact_person,
    contact_number,
    email,
    service_types,
    company_name,
    address,
    city,
    state,
    country,
    pincode,
    payment_terms,
    status,
    contract_start_date,
    contract_end_date,
  } = req.body;

  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      {
        name,
        contact_person,
        contact_number,
        email,
        service_types,
        company_name,
        address,
        city,
        state,
        country,
        pincode,
        payment_terms,
        status,
        contract_start_date,
        contract_end_date,
      },
      { new: true } // Return the updated document
    );

    if (!updatedVendor) {
      return res.json({
        status: false,
        message: 'Vendor not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Vendor updated successfully',
      data: updatedVendor,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error updating vendor',
      data: null,
      error: error.message,
    });
  }
};

// Delete vendor by ID
exports.deleteVendor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVendor = await Vendor.findByIdAndDelete(id);

    if (!deletedVendor) {
      return res.json({
        status: false,
        message: 'Vendor not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Vendor deleted successfully',
      data: deletedVendor,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error deleting vendor',
      data: null,
      error: error.message,
    });
  }
};
