var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var device_info = new Schema({    
    status: { type: Boolean, required: true, default: true },
    fcm_token: { type: String, required: false},
    identifierForVendor: { type: String, required: false},
    systemVersion: { type: String, required: false},
    bundleIdentifier: { type: String, required: false},
    regionCode: { type: String, required: false},
    createdDate: { type: Date, default: Date.now },
    sessionid: { type: String, required: false},
    ig_did: { type: String, required: false},
    mid: { type: String, required: false},
    ds_user_id: { type: String, required: false},
    uid : { type: String, required: false},
}, { timestamps: true });
module.exports = mongoose.model('device_info', device_info);