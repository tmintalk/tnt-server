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
    const { body } = req.body;

    try {
      const p = await Post.create({
        body,
        UserId: user.id
      });
      
      res.json(p);
    } catch (error) {
      next(error);
    }
  }
}