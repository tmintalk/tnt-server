const Sequelize = require('sequelize');

module.exports = class Friend extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Friend',
      tableName: 'friends',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(db) {
    db.Friend.belongsTo(db.User, { foreignKey: 'followerId' });
    db.Friend.belongsTo(db.User, { foreignKey: 'followingId' });
  }
}