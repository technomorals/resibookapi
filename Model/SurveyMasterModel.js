const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveyMasterSchema = new Schema(
  {
    survey_title: {
      type: String,
      required: true, // The title of the survey
    },
    survey_description: {
      type: String,
      required: false, // Description of the survey (optional)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SurveyMaster", surveyMasterSchema);
