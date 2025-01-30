const UserRoleManagement = require('../Model/UserRoleManagementModel'); // Path to the UserRoleManagement model
const User = require('../Model/UserModel'); // Path to the Users model
const UserRoleMaster = require('../Model/MasterModels/UserRoleMasterModel'); // Path to the UserRoleMaster model

// Create a new user role management entry
exports.createUserRole = async (req, res) => {
  try {
    const { user_id, user_role_id, status } = req.body;

    // Check if the user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.json({
        status: false,
        message: 'User not found',
        data: null,
        error: null,
      });
    }

    // Check if the user role exists
    const userRole = await UserRoleMaster.findById(user_role_id);
    if (!userRole) {
      return res.json({
        status: false,
        message: 'User role not found',
        data: null,
        error: null,
      });
    }

    // Create a new UserRoleManagement entry
    const newUserRoleManagement = new UserRoleManagement({
      user_id,
      user_role_id,
      status,
    });

    const savedUserRole = await newUserRoleManagement.save();

    return res.json({
      status: true,
      message: 'User role created successfully',
      data: savedUserRole,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error creating user role management entry',
      data: null,
      error: error.message,
    });
  }
};

// Get all user role management entries
exports.getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRoleManagement.find()
      .populate('user_id user_role_id') // Populate references
      .exec();

    if (!userRoles.length) {
      return res.json({
        status: false,
        message: 'No user roles found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'User roles retrieved successfully',
      data: userRoles,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving user roles',
      data: null,
      error: error.message,
    });
  }
};

// Get user role by ID
exports.getUserRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const userRole = await UserRoleManagement.findById(id)
      .populate('user_id user_role_id') // Populate references

    if (!userRole) {
      return res.json({
        status: false,
        message: 'User role management entry not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'User role management entry retrieved successfully',
      data: userRole,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving user role management entry',
      data: null,
      error: error.message,
    });
  }
};

// Update user role by ID
exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { user_id, user_role_id, status } = req.body;

  try {
    const updatedUserRole = await UserRoleManagement.findByIdAndUpdate(
      id,
      { user_id, user_role_id, status },
      { new: true } // Return the updated document
    );

    if (!updatedUserRole) {
      return res.json({
        status: false,
        message: 'User role management entry not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'User role management entry updated successfully',
      data: updatedUserRole,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error updating user role management entry',
      data: null,
      error: error.message,
    });
  }
};

// Delete user role management entry by ID
exports.deleteUserRole = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUserRole = await UserRoleManagement.findByIdAndDelete(id);

    if (!deletedUserRole) {
      return res.json({
        status: false,
        message: 'User role management entry not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'User role management entry deleted successfully',
      data: deletedUserRole,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error deleting user role management entry',
      data: null,
      error: error.message,
    });
  }
};
