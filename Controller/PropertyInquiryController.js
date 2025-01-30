const PropertyInquiry = require("../Model/PropertyInquiryModel.js"); // Path to your PropertyInquiry model
const FollowUp = require("../Model/FollowUpModel.js"); // Path to your FollowUp model

// Create a new property inquiry
exports.createPropertyInquiry = async (req, res) => {
  try {
    const {
      client_name,
      client_email,
      client_phone,
      client_message,
      property_id,
      status,
    } = req.body;

    const newInquiry = new PropertyInquiry({
      client_name,
      client_email,
      client_phone,
      client_message,
      property_id,
      status,
    });

    // Save the property inquiry
    const savedInquiry = await newInquiry.save();

    return res.json({
      status: true,
      message: "Property Inquiry created successfully",
      data: savedInquiry,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Error creating Property Inquiry",
      data: null,
      error: error.message,
    });
  }
};

// Get all property inquiries
exports.getAllPropertyInquiries = async (req, res) => {
  try {
    const inquiries = await PropertyInquiry.find()
      .populate("property_id follow_up_details") // Populate related fields (property, follow-ups)
      .exec();

    if (!inquiries.length) {
      return res.json({
        status: false,
        message: "No property inquiries found",
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: "Property Inquiries retrieved successfully",
      data: inquiries,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Error retrieving Property Inquiries",
      data: null,
      error: error.message,
    });
  }
};

// Get a specific property inquiry by ID
exports.getPropertyInquiryById = async (req, res) => {
  const { id } = req.params;

  try {
    const inquiry = await PropertyInquiry.findById(id).populate(
      "property_id follow_up_details"
    ); // Populate related fields (property, follow-ups)

    if (!inquiry) {
      return res.json({
        status: false,
        message: "Property Inquiry not found",
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: "Property Inquiry retrieved successfully",
      data: inquiry,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Error retrieving Property Inquiry",
      data: null,
      error: error.message,
    });
  }
};

// Update a property inquiry by ID
exports.updatePropertyInquiry = async (req, res) => {
  const { id } = req.params;
  const { client_name, client_email, client_phone, client_message, status } =
    req.body;

  try {
    const updatedInquiry = await PropertyInquiry.findByIdAndUpdate(
      id,
      { client_name, client_email, client_phone, client_message, status },
      { new: true } // Return the updated document
    );

    if (!updatedInquiry) {
      return res.json({
        status: false,
        message: "Property Inquiry not found",
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: "Property Inquiry updated successfully",
      data: updatedInquiry,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Error updating Property Inquiry",
      data: null,
      error: error.message,
    });
  }
};

// Delete a property inquiry by ID
exports.deletePropertyInquiry = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInquiry = await PropertyInquiry.findByIdAndDelete(id);

    if (!deletedInquiry) {
      return res.json({
        status: false,
        message: "Property Inquiry not found",
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: "Property Inquiry deleted successfully",
      data: deletedInquiry,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Error deleting Property Inquiry",
      data: null,
      error: error.message,
    });
  }
};
