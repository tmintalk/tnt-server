const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const User = require('./user');
const Image = require('./image');
const Comment = require('./comment');
const Post = require('./post');
const Question = require('./question');
const Answer = require('./answer');
const Like = require('./like');
const Friend = require('./friend');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Image = Image;
db.Comment = Comment;
db.Post = Post;
db.Question = Question;
db.Answer = Answer;
db.Like = Like;
db.Friend = Friend;

User.init(sequelize);
Image.init(sequelize);
Comment.init(sequelize);
Post.init(sequelize);
Question.init(sequelize);
Answer.init(sequelize);
Like.init(sequelize);
Friend.init(sequelize);

User.associate(db);
Image.associate(db);
Comment.associate(db);
Post.associate(db);
Question.associate(db);
Answer.associate(db);
Like.associate(db);
Friend.associate(db);

module.exports = db;