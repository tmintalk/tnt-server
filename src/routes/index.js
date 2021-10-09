const express = require('express');

const sample = require('../middlewares/sample');
const RootController = require('../controllers/rootController');
const authRouter = require('./auth');

const router = express.Router();

router.get('/', sample, RootController.getRoot);
router.use('/auth', authRouter);

module.exports = router;