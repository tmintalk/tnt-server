const { User, Post, Question, Answer } = require("../models")

module.exports = {
  getUsers: async (req, res, next) => {
    const users = await User.findAll();

    res.json(users);
  },
  getUser: async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: Post,
          include: [{ model: User }]
        },
        {
          model: Answer,
          include: [{ model: Question }]
        }
      ]
    });

    res.json(user);
  },
  findUser: async (req, res, next) => {
    const { nickname } = req.params;

    const user = await User.findOne({
      where: {
        nickname: nickname
      },
      include: [
        {
          model: Post,
          include: [{ model: User }]
        },
        {
          model: Answer,
          include: [{ model: Question }]
        }
      ]
    });

    res.json(user);
  }
}