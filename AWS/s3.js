const AWS = require("aws-sdk");
const fs = require("fs");
//configuring the AWS environment
AWS.config.update({
  accessKeyId: "AKIAU5RB3PUDMU5D6B6V",
  secretAccessKey: "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",
});
var s3 = new AWS.S3();
class AWSManager {
  constructor() {
    s3 = new AWS.S3();
  }
  uploadFiles_(_upload_data) {
    var _file_name = _upload_data.file_name;
    var _file_path = _upload_data.file_path;
    var bucket_name = _upload_data.bucket_name;
    return new Promise(function (resolve, reject) {
      //configuring parameters
      var params = {
        Bucket: bucket_name,
        Body: fs.createReadStream(_file_path),
        Key: _file_name,
      };
      s3.upload(params, function (err, data) {
        //handle error
        if (err) {
          return resolve({
            status: false,
            error: err,
            message: err.message,
            data: null,
          });
        } else if (data) {
          return resolve({
            status: true,
            error: null,
            message: "success.",
            data: data,
          });
        }
      });
    });
  }

  uploadInstagramUserProfilePicture(_param) {
    return new Promise(async function (resolve, reject) {
      var params = {
        bucket_name: _param.bucket_name,
        file_path: _param.file_path,
        file_name: _param.file_name,
      };
      return resolve(params);
    });
  }
}
module.exports = new AWSManager();
