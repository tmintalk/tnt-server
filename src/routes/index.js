const express = require('express');

const sample = require('../middlewares/sample');
const RootController = require('../controllers/rootController');
const authRouter = require('./auth');
const userRouter = require('./users');
const postRouter = require('./posts');

const router = express.Router();

router.get('/', sample, RootController.getRoot);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);

module.exports = router;