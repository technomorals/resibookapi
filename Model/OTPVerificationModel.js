const mongoose = require('mongoose');

const otpVerificationSchema = new mongoose.Schema({
  mobile_no: {
    type: String,
    required: true,// Matches a 10-digit mobile number
  },
  otp: {
    type: String,
    required: true,
    minlength: 4, // Minimum OTP length
    maxlength: 6, // Maximum OTP length
  },
  otp_expiry: {
    type: Date,
    required: false, // Optional field to add expiration logic
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("otp_verification", otpVerificationSchema);
