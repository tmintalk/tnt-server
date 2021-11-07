const Sequelize = require('sequelize');

module.exports = class Question extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Question',
      tableName: 'questions',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db) {
    db.Question.hasMany(db.Answer);
  }
}