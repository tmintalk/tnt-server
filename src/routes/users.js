const express = require('express');

const { isLoggedIn } = require('../middlewares/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:userId', isLoggedIn, userController.getUser);
router.get('/', isLoggedIn, userController.getUsers);
router.get('/find/:nickname', isLoggedIn, userController.findUser);

module.exports = router;