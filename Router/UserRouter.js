const express = require("express");
var router = express.Router();
const UserController = require("..//Controller/UserController.js");

router.post("/get", UserController.get);
router.post("/set", UserController.set);
router.post("/update", UserController.update);
router.post("/send_otp", UserController.sendOTP);
router.post("/verify_otp", UserController.verifyOTP);
router.post("/upload_user_profile", UserController.uploadUserProfile);

router.post("/get_user_details", UserController.getUserDetails);
router.post("/get_user_details_with_rolewise", UserController.getUserDetailsWithRoleWise);
router.post("/get_site_list_by_user_id", UserController.getSiteListByUserID);
router.post("/get_buldings_list_by_user_id", UserController.getBuldingsListByUserID);
router.post("/get_floor_list_by_user_id", UserController.getFloorListByUserID);
router.post("/get_property_list_by_user_id", UserController.getPropertyListByUserID);

module.exports = router;
