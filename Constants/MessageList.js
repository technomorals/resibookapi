var express = require("express");
const MessageList = Object.freeze({
  success: "Success.",
  param_missing: "Please, Check Your Parameters",
  record_already_available: "Record Already Available.",
  record_already_exists: "Record Already Exists.",
  no_record_found: "No record found.",
  no_data: "No data found.",
  not_inserted: "Not inserted.",
  not_updated: "Not updated.",
});
module.exports = MessageList;
