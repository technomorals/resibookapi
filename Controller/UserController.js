var aws_ = require("..//AWS/s3.js");

var MessageList = require("../Constants/MessageList.js");
const FirebaseAdmin = require("../Global/FirebaseAdmin/FirebaseAdmin.js");
const UserManager = require("../Global/UserManager/UserManager.js");

//MODEL:
var UserModel = require("..//Model/UserModel.js");
var OTPVerificationModel = require("..//Model/otpVerificationModel.js");

const moment = require("moment");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const multer = require("multer");
var filename = "Files/";
const DIR = `./public/uploads/${filename}`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var extention = path.extname(file.originalname);
    if (file.fieldname == "file_name") {
      cb(null, DIR);
    }
  },
  filename: function (req, file, cb) {
    var extention = file.originalname;
    cb(null, extention);
  },
});

const formatFilter = function (req, file, cb) {
  console.log(req.body);
  var ext = path.extname(file.originalname);
  cb(null, true);
};

exports.get = [
  async (req, res) => {
    try {
      var limit = req.body.limit ?? 10;
      var skip = req.body.skip ?? 0;
      var is_pagination = req.body.is_pagination ?? true;
      var is_active = req.body.is_active;
      var is_delete = req.body.is_delete;
      var name = req.body.name;
      var mobile_no = req.body.mobile_no;
      var email_id = req.body.email_id;
      var username = req.body.username;
      var password = req.body.password;
      var profile = req.body.profile;
      var birth_date = req.body.birth_date;
      var gender = req.body.gender;
      var location = req.body.location;
      var pincode = req.body.pincode;
      var country = req.body.country;
      var state = req.body.state;
      var city = req.body.city;
      var register_type = req.body.register_type;
      var register_type_uid = req.body.register_type_uid;

      var params = {};
      if (register_type_uid) {
        params["register_type_uid"] = register_type_uid;
      }

      if (params) {
        delete params["limit"];
        delete params["skip"];
        delete params["is_pagination"];
      }

      if (is_pagination) {
        let data = await UserModel.find(params).limit(limit).skip(skip);
        return res.json({
          status: true,
          message: "Success.",
          data: data,
          error: null,
        });
      } else {
        let data = await UserModel.find(params);
        return res.json({
          status: true,
          message: "Success.",
          data: data,
          error: null,
        });
      }
    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
        data: null,
        error: error,
      });
    }
  },
];

exports.set = [
  async (req, res) => {
    try {
      var is_active = req.body.is_active ?? null;
      var is_delete = req.body.is_delete ?? null;
      var name = req.body.name ?? null;
      var mobile_no = req.body.mobile_no ?? null;
      var email_id = req.body.email_id ?? null;
      var username = req.body.username ?? null;
      var password = req.body.password ?? null;
      var profile = req.body.profile ?? null;
      var birth_date = req.body.birth_date ?? null;
      var gender = req.body.gender ?? null;
      var location = req.body.location ?? null;
      var pincode = req.body.pincode ?? null;
      var country = req.body.country ?? null;
      var state = req.body.state ?? null;
      var city = req.body.city ?? null;
      var register_type = req.body.register_type ?? null;
      var register_type_uid = req.body.register_type_uid ?? null;

      if (mobile_no) {
        let _current_data = await FirebaseAdmin.getUserByPhoneNumber(mobile_no);
        if (_current_data) {
          register_type_uid = _current_data["uid"];
        }
      }

      if (email_id) {
      }

      if (register_type_uid) {
        let _new_user_data = await FirebaseAdmin.createUser(req.body);
        register_type_uid = _new_user_data["uid"];
      }
      // if (!register_type_uid) {
      //   return res.json({
      //     status: false,
      //     message: MessageList.param_missing,
      //   });
      // } else {
      var _unique_query = { register_type_uid: register_type_uid };
      var _update_data = {
        is_active: is_active,
        is_delete: is_delete,
        name: name,
        mobile_no: mobile_no,
        email_id: email_id,
        username: username,
        password: password,
        profile: profile,
        birth_date: birth_date,
        gender: gender,
        location: location,
        pincode: pincode,
        country: country,
        state: state,
        city: city,
        register_type: register_type,
        register_type_uid: register_type_uid,
      };

      for (var propName in _update_data) {
        if (
          _update_data[propName] === null ||
          _update_data[propName] === undefined
        ) {
          delete _update_data[propName];
        }
      }

      let _statue = await UserModel.findOneAndUpdate(
        _unique_query,
        _update_data,
        { upsert: true }
      ).exec();

      let _updated_record = await UserModel.findOne(_unique_query);

      return res.json({
        status: true,
        message: MessageList.success,
        data: _updated_record,
        error: null,
      });
      // }
    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
        data: null,
        error: error,
      });
    }
  },
];

exports.update = [
  async (req, res) => {
    try {
      var name = req.body.name ?? null;
      var birth_date = req.body.birth_date ?? null;
      var gender = req.body.gender ?? null;
      var location = req.body.location ?? null;
      var register_type_uid = req.body.register_type_uid ?? null;

      if (!register_type_uid) {
        return res.json({
          status: false,
          message: MessageList.param_missing,
        });
      } else {
        var _unique_query = { register_type_uid: register_type_uid };
        var _update_data = {
          name: name,
          birth_date: birth_date,
          gender: gender,
          location: location,
        };

        for (var propName in _update_data) {
          if (
            _update_data[propName] === null ||
            _update_data[propName] === undefined
          ) {
            delete _update_data[propName];
          }
        }

        let _statue = await UserModel.findOneAndUpdate(
          _unique_query,
          _update_data,
          { upsert: true }
        ).exec();

        let _updated_record = await UserModel.findOne(_unique_query);

        return res.json({
          status: true,
          message: MessageList.success,
          data: _updated_record,
          error: null,
        });
      }
    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
        data: null,
        error: error,
      });
    }
  },
];

