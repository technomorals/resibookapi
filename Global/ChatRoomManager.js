const ChatRoomModel = require("..//Model/ChatRoomModel.js");
const mongoose = require("mongoose");
var uuid = require("uuid");

class ChatRoomManager {
  constructor() {}

  async getChatRoomDataByQuery(query) {
    return new Promise(async (resolve, reject) => {
      try {
        // SenderDetails
        let model = await ChatRoomModel.find(query)
        .populate({
            'path' : "message_details",
            'populate' : [
              {'path' : "status_details", 'select' : '_id name username'},
              {'path' : "sender_details", 'select' : '_id name username'},
            ]
          })
        .populate("participants_details", 'id name username profile')        
        .sort({ 'updatedAt' : -1});
        return resolve(model);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getChatRoomByID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let model = await ChatRoomModel.findById(id);
        return resolve(model);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getChatRoomByRoomID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let model = await ChatRoomModel.findOne({ chat_room_id: id });
        return resolve(model);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getChatRoomByUserID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = {
          "participants.user_id": { $all: [id] },
        };
        let model = this.getChatRoomDataByQuery(data);
        return resolve(model);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getChatRooms(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let model = this.getChatRoomDataByQuery(data);
        return resolve(model);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async setChatRoom(_data) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = _data;
        var sender_id = data["sender_id"];
        var receiver_id = data["receiver_id"];

        if(sender_id == receiver_id) {
          return resolve([])
        }

        // Find if a chat room already exists with the sorted user IDs
        const existingChatRoom = await ChatRoomModel.find({
          "participants.user_id": { $all: [sender_id, receiver_id] },
          $size: 2,
          is_group: false,
        });

        if (existingChatRoom && existingChatRoom.length > 0) {
          return resolve(existingChatRoom);
        }

        // If no existing room, create a new one (assuming you are creating a new room)
        const newChatRoom = new ChatRoomModel({
          created_by: sender_id,
          chat_room_id: mongoose.Types.ObjectId(),
          is_group: false, // Assuming this is a one-on-one chat, not a group
          participants: [
            {
              user_id: mongoose.Types.ObjectId(sender_id),
              is_archive: false,
              is_muted: false,
              user_role: 1,
            },
            {
              user_id: mongoose.Types.ObjectId(receiver_id),
              is_archive: false,
              is_muted: false,
            },
          ],
          is_active: true,
        });

        // Save the new chat room
        let model = await newChatRoom.save();

        return resolve(model);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getAllPatifipants(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const _getParticipants = await ChatRoomModel.findById(
          id,
          "participants"
        );
        return resolve(_getParticipants);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async setLastMessageToChatRoom(id, newData) {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUser = await ChatRoomModel.findByIdAndUpdate(id, newData, {
          new: true,
        });
        return resolve(updatedUser);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getChatRoomsByUserId(user_id, page = 1, limit = 10) {
    try {
      // Calculate the skip value based on page and limit
      const skip = (page - 1) * limit;

      // Fetch the chat rooms with pagination and other details
      const chatRooms = await ChatRoomModel.aggregate([
        {
          $match: {
            "participants.user_id": mongoose.Types.ObjectId(user_id),
            is_active: true, // Only active chat rooms
          },
        },
        {
          $unwind: "$participants", // Unwind the participants array
        },
        {
          $match: {
            "participants.user_id": mongoose.Types.ObjectId(user_id),
          },
        },
        {
          $lookup: {
            from: "messages", // Join with messages collection
            let: { chatRoomId: "$chat_room_id" },
            pipeline: [
              {
                $match: { $expr: { $eq: ["$chat_room_id", "$$chatRoomId"] } },
              },
              { $sort: { createdAt: -1 } }, // Sort by date to get the latest message
              { $limit: 1 }, // Only get the last message
            ],
            as: "last_message",
          },
        },
        {
          $lookup: {
            from: "messages",
            let: { chatRoomId: "$chat_room_id" },
            pipeline: [
              {
                $match: { $expr: { $eq: ["$chat_room_id", "$$chatRoomId"] } },
              },
              {
                $match: {
                  "status.user_id": mongoose.Types.ObjectId(user_id),
                  "status.is_read": { $ne: true },
                },
              }, // Find unread messages for this user
            ],
            as: "unread_messages",
          },
        },
        {
          $project: {
            created_by: 1,
            participants: 1,            
            is_group: 1,
            chat_room_id: 1,
            group_name: 1,
            last_message: "$last_message",
            unread_message_count: { $size: "$unread_messages" }, // Count unread messages
          },
        },
        {
          $skip: skip, // Skip the first 'skip' number of records
        },
        {
          $limit: limit, // Limit the number of records to the 'limit' value
        },
      ]);

      // Return chat rooms with unread message count and last message
      return chatRooms;
    } catch (err) {
      console.error("Error fetching chat rooms:", err);
      throw err;
    }
  }
}

module.exports = new ChatRoomManager();
