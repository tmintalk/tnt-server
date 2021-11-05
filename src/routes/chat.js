const express = require("express");
const { getUsersInRoom } = require("./chatUsers");

const router = express.Router();

router.get("/rooms/:roomId/users", (req, res) => {
  const users = getUsersInRoom(req.params.roomId);
  return res.json({ users });
});
