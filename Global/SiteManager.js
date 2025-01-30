const SiteModel = require("./..//Model/SiteModel");
const UserModel = require("./..//Model/UserModel");
const UserRoleManagementModel = require("./..//Model/UserRoleManagementModel");
const PropertyModel = require("./..//Model/PropertyModel");
var mongoose = require("mongoose");
class SiteManager {
  constructor() {}

  getSites(siteIds) {
    return new Promise(async (resolve, reject) => {
      try {
        var query = { _id: { $in: siteIds } };
        let result = await SiteModel.find(query);
        return resolve(result);
      } catch (error) {
        return resolve([]);
      }
    });
  }

  getSiteListByUserID(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await UserModel.findById(user_id);

        if (userData["is_delete"] == true) {
          return resolve({
            status: false,
            message: "This User has been deleted.",
          });
        }

        if (userData["is_active"] == false) {
          return resolve({
            status: false,
            message: "This User Status is Not Active.",
          });
        }

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
        }

        if (
          userRoleModel &&
          userRoleModel["user_role"] &&
          userRoleModel["user_role"].length > 0
        ) {
          userRoleModel["user_role"] = userRoleModel["user_role"].sort(
            (role1, role2) => {
              return (
                role1[0]["role_details"]["priority"] -
                role2[0]["role_details"]["priority"]
              );
            }
          );
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

module.exports = new SiteManager();
