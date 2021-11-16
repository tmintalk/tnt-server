const express = require('express');

const { isLoggedIn } = require('../middlewares/auth');
const LikeController = require('../controllers/likeController');

const router = express.Router();

router.post('/:postId', isLoggedIn, LikeController.addLike);
router.delete('/:postId', isLoggedIn, LikeController.deleteLike);

module.exports = router;