exports.sendOTP = [
  async (req, res) => {
    try {
      var mobile_no = req.body.mobile_no;
      var otp = req.body.otp;

      const _model = await OTPVerificationModel({
        mobile_no: mobile_no,
        otp: otp,
        otp_expiry: new Date(Date.now() + 15 * 60 * 1000), // Current time + 15 minutes
      }).save();

      return res.json({
        status: true,
        message: "success",
        data: _model,
        error: null,
      });
    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
        data: null,
        error: error,
      });
    }
  },
];

exports.verifyOTP = [
  async (req, res) => {
    try {
      var mobile_no = req.body.mobile_no;
      var otp = req.body.otp;

      // Find the OTP entry by _id and otp
      const otpEntry = await OTPVerificationModel.findOne({
        mobile_no: mobile_no,
        otp: otp,
      });

      // Check if the OTP exists
      if (!otpEntry) {
        return res.json({
          status: false,
          message: "Invalid OTP or ID.",
          data: [],
          error: null,
        });
      }

      // Check if the OTP has expired
      if (otpEntry.otp_expiry < new Date()) {
        return res.json({
          status: false,
          message: "OTP has expired.",
          data: [],
          error: null,
        });
      }

      // OTP is valid
      return res.json({
        status: true,
        message: "success",
        data: [],
        error: null,
      });
    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
        data: null,
        error: error,
      });
    }
  },
];

exports.uploadUserProfile = [
  async (req, res) => {
    try {
      let upload = multer({
        storage: storage,
        fileFilter: formatFilter,
      }).single("file_name");

      upload(req, res, async (err) => {
        if (err) {
          return res.json({
            status: false,
            message: err.message,
            data: null,
            error: err,
          });
        } else if (req.fileValidationError) {
          return res.json({
            status: false,
            message: req.fileValidationError,
            data: null,
            error: null,
          });
        } else {
          var registerTypeUID = req.body.register_type_uid;
          var file_name = null;
          var file_type = null;

          if (req.file) {
            file_name = `${filename}${req.file.filename}`;
            file_type = req.file.originalname
              ? path.extname(req.file.originalname ?? "")
              : "";
          } else {
            return res.json({
              status: false,
              message: "file not found",
              data: null,
              error: null,
            });
          }

          var file_path = req.file.path;
          var options = await aws_.uploadInstagramUserProfilePicture({
            bucket_name: "applicationsjson",
            file_path: file_path,
            file_name: "Insta Expert/users/" + path.basename(file_path),
          });

          let _uploadData = await InstagramDataService.uploadUserImage(options);
          if (fs.existsSync(file_path)) {
            fs.rmSync(file_path);
          }

          var _data = await UserModel.findOneAndUpdate(
            { register_type_uid: registerTypeUID },
            {
              profile: _uploadData["data"]["Location"],
            }
          ).exec();
          return res.json(_uploadData);
        }
      });
    } catch (err) {
      const _save = await ErrorManager.save(req, err);
      return res.status(500).json(_save);
    }
  },
];

exports.getUserDetails = [
  async (req, res) => {
    try {
      let _data = req.body ?? {};
      let user_id = _data["user_id"];
      if (!user_id) {
        return res.json({
          status: false,
          message: "User not found",
        });
      }

      let result = await UserManager.getUserDetails(user_id);
      return res.json(result);
    } catch (err) {
      const _save = await ErrorManager.save(req, err);
      return res.status(500).json(_save);
    }
  },
];

exports.getUserDetailsWithRoleWise = [
  async (req, res) => {
    try {
      let _data = req.body ?? {};
      let result = await UserManager.getUserDetailsWithRoleWise(_data);
      return res.json(result);
    } catch (err) {
      const _save = await ErrorManager.save(req, err);
      return res.status(500).json(_save);
    }
  },
];

exports.getSiteListByUserID = [
  async (req, res) => {
    try {
      let _data = req.body ?? {};
      let result = await UserManager.getSiteListByUserID(_data);
      return res.json(result);
    } catch (err) {
      const _save = await ErrorManager.save(req, err);
      return res.status(500).json(_save);
    }
  },
];

exports.getBuldingsListByUserID = [
  async (req, res) => {
    try {
      let _data = req.body ?? {};
      let result = await UserManager.getBuldingsListByUserID(_data);
      return res.json(result);
    } catch (err) {
      const _save = await ErrorManager.save(req, err);
      return res.status(500).json(_save);
    }
  },
];

exports.getFloorListByUserID = [
  async (req, res) => {
    try {
      let _data = req.body ?? {};
      let result = await UserManager.getFloorListByUserID(_data);
      return res.json(result);
    } catch (err) {
      const _save = await ErrorManager.save(req, err);
      return res.status(500).json(_save);
    }
  },
];

exports.getPropertyListByUserID = [
  async (req, res) => {
    try {
      let _data = req.body ?? {};
      let result = await UserManager.getPropertyListByUserID(_data);
      return res.json(result);
    } catch (err) {
      const _save = await ErrorManager.save(req, err);
      return res.status(500).json(_save);
    }
  },
];
