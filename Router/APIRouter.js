"user strict";
const express = require("express");
var router = express.Router();

const UserRouter = require("./UserRouter.js");
var FirebaseAdminRouter = require("./FirebaseAdminRouter.js");

var AmenitiesRouter = require("./MasterRouter/AmenitiesRoutes.js");
var FacilitiesRouter = require("./MasterRouter/FacilitiesRoutes.js");
var PaymentStatusRouter = require("./MasterRouter/PaymentStatusRoutes.js");
var PropertyStatusRouter = require("./MasterRouter/PropertyStatusRoutes.js");
var PropertyTypeRouter = require("./MasterRouter/PropertyTypeRoutes.js");
var ServiceTypeRouter = require("./MasterRouter/ServiceTypeRoutes.js");
var UserRoleRouter = require("./MasterRouter/UserRoleRoutes.js");
var BuildingRouter = require("./BuildingRoutes");
var FloorRouter = require("./FloorRoutes");
var FollowUpRouter = require("./FollowUpRouter");
var InquiryRouter = require("./InquiryRouter.js");
var MaintenanceRouter = require("./MaintenanceRouter.js");
var PaymentRouter = require("./PaymentRouter.js");
var PropertyInquiryRouter = require("./PropertyInquiryRouter.js");
var PropertyRouter = require("./PropertyRouter.js");
var SalesRouter = require("./SalesRouter.js");
var SiteRouter = require("./SiteRouter.js");
var UserRoleManagementRouter = require("./UserRoleManagementRouter.js");
var VendorRouter = require("./VendorRouter.js");

async function middleware(req, res, next) {
  return next();
  try {
    var url_parts = url.parse(req.url);
    //Log: Save Log Of Every Request
    var message = url_parts.path;

    var from_ = req.header.from ?? "unknown";
    message += ` ${from_} `;

    var ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
    message += ` ${ip} `;

    console.log(message);
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).send({
      status: false,
      message: "Please, Send Valid Token.",
    });
  }
}
function checkEndPoints(pathname) {
  if (pathname === "/User/userLogin") {
    return true;
  } else {
    return true;
  }
}

router.use("", middleware, async (req, res, next) => {
  // var url_parts = url.parse(req.url);

  // console.log(url_parts.pathname);

  // if (checkEndPoints(url_parts.pathname)) {
  //   return next();
  // }
  return next();
});

router.use("/user", UserRouter);
router.use("/firebase", FirebaseAdminRouter);
router.use("/master/amenities", AmenitiesRouter);
router.use("/master/facilities", FacilitiesRouter);
router.use("/master/paymentStatus", PaymentStatusRouter);
router.use("/master/propertyStatus", PropertyStatusRouter);
router.use("/master/propertyType", PropertyTypeRouter);
router.use("/master/serviceType", ServiceTypeRouter);
router.use("/master/userRole", UserRoleRouter);

router.use("/building", BuildingRouter);
router.use("/floor", FloorRouter);

router.use("/follow_up", FollowUpRouter);
router.use("/inquiry", InquiryRouter);
router.use("/maintenance", MaintenanceRouter);
router.use("/payment", PaymentRouter);
router.use("/property_inquiry", PropertyInquiryRouter);
router.use("/property", PropertyRouter);
router.use("/sales", SalesRouter);
router.use("/site", SiteRouter);
router.use("/user_role_management", UserRoleManagementRouter);
router.use("vendor", VendorRouter);

module.exports = router;
