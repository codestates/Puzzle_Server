'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userPuzzle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userPuzzle.belongsTo(models.user, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
      userPuzzle.belongsTo(models.puzzle, {
        foreignKey: 'puzzleId',
        onDelete: 'CASCADE',
      })
    }
  };
  userPuzzle.init({

  }, {
    sequelize,
    modelName: 'userPuzzle',
  });
  return userPuzzle;
};