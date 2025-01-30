const express = require('express');
const router = express.Router();
const userRoleManagementController = require('../Controller/UserRoleManagementController'); // Path to your userRoleManagementController

// Routes for user role management
router.post('/user_roles', userRoleManagementController.createUserRole); // Create a new user role management entry
router.get('/user_roles', userRoleManagementController.getAllUserRoles); // Get all user roles
router.get('/user_roles/:id', userRoleManagementController.getUserRoleById); // Get a specific user role by ID
router.put('/user_roles/:id', userRoleManagementController.updateUserRole); // Update a user role by ID
router.delete('/user_roles/:id', userRoleManagementController.deleteUserRole); // Delete a user role by ID

module.exports = router;
