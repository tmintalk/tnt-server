const { Like } = require("../models");

module.exports = {
  addLike: async (req, res, next) => {
    try {
      const user = req.user;
      const PostId = req.params.postId;

      const like = await Like.findOrCreate({
        where: {
          PostId,
          UserId: user.id
        },
        defaults: {
          PostId,
          UserId: user.id
        }
      })

      res.json(like);
    } catch (error) {
      next(error);
    }
  },
  deleteLike: async (req, res, next) => {
    try {
      console.log(req.params.postId, req.user.id)
      const l = await Like.destroy({
        where: {
          PostId: req.params.postId,
          UserId: req.user.id
        }
      })
      console.log(l);

      res.json(l)
    } catch (error) {
      next(error);
    }
  }

}