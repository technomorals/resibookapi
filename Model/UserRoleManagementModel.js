var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userRoleManagement = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the users collection
    user_role_id: {
      type: Schema.Types.ObjectId,
      ref: "UserRoleMaster",
      required: true, // Reference to the UserRoleMaster collection
    },
    status: { type: Boolean, required: true, default: true }, // Status of the role (e.g., active or inactive)
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserRoleManagement", userRoleManagement);