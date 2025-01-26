var FirebaseAdminManager = require("../Global/FirebaseAdmin/FirebaseAdmin.js");

exports.sendNotificaiton = [
  async (req, res) => {
    try {
      var data = {};
      var token = req.body.token;
      var category = req.body.category;

      if (!token) {
        return res.send({ status: false, message: "Token is required" });
      } else if (!category) {
        return res.send({ status: false, message: "Category is required" });
      }

      data["token"] = token;
      data["category"] = category;

      let _data = await FirebaseAdminManager.sendNotificaiton(data);
      return res.send(_data);
    } catch (error) {
      return res.json({
        status: false,
        message: "error",
        data: null,
        error: error.message,
      });
    }
  },
];

exports.sendToTopic = [
  async (req, res) => {
    try {
      var data = {};
      var token = req.body.token;
      var topic = req.body.topic;
      var category = req.body.category;

      if (!token) {
        return res.send({ status: false, message: "Token is required" });
      } else if (!topic) {
        return res.send({ status: false, message: "Topic is required" });
      } else if (!category) {
        return res.send({ status: false, message: "Category is required" });
      }

      data["token"] = token;
      data["topic"] = topic;
      data["category"] = category;

      let _data = await FirebaseAdminManager.sendToTopic(data);
      return res.send(_data);
    } catch (error) {
      return res.json({
        status: false,
        message: "error",
        data: null,
        error: error.message,
      });
    }
  },
];

exports.subscribeToTopic = [
  async (req, res) => {
    try {
      var data = {};
      var token = req.body.token;
      var topic = req.body.topic;

      if (!token) {
        return res.send({ status: false, message: "Token is required" });
      } else if (!topic) {
        return res.send({ status: false, message: "Topic is required" });
      }

      data["token"] = token;
      data["topic"] = topic;

      let _data = await FirebaseAdminManager.subscribeToTopic(data);
      return res.send(_data);
    } catch (error) {
      return res.json({
        status: false,
        message: "error",
        data: null,
        error: error.message,
      });
    }
  },
];

exports.listUsers = [
  async (req, res) => {
    try {
      var token = req.body.token;
      let _data = await FirebaseAdminManager.listUsers(token);
      return res.send(_data);
    } catch (error) {
      return res.json({
        status: false,
        message: "error",
        data: null,
        error: error.message,
      });
    }
  },
];

exports.updateUser = [
  async (req, res) => {
    try {
      var token = req.body.token;
      let _data = await FirebaseAdminManager.updateUser(token);
      return res.send(_data);
    } catch (error) {
      return res.json({
        status: false,
        message: "error",
        data: null,
        error: error.message,
      });
    }
  },
];

exports.deleteUser = [
  async (req, res) => {
    try {
      var token = req.body.token;
      let _data = await FirebaseAdminManager.deleteUser(token);
      return res.send(_data);
    } catch (error) {
      return res.json({
        status: false,
        message: "error",
        data: null,
        error: error.message,
      });
    }
  },
];

exports.getUserByEmail = [
  async (req, res) => {
    try {
      var token = req.body.token;
      let _data = await FirebaseAdminManager.getUserByEmail(token);
      return res.send(_data);
    } catch (error) {
      return res.json({
        status: false,
        message: "error",
        data: null,
        error: error.message,
      });
    }
  },
];

exports.getUserByPhoneNumber = [
  async (req, res) => {
    try {
      var token = req.body.token;
      let _data = await FirebaseAdminManager.getUserByPhoneNumber(token);
      return res.send(_data);
    } catch (error) {
      return res.json({
        status: false,
        message: "error",
        data: null,
        error: error.message,
      });
    }
  },
];

exports.createUser = [
  async (req, res) => {
    try {
      var token = req.body.token;
      let _data = await FirebaseAdminManager.createUser(token);
      return res.send(_data);
    } catch (error) {
      return res.json({
        status: false,
        message: "error",
        data: null,
        error: error.message,
      });
    }
  },
];
