const express = require('express');

const { isLoggedIn } = require('../middlewares/auth');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => res.send("auth"));

router.get('/me', isLoggedIn, authController.me);
router.post('/join', authController.join);
router.post('/login', authController.login);

module.exports = router;