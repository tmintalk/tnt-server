const { User } = require("../models")

module.exports = {
  getUsers: async (req, res, next) => {
    const users = await User.findAll();

    res.json(users);
  }
}