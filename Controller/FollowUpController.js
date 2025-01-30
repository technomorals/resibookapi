const FollowUp = require('../Model/FollowUpModel.js'); // Path to your FollowUp model

// Create a new follow-up
exports.createFollowUp = async (req, res) => {
  try {
    const { inquiry_id, follow_up_notes, follow_up_status, next_follow_up_date } = req.body;

    // Create a new follow-up document
    const newFollowUp = new FollowUp({
      inquiry_id,
      follow_up_notes,
      follow_up_status,
      next_follow_up_date,
    });

    // Save the follow-up to the database
    await newFollowUp.save();

    return res.json({
      status: true,
      message: 'Follow-up created successfully',
      data: newFollowUp,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error creating follow-up',
      data: null,
      error: error.message,
    });
  }
};

// Get all follow-ups
exports.getAllFollowUps = async (req, res) => {
  try {
    const followUps = await FollowUp.find().populate('inquiry_id');

    if (!followUps.length) {
      return res.json({
        status: false,
        message: 'No follow-ups found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Follow-ups retrieved successfully',
      data: followUps,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving follow-ups',
      data: null,
      error: error.message,
    });
  }
};

// Get a specific follow-up by ID
exports.getFollowUpById = async (req, res) => {
  const { id } = req.params;

  try {
    const followUp = await FollowUp.findById(id).populate('inquiry_id');

    if (!followUp) {
      return res.json({
        status: false,
        message: 'Follow-up not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Follow-up retrieved successfully',
      data: followUp,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving follow-up',
      data: null,
      error: error.message,
    });
  }
};

// Update a follow-up
exports.updateFollowUp = async (req, res) => {
  const { id } = req.params;
  const { follow_up_notes, follow_up_status, next_follow_up_date } = req.body;

  try {
    const updatedFollowUp = await FollowUp.findByIdAndUpdate(
      id,
      { follow_up_notes, follow_up_status, next_follow_up_date },
      { new: true }
    );

    if (!updatedFollowUp) {
      return res.json({
        status: false,
        message: 'Follow-up not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Follow-up updated successfully',
      data: updatedFollowUp,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error updating follow-up',
      data: null,
      error: error.message,
    });
  }
};

// Delete a follow-up
exports.deleteFollowUp = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFollowUp = await FollowUp.findByIdAndDelete(id);

    if (!deletedFollowUp) {
      return res.json({
        status: false,
        message: 'Follow-up not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Follow-up deleted successfully',
      data: deletedFollowUp,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error deleting follow-up',
      data: null,
      error: error.message,
    });
  }
};
