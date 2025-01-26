var express = require("express");
const QueryData = Object.freeze({
  userQuery: {
    name: 1,
    username: 2,
    register_type: 3,
    register_type_uid: 4,
  },
  userQueryFull: {
    is_active: 1,
    is_delete: 2,
    name: 3,
    mobile_no: 4,
    email_id: 5,
    username: 6,
    password: 7,
    profile: 8,
    birth_date: 9,
    gender: 10,
    location: 11,
    pincode: 12,
    country: 13,
    state: 14,
    city: 15,
    register_type: 16,
    register_type_uid: 17,
  },
});
module.exports = QueryData;
