const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorRatingReviewSchema = new Schema(
  {
    vendor_id: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",  // Reference to the Vendor model
      required: true, // Ensures each review is linked to a vendor
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",  // Reference to the User model (who gave the rating/review)
      required: true,  // Ensures review is from a valid user
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,  // Rating must be between 1 and 5
    },
    review: {
      type: String,
      required: false, // Review text is optional, rating is required
    },
    review_date: {
      type: Date,
      default: Date.now, // Default to current date
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",  // Default status is pending until reviewed
    },
  },
  { timestamps: true }  // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("VendorRatingReview", vendorRatingReviewSchema);
