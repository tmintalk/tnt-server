const { User, Post, Question, Answer } = require("../models")

module.exports = {
  getUsers: async (req, res, next) => {
    let users = await User.findAll({
      include: [
        {
          model: Post
        }
      ]
    });

    users = users.map(user => {
      let sum = 0;
      user.Posts.map(p => {
        sum += p.price;
      });

      user.dataValues.sum = sum;

      return user;
    })

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