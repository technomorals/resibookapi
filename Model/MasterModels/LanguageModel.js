const mongoose = require("mongoose");

// Define the schema for the Language model
const LanguageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // The name of the language, e.g., "English", "Spanish"
      trim: true,
    },
    language_code: {
      type: String,
      required: true, // ISO 639-1 language code, e.g., "en", "es"
      unique: true, // Ensure the code is unique
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt timestamps

// Create the model using the schema
const Language = mongoose.model("Language", LanguageSchema);

module.exports = Language;
