const UserRoleMaster = require("..//..//Model/MasterModels/UserRoleMasterModel");

// Create a new user role
exports.createUserRole = [
  async (req, res) => {
    try {
      var data = {};
      var name = req.body.name;
      var priority = req.body.priority;

      if (!name) {
        return res.json({ status: false, message: "Name is required", data: null, error: null });
      }
      if (priority === undefined) {
        return res.json({ status: false, message: "Priority is required", data: null, error: null });
      }

      data["name"] = name;
      data["priority"] = priority;

      let userRole = new UserRoleMaster(data);
      await userRole.save();
      return res.json({ status: true, message: "User role created successfully", data: userRole, error: null });
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

// Get all user roles
exports.getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRoleMaster.find();
    res.json({ status: true, message: "User roles fetched successfully", data: userRoles, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Get a single user role by ID
exports.getUserRoleById = async (req, res) => {
  try {
    const userRole = await UserRoleMaster.findById(req.params.id);
    if (!userRole) return res.json({ status: false, message: "User role not found", data: null, error: null });
    res.json({ status: true, message: "User role fetched successfully", data: userRole, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Update a user role by ID
exports.updateUserRole = async (req, res) => {
  try {
    const { name, priority } = req.body;
    const userRole = await UserRoleMaster.findByIdAndUpdate(req.params.id, { name, priority }, { new: true, runValidators: true });
    if (!userRole) return res.json({ status: false, message: "User role not found", data: null, error: null });
    res.json({ status: true, message: "User role updated successfully", data: userRole, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};

// Delete a user role by ID
exports.deleteUserRole = async (req, res) => {
  try {
    const userRole = await UserRoleMaster.findByIdAndDelete(req.params.id);
    if (!userRole) return res.json({ status: false, message: "User role not found", data: null, error: null });
    res.json({ status: true, message: "User role deleted successfully", data: null, error: null });
  } catch (error) {
    res.json({ status: false, message: "error", data: null, error: error.message });
  }
};
