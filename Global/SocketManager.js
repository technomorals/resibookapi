const socketIo = require("socket.io");

class SocketManager {
  constructor() {
    this.io = null;
    this.connectedClients = [];
  }

  // Initialize the server and socket.io
  init(server) {
    this.io = socketIo(server);
    this.io.on("connection", this.handleConnection.bind(this));
  }

  // Handle socket connection
  handleConnection(socket) {
    // Listen for message sending event
    socket.on("send_message", (data) => this.handleSendMessage(data));

    // Listen for typing status
    socket.on("typing", (data) => this.handleTyping(socket, data));

    socket.on("register", (data) => this.handleRegister(socket, data));

    socket.on("room_join", (data) => this.joinWithRoom(socket, data));

    // Handle socket disconnect
    socket.on("disconnect", () => {
      this.handleDisconnect(socket); // This is an arrow function, so `this` is correct
    });
  }

  // Handle sending messages
  handleSendMessage(data) {
    console.log(`Message from`, data.sender_id, data.message);

    if (data["status"]) {
      if (typeof data["status"] === "string") {
        try {
          data["status"] = JSON.parse(data["status"]);
        } catch (error) {
          console.log(error.message);
        }
      }

      if (data["status"].length > 0) {
        for (let index = 0; index < data["status"].length; index++) {
          const user = data["status"][index];
          this.io.to(user["user_id"]).emit("receive_message", data);
          //this.sendMessage(user['user_id'], data);
          //console.log("EMIT TO ", user["id"] ?? user["_id"]);
        }
      }
    }
    if (data["sender_id"]) {
      this.io.to(data["sender_id"]).emit("receive_message", data);
      //this.sendMessage(data["sender_id"], data);
      //console.log("EMIT TO ", data["sender_id"]);
    }

    //this.sendMessage("receive_message", data);
  }

  getAllSocketID(socketID) {
    return _clients.filter((client) => client[keySocketID] === socketID);
  }

  // Handle Register event
  handleRegister(socket, data) {
    let userID = data["user_id"];
    let socketID = socket.id;
    this.addClient(userID, socketID);
  }

  // Handle typing event
  handleTyping(socket, data) {
    socket.to(data.receiverId).emit("typing", data.senderId);
  }

  // Handle socket disconnection
  handleDisconnect(socket) {
    let socketID = socket.id;
    this.removeClient(socketID);
  }

  sendMessage(key, data) {
    this.io.emit(key, data);
    console.log(`Emitted event '${key}' to all connected clients.`);
  }

  joinWithRoom(socket, data) {
    let userID = data["user_id"];
    socket.join(userID);
    this.io
      .to(userID)
      .emit("room_join", { message: `User ${userID} has joined the room.` });

    console.table({ message: `User ${userID} has joined the room.` });
  }

  setEmit(target, event, data) {
    if (Array.isArray(target)) {
      // Emit to an array of sockets (multiple clients)
      target.forEach((socketId) => {
        this.io.to(socketId).emit(event, data);
      });
    } else if (typeof target === "string") {
      // Emit to a single socket or room
      this.io.to(target).emit(event, data);
    }
  }

  addClient(userId, socketId) {
    // Ensure no duplicate userId exists
    if (!this.connectedClients.some((client) => client.socketId === socketId)) {
      this.connectedClients.push({ userId, socketId });
      console.log(
        `Client with userId ${userId} and socketId ${socketId} added to connected clients.`
      );
    } else {
      console.log(`User ${userId} is already connected.`);
    }
  }

  removeClient(socketId) {
    this.connectedClients = this.connectedClients.filter(
      (client) => client.socketId !== socketId
    );
    console.log(
      `Client with socketId ${socketId} removed from connected clients.`
    );
  }

  getConnectedClients() {
    return this.connectedClients;
  }

  findClientByUserId(userId) {
    return (
      this.connectedClients.find((client) => client.userId === userId) || null
    );
  }

  findClientBySocketId(socketId) {
    return (
      this.connectedClients.find((client) => client.socketId === socketId) ||
      null
    );
  }
  isSocketConnected(socketId) {
    const socket = this.io.sockets.sockets.get(socketId);
    return socket ? true : false; // If socket is found, it's connected
  }
}

module.exports = SocketManager;
