const mongoose = require("mongoose");

const CategoryContactSchema = new mongoose.Schema(
  {
    contact_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact", // Reference to Contact model
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to Category model
      required: true,
    },
  },
  { timestamps: true }
);

const CategoryContact = mongoose.model(
  "CategoryContact",
  CategoryContactSchema
);

module.exports = CategoryContact;
