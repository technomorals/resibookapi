const SiteModel = require("..//..//Model/SiteModel");
const UserModel = require("..//..//Model/UserModel");
const UserRoleManagementModel = require("..//..//Model/UserRoleManagementModel");
const PropertyModel = require("..//..//Model/PropertyModel");
var mongoose = require("mongoose");

class UserManager {
  constructor() {}

  getUserDetails(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await UserModel.findById(user_id);

        if (userData["is_delete"] == true) {
          return resolve({
            status: false,
            message: "This User has been deleted.",
            data: userData,
          });
        } else if (userData["is_active"] == false) {
          return resolve({
            status: false,
            message: "This User Status is Not Active.",
            data: userData,
          });
        } else {
          return resolve({
            status: true,
            message: "Success",
            data: userData,
          });
        }
      } catch (error) {
        return resolve({
          status: false,
          message: error.message,
        });
      }
    });
  }

  getUserDetailsWithRoleWise(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var userRoleModel = await UserRoleManagementModel.findOne({
          user_id: user_id,
        }).populate({
          path: "user_role.role_details", // Populating user_role_id with UserRoleMaster
          select: "name priority code", // Selecting specific fields from UserRoleMaster
        });

        if (!userRoleModel) {
          return resolve({
            status: false,
            message: "Role Is Not Assign",
          });
        } else {
          return resolve({
            status: true,
            message: "Success",
            data: userRoleModel,
          });
        }
      } catch (error) {
        return resolve({
          status: false,
          message: error.message,
        });
      }
    });
  }

  getSiteListByUserID(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await this.getUserDetails(user_id);
        if (userData["status"] == false) {
          return resolve(userData);
        }

        let userDetailsWithRoleWise = await this.getUserDetailsWithRoleWise(
          user_id
        );
        if (userDetailsWithRoleWise["status"] == false) {
          return resolve(userDetailsWithRoleWise);
        }

        var match = {
          $match: { user_id: new mongoose.Types.ObjectId(user_id) },
        };

        PropertyModel.aggregate([match, { $group: { _id: "$site_id" } }])
          .then(async (results) => {
            let _result = await this.getSites(results);
            return resolve({
              status: true,
              message: "success",
              data: _result,
            });
          })
          .catch((err) => {
            return resolve({
              status: false,
              message: err.message,
            });
          });
      } catch (error) {
        return resolve({
          status: false,
          message: error.message,
        });
      }
    });
  }
}
module.exports = new UserManager();
