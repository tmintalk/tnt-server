const express = require('express');

const { isLoggedIn } = require('../middlewares/auth');
const questionController = require('../controllers/questionController');

const router = express.Router();

router.get('/', questionController.getQuestions);

router.post('/answer/:questionId', isLoggedIn, questionController.answerQuestion);
router.post('/', questionController.createQuestion); // TODO: admin 조건

module.exports = router;