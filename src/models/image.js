const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      url: {
        type: Sequelize.STRING(500),
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Image',
      tableName: 'images',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db) {
    db.Image.belongsTo(db.User);
  }
}