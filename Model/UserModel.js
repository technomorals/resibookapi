var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var users = new Schema(
  {
    is_active: { type: Boolean, required: true, default: 1 },
    is_delete: { type: Boolean, required: true, default: 0 },
    is_verified: { type: Boolean, required: true, default: 0 },
    name: { type: String, required: true },
    mobile_no: { type: String, required: false },
    email_id: { type: String, required: false },
    username: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    profile: { type: String, required: false },
    birth_date: { type: String, required: false },
    gender: { type: String, required: false },
    location: { type: String, requied: false },
    pincode: { type: String, required: false },
    country: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    register_type: { type: String, required: true },
    register_type_uid: { type: String, required: true },
    profile_pic: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", users);
