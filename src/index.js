const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");
const socketIO = require("socket.io");
var http = require("http").createServer(express);

require("dotenv").config();
const { sequelize } = require("./models");

const rootRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

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
// Socket 연결
const io = socketIO(http, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("a user connected!");
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});

module.exports = app;
