const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");
const socketIO = require("socket.io");
const { addUser, removeUser, updateReadCnt } = require("./ChatUsers");
const { addMessage, getMessagesInRoom } = require("./ChatMessages");

require("dotenv").config();
const { sequelize } = require("./models");

const rootRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;
// TODO: Socket 연결 -> SSL 을 위한 구조 변경 필요
var server = require("http").createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
    credentials: true,
  },
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

require("./config/passport")(passport);

app.use("/", rootRoutes);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.status(404).send(err);
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected!`);

  //join a conversation room
  const { roomId, name, picture } = socket.handshake.query;
  console.log("socket data", roomId, name, picture);
  socket.join(roomId);

  //notify new user join
  const user = addUser(socket.id, roomId, name, picture);
  io.in(roomId).emit("user join", user);

  //Listen for new message
  socket.on("new message", (data) => {
    const message = addMessage(roomId, data);
    io.in(roomId).emit("new message", message);
  });

  // Listen for typing events
  socket.on("start typing", (data) => {
    io.in(roomId).emit("start typing", data);
  });
  socket.on("stop typing", (data) => {
    io.in(roomId).emit("stop typing", data);
  });

  //if someone leave room, disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    const messageCnt = getMessagesInRoom(roomId).length;
    updateReadCnt(user?.name, roomId, messageCnt);
    io.in(roomId).emit("user leave", user);
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});

module.exports = server;
