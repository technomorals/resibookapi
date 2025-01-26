const express = require("express");
var router = express.Router();
const UserController = require("..//Controller/UserController.js");

router.post("/get", UserController.get);
router.post("/set", UserController.set);
router.post("/update", UserController.update);
router.post("/send_otp", UserController.sendOTP);
router.post("/verify_otp", UserController.verifyOTP);
router.post("/upload_user_profile", UserController.uploadUserProfile);

// :::::::::::::::: Collections  ::::::::::::::::

router.post("/get_colletion", UserController.set);
router.post("/set_collection", UserController.set);

// :::::::::::::::: Profile Type  ::::::::::::::::

// :::::::::::::::: Profile Profession Type  ::::::::::::::::

// :::::::::::::::: Profile Relation Type  ::::::::::::::::

// :::::::::::::::: Profile Tag  ::::::::::::::::

module.exports = router;
