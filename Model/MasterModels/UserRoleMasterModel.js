var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userRoleMaster = new Schema(
  {
    name: { type: String, required: true, unique: true }, // Role name (e.g., Admin, User, etc.)
    priority: { type: Number, required: true }, // Priority of the role (e.g., 1 for highest, 2 for next, etc.)
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserRoleMaster", userRoleMaster);