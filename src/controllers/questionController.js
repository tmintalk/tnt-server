const { Question, Answer } = require("../models");

module.exports = {
  getQuestions: async (req, res, next) => {
    try {
      const questions = await Question.findAll({
        order: [[ 'id', 'DESC' ]],
      });

      res.json(questions);
    } catch (error) {
      next(error);
    }
  },
  createQuestion: async (req, res, next) => {
    try {
      const { text } = req.body;

      const q = await Question.create({
        text: text
      })

      res.json(q);
    } catch (error) {
      next(error);
    }
  },
  answerQuestion: async (req, res, next) => {
    try {
      const user = req.user;
      const { questionId } = req.params;
      const { answer } = req.body;

      const a = await Answer.create({
        UserId: user.id,
        QuestionId: questionId,
        answer
      })

      res.json(a);
    } catch (error) {
      next(error);
    }
  }
}