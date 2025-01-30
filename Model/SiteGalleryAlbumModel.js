const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteGalleryAlbumSchema = new Schema(
  {
    site_id: { type: Schema.Types.ObjectId, ref: "Site", required: true }, // Reference to the Site
    album_name: { type: String, required: true }, // Name of the album (e.g., "Construction Progress", "Site Overview")
    album_description: { type: String, required: false }, // Optional description for the album
    album_type: {
      type: String,
      enum: [
        "construction_progress", // Images showing progress of construction
        "completed_site", // Images after construction is completed
        "site_overview", // General overview images of the site
        "floor_plans", // Architectural or floor plans
        "landscape", // Landscape images related to the site
        "other", // Any other category
      ],
      required: true, // Type of the album
    },
    images: [
      {
        image_url: { type: String, required: true }, // URL of the image (e.g., cloud storage or server link)
        description: { type: String, required: false }, // Optional description for each image
        uploaded_by: { type: Schema.Types.ObjectId, ref: "users", required: true }, // User who uploaded the image
        upload_date: { type: Date, default: Date.now }, // Date the image was uploaded
      },
    ], // Array of images associated with the album
    created_by: { type: Schema.Types.ObjectId, ref: "users", required: true }, // User who created the album
    created_at: { type: Date, default: Date.now }, // Date the album was created
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("SiteGalleryAlbum", siteGalleryAlbumSchema);
