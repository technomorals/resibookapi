const express = require("express");
const router = express.Router();
const userRoleController = require("../../Controller/MasterController/UserRoleController");

// Create a new user role
router.post("/", userRoleController.createUserRole);

// Get all user roles
router.get("/", userRoleController.getAllUserRoles);

// Get a single user role by ID
router.get("/:id", userRoleController.getUserRoleById);

// Update a user role by ID
router.put("/:id", userRoleController.updateUserRole);

// Delete a user role by ID
router.delete("/:id", userRoleController.deleteUserRole);

module.exports = router;
