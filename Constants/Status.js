var express = require("express");
const StatusCodeList = Object.freeze({
  success: {
    status: true,
    status_code: 200,
    status_message: "Success.",
  },
  update: {
    status: true,
    status_code: 201,
    status_message: "Update.",
  },
  parameterMissing: {
    status: false,
    status_code: 202,
    status_message: "Parameter Missing, Parameter have Wrong Value or Data Type Mistmatch",
  },
  already_available: {
    status: false,
    status_code: 204,
    status_message: "Success.",
  },
  error: {
    status: false,
    status_code: 500,
    status_message: "Error.",
  }
});
module.exports = StatusCodeList;

