const Inquiry = require('../Model/InquiryModel.js'); // Path to your Inquiry model

// Create a new inquiry
exports.createInquiry = async (req, res) => {
  try {
    const { user_id, inquiry_type, inquiry_details, related_site_id, related_building_id, related_property_id, vendor_id, response_due_date } = req.body;

    const newInquiry = new Inquiry({
      user_id,
      inquiry_type,
      inquiry_details,
      related_site_id,
      related_building_id,
      related_property_id,
      vendor_id,
      response_due_date,
    });

    // Save the inquiry to the database
    await newInquiry.save();

    return res.json({
      status: true,
      message: 'Inquiry created successfully',
      data: newInquiry,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error creating inquiry',
      data: null,
      error: error.message,
    });
  }
};

// Get all inquiries
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate('user_id related_site_id related_building_id related_property_id vendor_id');

    if (!inquiries.length) {
      return res.json({
        status: false,
        message: 'No inquiries found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Inquiries retrieved successfully',
      data: inquiries,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving inquiries',
      data: null,
      error: error.message,
    });
  }
};

// Get a specific inquiry by ID
exports.getInquiryById = async (req, res) => {
  const { id } = req.params;

  try {
    const inquiry = await Inquiry.findById(id).populate('user_id related_site_id related_building_id related_property_id vendor_id');

    if (!inquiry) {
      return res.json({
        status: false,
        message: 'Inquiry not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Inquiry retrieved successfully',
      data: inquiry,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving inquiry',
      data: null,
      error: error.message,
    });
  }
};

// Update an inquiry
exports.updateInquiry = async (req, res) => {
  const { id } = req.params;
  const { inquiry_details, inquiry_type, status, assigned_to, response_due_date, response } = req.body;

  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      { inquiry_details, inquiry_type, status, assigned_to, response_due_date, response },
      { new: true }
    );

    if (!updatedInquiry) {
      return res.json({
        status: false,
        message: 'Inquiry not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Inquiry updated successfully',
      data: updatedInquiry,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error updating inquiry',
      data: null,
      error: error.message,
    });
  }
};

// Delete an inquiry
exports.deleteInquiry = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(id);

    if (!deletedInquiry) {
      return res.json({
        status: false,
        message: 'Inquiry not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Inquiry deleted successfully',
      data: deletedInquiry,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error deleting inquiry',
      data: null,
      error: error.message,
    });
  }
};
