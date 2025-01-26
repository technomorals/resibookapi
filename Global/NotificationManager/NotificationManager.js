const FCM = require("fcm-node");
var DeviceInfoModel = require("..//..//Model/DeviceInfoModel.js");
var server_key =
  "AAAA80KoPK4:APA91bE99UzFEHhSsY4hYDlF78nDNpT4K9XNHksTTPDLBzw0wQiiMsgh2ADvV0aILwIK-R6vMt_--23Q-nV5eZbsFnqlI5Y3VE9dOHrIEE6CSoBh6rUkqY2L0tfD8sWSevSI-9Yb_vQ_";
var testToken = [
  "fogucMdQkUPsh9r4SUThvP:APA91bEAKZjamxSvL3YsSKWcdjUuXzls571TzRJCLesDOS3yWo4Y3ZKB14yue47KeSAu9C5h84p3A8cae_7ID0qksU1vvz-TL8g0wK0ahZTwdsTqmArytwQ",
];
const _ = require("lodash");
var request = require("request");
const FirebaseAdmin = require("../FirebaseAdmin/FirebaseAdmin.js");
class NotificationManager {
  constructor() {
    this.fcm = new FCM(server_key);
  }

  send_dummy_message() {
    var notification_data = {
      priority: "high",
      registration_ids: testToken,
      notification: {
        title: "❤️ Review Insta Expert ❤️",
        body: "Your reviews keep our small team motivated to make Insta Expert even better.",
      },
      data: {
        key_: "rating",
        in_app: true,
        value_: "https://www.instagram.com",
      },
    };

    this.fcm.send(notification_data, function (err, response) {
      if (err) {
        console.log("Something has gone wrong! ", err);
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });
  }

  async sendNotification() {
    var data = await DeviceInfoModel.find({
      fcm_token: { $exists: true },
      $expr: { $gt: [{ $strLenCP: "$fcm_token" }, 1] },
    })
      .sort({ updatedAt: -1 })
      .select("fcm_token");

    var token = data.flatMap((element) => {
      return element.fcm_token;
    });
    data = new Set(data);
    console.log("token total", token.length);

    let new_array = _.chunk(token, [100]);
    for (let index = 0; index < new_array.length; index++) {
      const token = new_array[index];
      console.log("token", token.length);

      var notification_data = {
        priority: "high",
        registration_ids: token,
        notification: {
          title: `🚀 Insta Expert 🚀`,
          body: "Your reviews keep our small team motivated to make Insta Expert even better.",
        },
        data: {
          key_: "rating",
          in_app: true,
          value_: "https://www.instagram.com",
        },
      };

      this.fcm.send(notification_data, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!", err.message, response);
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });
    }
  }

  async sendNotificationWithData(payload) {
    var data = await DeviceInfoModel.find({
      fcm_token: { $exists: true },
      $expr: { $gt: [{ $strLenCP: "$fcm_token" }, 1] },
    })
      .sort({ updatedAt: -1 })
      .select("fcm_token");

    var token = data.flatMap((element) => {
      return element.fcm_token;
    });
    data = new Set(data);
    console.log("token total", token.length);

    let new_array = _.chunk(token, [100]);
    for (let index = 0; index < new_array.length; index++) {
      const token = new_array[index];
      console.log("token", token.length);

      var notification_data = {
        priority: "high",
        registration_ids: token,
        notification: {
          title: payload["title"],
          body: payload["body"],
        },
        data: payload["data"],
      };

      this.fcm.send(notification_data, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!", err, response);
        } else {
          console.log("Successfully sent with response: ");
        }
      });
    }
  }

  async sendNotificaitonEverySecond() {
    setInterval(() => {
      this.sendNotificationForDummyView();
    }, 5000);
  }

  async sendNotificationForDummyView() {
    var data = await DeviceInfoModel.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: new Date(new Date().getTime() - 1000 * 86400 * 15),
          },
        },
      },
      { $sample: { size: 1 } },
    ]);

    if (data.length > 0) {
      data = data[0];
    }

    let token = data["fcm_token"];
    if (!token) {
      return;
    }

    var instagramUserProfile = await InstagramUserProfile.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: new Date(new Date().getTime() - 1000 * 86400 * 30),
          },
        },
      },
      { $sample: { size: 1 } },
    ]);

    if (instagramUserProfile.length > 0) {
      instagramUserProfile = instagramUserProfile[0];
    }

    let username = instagramUserProfile["username"];
    let url = `https://instagram.com/${username}`;

    const message = {
      token: token,
      notification: {
        title: `Insta Expert`,
        body: `${username}, Just Viewed Your Profile.`,
      },
      data: {
        key_: "url",
        value_: url,
      },
    };

    FirebaseAdmin.sendNotification(message);
  }
}

module.exports = new NotificationManager();
