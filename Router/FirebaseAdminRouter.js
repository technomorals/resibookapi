var express = require("express");
var router = express.Router();
const FirebaseAdminController = require("..//Controller/FirebaseAdminController.js");
router.post("/send_notificaiton", FirebaseAdminController.sendNotificaiton);
router.post("/subscribe_to_topic", FirebaseAdminController.subscribeToTopic);
router.post("/send_to_topic", FirebaseAdminController.sendToTopic);
router.post("/listUsers", FirebaseAdminController.listUsers);
router.post("/updateUser", FirebaseAdminController.updateUser);
router.post("/deleteUser", FirebaseAdminController.deleteUser);
router.post("/getUserByEmail", FirebaseAdminController.getUserByEmail);
router.post("/getUserByPhoneNumber", FirebaseAdminController.getUserByPhoneNumber);
router.post("/createUser", FirebaseAdminController.createUser);

module.exports = router;
