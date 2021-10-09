const express = require('express');

const { isLoggedIn } = require('../middlewares/auth');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', isLoggedIn, postController.getPosts);
router.post('/', isLoggedIn, postController.createPost);

module.exports = router;