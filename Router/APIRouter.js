"user strict";
const express = require("express");
var router = express.Router();

const UserRouter = require("./UserRouter.js");
var FirebaseAdminRouter = require("./FirebaseAdminRouter.js");


router.use("/", (req, res, next) => {
  console.log(req.body ?? "");
  next();
});

router.use("/user", UserRouter);
router.use("/firebase", FirebaseAdminRouter);


module.exports = router;
