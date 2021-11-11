const { Post, User } = require("../models");

module.exports = {
  getPosts: async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: [
          { 
            model: User
          }
        ],
        order: [ [ 'id', 'DESC' ]],
      });

      res.json(posts);
    } catch (error) {
      next(error);
    }
  },
  createPost: async (req, res, next) => {
    const user = req.user;
    const { description, date, item, about, price } = req.body;

    try {
      const p = await Post.create({
        description,
        date,
        item,
        about,
        price,
        UserId: user.id
      });
      
      res.json(p);
    } catch (error) {
      next(error);
    }
  }
}