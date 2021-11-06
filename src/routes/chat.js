const express = require("express");
const { getUsersInRoom } = require("../ChatUsers");
const { getMessagesInRoom } = require("../ChatMessages");

const router = express.Router();

router.get("/:roomId/users", (req, res) => {
  console.log(req.params.roomId, "roomId");
  const users = getUsersInRoom(req.params.roomId);
  return res.json({ users });
});

router.get("/:roomId/messages", (req, res) => {
  const messages = getMessagesInRoom(req.params.roomId);
  return res.json({ messages });
});

module.exports = router;
