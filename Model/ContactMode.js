const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    num_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MobileNumber", // Reference to MobileNumber model
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
