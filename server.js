var express = require("express");
var dotenv = require("dotenv");
var path = require("path");
var cors = require("cors");
var APIRouter = require("./Router/APIRouter");
const mongoose = require("mongoose");
const NotificationManager = require("./Global/NotificationManager/NotificationManager.js");
const FirebaseAdmin = require("./Global/FirebaseAdmin/FirebaseAdmin.js");

const SocketManager = require("./Global/SocketManager");

const clients = {};

const http = require("http");
var app = express();
let server = http.createServer(app);

var io = require("socket.io")(server);
const socketManager = new SocketManager();
socketManager.init(server);

dotenv.config();

var databaseURL =
  "mongodb+srv://resibook:Vanani9442@resibook.fdz5f.mongodb.net/resibook?retryWrites=true&w=majority";

mongoose
  .connect(databaseURL)
  .then(async () => {
    console.log("Connected");
    // NotificationManager.sendNotificaitonEverySecond();
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public/uploads/")));

app.use("/welcome", (req, res) => {
  res.send({ message: "Welcome" });
});
app.use("/api/welcome", (req, res) => {
  res.send({ message: "Welcome" });
});

app.post("/api/maintenance", (req, res) => {
  res.send({
    application_id: "1565383004",
    application_name: "INSTA EXPERT",
    application_description:
      "You can download profile picture, posts, reels with in one click, also you can access notification feature from Insta Experts.",
    apple_id: "1565383004",
    email_id: "manthanvanani9442@gmail.com",
    whatsappnumbers: "918156067411",
    website: "https://instaexpert.carrd.co/",
    appstore_url:
      "https://apps.apple.com/app/insta-save-repost-post-reels/id1565383004",
    is_maintenance: false,
    is_ads: true,
    application_version: "6.4",
    repost_url:
      "https://applicationsjson.s3.amazonaws.com/Insta+Expert/repost.mp4",
    is_review: true,
    isPostDownload: true,
    isProfileDownload: true,
  });
});

app.use("/api", APIRouter);

app.listen(9442, () => {
  console.log(`server started running on ${9442}.`);
});
module.exports = app;
