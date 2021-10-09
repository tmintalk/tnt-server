const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const User = require('./user');
const Image = require('./image');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Image = Image;

User.init(sequelize);
Image.init(sequelize);

User.associate(db);
Image.associate(db);

module.exports = db;