const MessageModel = require("..//Model/MessageModel.js");
const ChatRoomManager = require("./ChatRoomManager.js");
const FirebaseAdminManager = require("./FirebaseAdmin/FirebaseAdmin.js");
const SocketManager = require("./SocketManager.js");

class MessageManager {
  constructor() {}

  async getMessage(_data) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = _data;
        var chat_room_id = data.chat_room_id ?? null;
        var skip = data.skip ?? 0;
        var limit = data.limit ?? 10;
        var sender_id = data.sender_id ?? null;
        var message = data.message ?? null;
        var type = data.type ?? null;

        var model = await MessageModel.find({
          chat_room_id: chat_room_id,
        })
          .populate("sender_details", "_id name username")
          .populate("status_details", "_id name username")

          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip);

        return resolve(model);
      } catch (error) {
        return resolve(false);
      }
    });
  }

  async sendMessage(_data) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = _data;
        var chat_room_id = data.chat_room_id ?? null;
        var sender_id = data.sender_id ?? null;
        var message = data.message ?? null;
        var type = data.type ?? null;
        var src_url = data.src_url ?? null;

        var allPatifipants = await ChatRoomManager.getAllPatifipants(
          chat_room_id
        );

        var status = [];
        var userIDs = [];
        if (allPatifipants && allPatifipants["participants"]) {
          allPatifipants = allPatifipants["participants"];
          allPatifipants.forEach((patifipants) => {
            if (patifipants["user_id"] != sender_id) {
              status.push({
                user_id: patifipants["user_id"],
              });
              if (
                patifipants["is_muted"] === false &&
                patifipants["is_archive"] === false
              ) {
                userIDs.push(patifipants["user_id"]);
              }
            }
          });
        }

        var model = await MessageModel({
          chat_room_id: chat_room_id,
          sender_id: sender_id,
          message: message,
          type: type,
          src_url: src_url,
          status: status,
        }).save();

        // console.log(SocketManager.getAllSocketID())
        FirebaseAdminManager.sendMessageNotificationToUser(userIDs, model);

        return resolve(model);
      } catch (error) {
        return resolve(error);
      }
    });
  }

  async updateUserDeliveredMessage(data) {
    return new Promise(async (resolve, reject) => {
      try {
        // Assuming you have the messageId and userId
        const messageId = data["message_id"];
        const userId = data["user_id"];

        MessageModel.updateOne(
          { _id: messageId, "status.user_id": userId }, // Find the message and the specific user
          {
            $set: {
              "status.$.is_delivered": true, // Mark the message as delivered
              "status.$.delivered_at": new Date(), // Set the delivery timestamp
            },
          }
        )
          .then((result) => {
            return resolve(result);
          })
          .catch((err) => {
            return reject(err);
          });
      } catch (error) {
        return reject(error);
      }
    });
  }

  async updateUserReadMessage(data) {
    return new Promise(async (resolve, reject) => {
      try {
        // Assuming you have the messageId and userId
        const messageId = data["message_id"];
        const userId = data["user_id"];

        MessageModel.updateOne(
          { _id: messageId, "status.user_id": userId }, // Find the message and the specific user
          {
            $set: {
              "status.$.is_read": true, // Mark the message as delivered
              "status.$.read_at": new Date(), // Set the delivery timestamp
            },
          }
        )
          .then((result) => {
            return resolve(result);
          })
          .catch((err) => {
            return reject(err);
          });
      } catch (error) {
        return reject(error);
      }
    });
  }

  async updateUserDeleteMessage(data) {
    return new Promise(async (resolve, reject) => {
      try {
        // Assuming you have the messageId and userId
        const messageId = data["message_id"];
        const userId = data["user_id"];

        MessageModel.updateOne(
          { _id: messageId, "status.user_id": userId }, // Find the message and the specific user
          {
            $set: {
              "status.$.is_delete": true, // Mark the message as delivered
              "status.$.delete_at": new Date(), // Set the delivery timestamp
            },
          }
        )
          .then((result) => {
            return resolve(result);
          })
          .catch((err) => {
            return reject(err);
          });
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new MessageManager();
