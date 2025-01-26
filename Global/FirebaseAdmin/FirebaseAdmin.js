const admin = require("firebase-admin");

const serviceAccount = require("..//..//Constants/Credential/firebase_admin.json");

class FirebaseAdmin {
  constructor() {
    this.initApplication();
  }

  initApplication() {
    if (!admin.apps.length) {
      this.admin_ = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }

  sendNotificaiton(data) {
    return new Promise((resolve, reject) => {
      var other_data = data["other_data"] ?? [];
      if (other_data) {
        other_data = JSON.stringify(other_data);
      }
      var message = {
        data: {
          category: data["category"],
          click_action: data["category"],
          title: data["title"] ?? "",
          body: data["body"] ?? "",
          other_data: other_data,
        },
        token: data["token"],
        apns: {
          headers: {
            "apns-priority": "5",
          },
          payload: {
            aps: {
              category: data["category"],
              click_action: "click_action",
              title: data["title"] ?? "",
              body: data["body"] ?? "",
              other_data: other_data,
            },
          },
        },
      };

      if (data["type"] == "android") {
      } else {
        message["notification"] = {
          title: data["title"] ?? "",
          body: data["body"] ?? "",
        };
      }

      // console.log(message);

      this.admin
        .messaging()
        .send(message)
        .then((response) => {
          // console.log(response);
          return resolve({
            status: true,
            response: response,
          });
        })
        .catch((error) => {
          // console.log("Error sending message:", error.message);
          return resolve({
            status: false,
            error: error,
          });
        });
    });
  }

  // SUBSCRIBE TOPIC
  subscribeToTopic(data) {
    return new Promise((resolve, reject) => {
      var topic = data.topic;
      var token = data.token;
      admin
        .messaging()
        .subscribeToTopic(token, topic)
        .then((response) => {
          console.log(response);
          return resolve({
            status: true,
            response: response,
          });
        })
        .catch((error) => {
          return resolve({
            status: false,
            error: error,
          });
        });
    });
  }

  sendToTopic(data) {
    return new Promise((resolve, reject) => {
      const message = {
        notification: {
          title: "Notification Title",
          body: Date().toString(),
        },
        data: {
          category: data.category,
          click_action: data.category,
        },
        topic: data.topic,
        apns: {
          headers: {
            "apns-priority": "5",
          },
          payload: {
            aps: {
              category: data.category,
            },
          },
        },
      };
      console.log(message);

      this.admin
        .messaging()
        .send(message)
        .then((response) => {
          console.log(response);
          return resolve({
            status: true,
            response: response,
          });
        })
        .catch((error) => {
          console.log("Error sending message:", error.message);
          return resolve({
            status: false,
            error: error,
          });
        });
    });
  }

  listUsers(nextPageToken) {
    return new Promise((resolve, reject) => {
      this.admin_
        .auth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord) => {
            console.log("user", userRecord.toJSON());
          });
          return resolve(listUsersResult);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  updateUser(userData) {
    return new Promise((resolve, reject) => {
      let uid = userData.uid;
      var data = { disabled: false };
      if (userData.email) {
        data["email"] = userData.email;
      }

      if (userData.phoneNumber) {
        data["phoneNumber"] = userData.phoneNumber;
      }

      if (userData.displayName) {
        data["displayName"] = userData.displayName;
      }

      if (userData.photoURL) {
        data["photoURL"] = userData.photoURL;
      }

      this.admin_
        .auth()
        .updateUser(uid, data)
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully updated user", userRecord.toJSON());
          return resolve(userRecord.toJSON());
        })
        .catch((error) => {
          console.log("Error updating user:", error);
          return reject(error);
        });
    });
  }

  deleteUser(userData) {
    return new Promise((resolve, reject) => {
      this.admin_
        .auth()
        .deleteUser(userData.uid)
        .then(() => {
          console.log("Successfully deleted user");
        })
        .catch((error) => {
          console.log("Error deleting user:", error);
          return reject(error);
        });
    });
  }

  getUserByEmail(userData) {
    return new Promise((resolve, reject) => {
      this.admin_
        .auth()
        .getUserByEmail(userData.email)
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
          return resolve(userRecord.toJSON());
        })
        .catch((error) => {
          console.log("Error fetching user data:", error);
          return reject(error);
        });
    });
  }

  getUserByPhoneNumber(phoneNumber) {
    return new Promise((resolve, reject) => {
      console.log(phoneNumber);
      this.admin_
        .auth()
        .getUserByPhoneNumber(phoneNumber)
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
          return resolve(userRecord.toJSON());
        })
        .catch((error) => {
          console.log("Error fetching user data:", error);
          return resolve(error);
        });
    });
  }

  getUsers(userData) {
    return new Promise((resolve, reject) => {
      this.admin_
        .auth()
        .getUsers(userData)
        .then((getUsersResult) => {
          console.log("Successfully fetched user data:");
          getUsersResult.users.forEach((userRecord) => {
            console.log(userRecord);
          });

          console.log(
            "Unable to find users corresponding to these identifiers:"
          );
          getUsersResult.notFound.forEach((userIdentifier) => {
            console.log(userIdentifier);
          });
        })
        .catch((error) => {
          console.log("Error fetching user data:", error);
        });
    });
  }

  // :::::::::::::::::::::::::: USER ::::::::::::::::::::::::::

  // :::::::::::::::::::::::::: CREATE USER ::::::::::::::::::::::::::

  async createUser(userData) {
    return new Promise(async (resolve, reject) => {
      try {
        var email = userData["email"] ?? userData["email_id"];
        var emailVerified = userData["emailVerified"];
        var phoneNumber = userData["phoneNumber"] ?? userData["mobile_no"];
        var displayName = userData["displayName"] ?? userData["name"];
        var photoURL = userData["photoURL"] ?? userData["photo"];

        const userRecord = await admin.auth().createUser({
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,          
          displayName: displayName,
          photoURL: photoURL,
        });

        return resolve(userRecord);
      } catch (err) {
        return reject(err);
      }
    });
  }

  // :::::::::::::::::::::::::: UPDATE USER ::::::::::::::::::::::::::

  async sendNotification(message) {
    // Send the message
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }
}

module.exports = new FirebaseAdmin();
