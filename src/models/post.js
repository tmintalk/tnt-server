const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      description: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      item: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      about: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Comment);
  }
}