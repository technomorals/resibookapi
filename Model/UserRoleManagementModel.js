var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userRoleSchema = new Schema({
  user_role_id: {
    type: Schema.Types.ObjectId,
    ref: "UserRoleMaster",
    required: true, // Reference to the UserRoleMaster collection
  },
  permission : [{type: String, required: true}],
  site_id: {
    type: Schema.Types.ObjectId,
    ref: "Site",
    required: false,
  },
  building_id: {
    type: Schema.Types.ObjectId,
    ref: "Building",
    required: false,
  },
  floor_id: {
    type: Schema.Types.ObjectId,
    ref: "Floor",
    required: false,
  },
  property_id: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: false,
  },
  status: { type: Boolean, required: true, default: true }  
},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual field to populate user role details
userRoleSchema.virtual("role_details", {
  ref: "UserRoleMaster", // Reference to the UserRoleMaster collection
  localField: "user_role_id", // Field in userRoleSchema
  foreignField: "_id", // Field in UserRoleMaster schema
  justOne: true, // Return a single document instead of an array
});

var userRoleManagement = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the users collection
    user_role: [userRoleSchema],
    status: { type: Boolean, required: true, default: true }, // Status of the role (e.g., active or inactive)
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserRoleManagement", userRoleManagement);
