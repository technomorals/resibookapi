const { RateLimiterMemory } = require("rate-limiter-flexible");

var express = require("express");
var dotenv = require("dotenv");
var path = require("path");
var cors = require("cors");
var APIRouter = require("./Router/APIRouter");
const mongoose = require("mongoose");
const SocketManager = require("./Global/SocketManager");

const clients = {};

const http = require("http");
const SiteManager = require("./Global/SiteManager");
const UserManager = require("./Global/UserManager/UserManager");
var app = express();
let server = http.createServer(app);

// var io = require("socket.io")(server);
const socketManager = new SocketManager();
socketManager.init(server);

dotenv.config();

var databaseURL =
  "mongodb+srv://chat:sm123@cluster0.vzuz4rj.mongodb.net/resibook";

mongoose
  .connect(databaseURL)
  .then(async () => {
    console.log("Connected");
    
    let _json = {
      user_id: '679b0bb2a876abc21d8975f4',
      user_role : [{
        site_id : '679b0e85bf6fd32d084e46c0',
        user_role_id : '679b08da9c449af1e8d60df6'
      }]
    }
    let _model = require('./Model/UserRoleManagementModel')
    let _result = await _model(_json).save();
    // console.log(_result);
    UserManager.getSiteListByUserID('679b0bb2a876abc21d8975f4');

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

// const rateLimiter = new RateLimiterMemory({
//   points: 5, // 5 requests
//   duration: 1, // per second
// });

// app.use(async (req, res, next) => {
//   try {
//     await rateLimiter.consume(req.ip); // Consume 1 point per request
//     next();
//   } catch (rejRes) {
//     res.status(429).send("Too many requests, please try again later.");
//   }
// });

let pincode = `https://api.postalpincode.in/pincode/395004`;

app.use("/welcome", (req, res) => {
  res.send({ message: "Welcome" });
});
app.use("/api/welcome", (req, res) => {
  res.send({ message: "Welcome" });
});

app.use("/api", APIRouter);

app.listen(9442, () => {
  console.log(`server started running on ${9442}.`);
});

module.exports = app;
