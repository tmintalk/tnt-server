const { Post, User, Like } = require("../models");

module.exports = {
  getPosts: async (req, res, next) => {
    try {
      let posts = await Post.findAll({
        include: [
          { 
            model: User
          }
        ],
        order: [ [ 'id', 'DESC' ]],
      });

      posts = await Promise.all(posts.map(async(post) => {
        let like = await Like.findOne({
          where: {
            PostId: post.id,
            UserId: req.user.id
          }
        });

        post.dataValues.like = like;

        return post;
      }))

      res.json(posts);
    } catch (error) {
      next(error);
    }
  },
  createPost: async (req, res, next) => {
    const user = req.user;
    const { description, date, item, about, price, imageUrl } = req.body;

    try {
      const p = await Post.create({
        description,
        date,
        item,
        about,
        price,
        imageUrl,
        UserId: user.id
      });
      
      res.json(p);
    } catch (error) {
      next(error);
    }
  }
}