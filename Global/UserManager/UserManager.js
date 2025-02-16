const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const SiteModel = require("..//..//Model/SiteModel");
const BuildingModel = require("..//..//Model/BuildingModel");
const FloorModel = require("..//..//Model/FloorModel");
const PropertyModel = require("..//..//Model/PropertyModel");
const UserModel = require("..//..//Model/UserModel");
const UserRoleManagementModel = require("..//..//Model/UserRoleManagementModel");
const UserRole = require("..//..//Data/userrole.json");
const async = require("async");

class UserManager {
  constructor() {}

  getRoleObjectByID(_id) {
    return new Promise((resolve, reject) => {
      try {
        var id = _id.map((value) => {
          if (ObjectId.isValid(value) && typeof value === "object") {
            return value.toString();
          } else if (ObjectId.isValid(value) && typeof value === "string") {
            return value;
          } else {
            return value;
          }
        });

        let data = UserRole.filter((role) => {
          return id.includes(role._id);
        }).sort((role1, role2) => {
          return role1["priority"] - role2["priority"];
        });
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }

  getUserDetails(data) {
    return new Promise(async (resolve, reject) => {
      try {
        var user_id = data["user_id"];
        if (!user_id) {
          return resolve({
            status: false,
            message: "User not found",
          });
        }

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

  getUserDetailsWithRoleWise(data) {
    return new Promise(async (resolve, reject) => {
      try {
        var user_id = data["user_id"];

        if (!user_id) {
          return resolve({
            status: false,
            message: "User not found",
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

  getSiteListByUserID(data) {
    return new Promise(async (resolve, reject) => {
      try {
        var user_id = data["user_id"];
        if (!user_id) {
          return resolve({
            status: false,
            message: "User not found",
          });
        }

        var userDetailsWithRoleWise = await this.getUserDetailsWithRoleWise(data);
        if (userDetailsWithRoleWise["status"] == false) {
          return resolve(userDetailsWithRoleWise);
        }
        userDetailsWithRoleWise = userDetailsWithRoleWise["data"];

        const userRoleIds = userDetailsWithRoleWise["user_role"].map(
          (role) => role.user_role_id
        );

        var userRoleModel = await this.getRoleObjectByID(userRoleIds);

        async.forEachOf(
          userRoleModel,
          async (item, index, callback) => {
            //MANAGE ROLE WISE
            switch (item["code"]) {
              //1: SUPER ADMIN
              case 1:
                let _result = await SiteModel.find();
                userRoleModel[index]["site_details"] = _result;
                callback;
                break;
              default:
                userRoleModel[index]["site_details"] = null;
                callback;
                break;
            }
          },
          (err, _) => {
            return resolve({
              status: true,
              message: "success",
              data: userRoleModel,
              err: err,
            });
          }
        );
      } catch (error) {
        return resolve({
          status: false,
          message: error.message,
        });
      }
    });
  }

  getBuldingsListByUserID(data) {
    return new Promise(async (resolve, reject) => {
      try {
        var user_id = data["user_id"];
        var site_id = data["site_id"];

        if (!user_id) {
          return resolve({
            status: false,
            message: "User ID is required",
          });
        }

        if (!site_id) {
          return resolve({
            status: false,
            message: "Site ID is required",
          });
        }

        var userDetailsWithRoleWise = await this.getUserDetailsWithRoleWise(data);
        if (userDetailsWithRoleWise["status"] == false) {
          return resolve(userDetailsWithRoleWise);
        }
        userDetailsWithRoleWise = userDetailsWithRoleWise["data"];

        const userRoleIds = userDetailsWithRoleWise["user_role"].map(
          (role) => role.user_role_id
        );

        var userRoleModel = await this.getRoleObjectByID(userRoleIds);

        async.forEachOf(
          userRoleModel,
          async (item, index, callback) => {
            //MANAGE ROLE WISE
            switch (item["code"]) {
              //1: SUPER ADMIN
              case 1:
                let _result = await BuildingModel.find({
                  site_id: site_id,
                });
                userRoleModel[index]["bulding_details"] = _result;
                callback;
                break;
              default:
                userRoleModel[index]["bulding_details"] = null;
                callback;
                break;
            }
          },
          (err, _) => {
            return resolve({
              status: true,
              message: "success",
              data: userRoleModel,
              err: err,
            });
          }
        );
      } catch (error) {
        return resolve({
          status: false,
          message: error.message,
        });
      }
    });
  }

  getFloorListByUserID(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let user_id = data["data"];
        let building_id = data["building_id"];

        if (!user_id) {
          return resolve({
            status: false,
            message: "User ID is required",
          });
        }

        if (!building_id) {
          return resolve({
            status: false,
            message: "Building ID is required",
          });
        }

        var userDetailsWithRoleWise = await this.getUserDetailsWithRoleWise(data);
        if (userDetailsWithRoleWise["status"] == false) {
          return resolve(userDetailsWithRoleWise);
        }
        userDetailsWithRoleWise = userDetailsWithRoleWise["data"];

        const userRoleIds = userDetailsWithRoleWise["user_role"].map(
          (role) => role.user_role_id
        );

        var userRoleModel = await this.getRoleObjectByID(userRoleIds);

        async.forEachOf(
          userRoleModel,
          async (item, index, callback) => {
            //MANAGE ROLE WISE
            switch (item["code"]) {
              //1: SUPER ADMIN
              case 1:
                let _result = await FloorModel.find({
                  building_id: building_id,
                });
                userRoleModel[index]["floor_details"] = _result;
                callback;
                break;
              default:
                userRoleModel[index]["floor_details"] = null;
                callback;
                break;
            }
          },
          (err, _) => {
            return resolve({
              status: true,
              message: "success",
              data: userRoleModel,
              err: err,
            });
          }
        );
      } catch (error) {
        return resolve({
          status: false,
          message: error.message,
        });
      }
    });
  }

  getPropertyListByUserID(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let user_id = data["data"];
        let floor_id = data["floor_id"];

        if (!user_id) {
          return resolve({
            status: false,
            message: "User ID is required",
          });
        }

        if (!floor_id) {
          return resolve({
            status: false,
            message: "Floor ID is required",
          });
        }

        var userDetailsWithRoleWise = await this.getUserDetailsWithRoleWise(data);
        if (userDetailsWithRoleWise["status"] == false) {
          return resolve(userDetailsWithRoleWise);
        }
        userDetailsWithRoleWise = userDetailsWithRoleWise["data"];

        const userRoleIds = userDetailsWithRoleWise["user_role"].map(
          (role) => role.user_role_id
        );

        var userRoleModel = await this.getRoleObjectByID(userRoleIds);

        async.forEachOf(
          userRoleModel,
          async (item, index, callback) => {
            //MANAGE ROLE WISE
            switch (item["code"]) {
              //1: SUPER ADMIN
              case 1:
                let _result = await PropertyModel.find({
                  floor_id: floor_id,
                });
                userRoleModel[index]["property_details"] = _result;
                callback;
                break;
              default:
                userRoleModel[index]["property_details"] = null;
                callback;
                break;
            }
          },
          (err, _) => {
            return resolve({
              status: true,
              message: "success",
              data: userRoleModel,
              err: err,
            });
          }
        );
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




