const express = require('express');

const { profile } = require('../middlewares/upload');

const router = express.Router();

router.post('/', profile.single("image"), (req, res) => {
  res.json({ uri: req.file.location });
})
router.post('/post', profile.single("image"), (req, res) => {
  res.json({ uri: req.file.location });
})

module.exports = router;