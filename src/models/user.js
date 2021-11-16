const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true // Social의 경우 password X
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      thumbnailUrl: {
        type: Sequelize.STRING,
        defaultValue: ''
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db) {
    db.User.hasMany(db.Image);
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Answer);
    db.User.hasMany(db.Like);
  }
}