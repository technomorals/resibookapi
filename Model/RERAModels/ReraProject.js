const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  prmtr_pan_no: String,
  project_address: String,
  project_cost: Number,
  project_status: String,
  startDate: Date,
  districtType: String,
  approvedOn: Date,
  endDate: Date,
  hardcopysubmissionDate: Date,
  payment_status: String,
  payment_token: String,
  pmtr_email_id: String,
  pr_mobile_no: String,
  prmtr_adhaar_no: String,
  prmtr_com_reg_no: String,
  projectCost: Number,
  projectType: String,
  districtName: String,
  promoterName: String,
  wfoid: String,
  promoterAddress: String,
  regFee: Number,
  projectRegId: Number,
  projectName: String,
  regNo: String,
  projOrgFDate: Date,
  extDate: Date,
  disposed_date: Date,
  total_est_cost_of_proj: Number,
  project_ack_no: String
});

// Create a model
const Project = mongoose.model('ReraProject', ProjectSchema);

module.exports = Project;
