const express = require("express");
const { getUsersInRoom, getMyReadCnt } = require("../ChatUsers");
const { getMessagesInRoom, getAllMessages } = require("../ChatMessages");

const router = express.Router();

router.get("/allMessages", (req, res) => {
  const messages = getAllMessages();
  return res.json({ messages });
});

router.get("/:roomId/users", (req, res) => {
  console.log(req.params.roomId, "roomId");
  const users = getUsersInRoom(req.params.roomId);
  return res.json({ users });
});

router.get("/:roomId/messages", (req, res) => {
  const messages = getMessagesInRoom(req.params.roomId);
  return res.json({ messages });
});

router.get("/:name/readCnt", (req, res) => {
  const myReadCnt = getMyReadCnt(req.params.name);
  return res.json({ myReadCnt });
});

module.exports = router;
