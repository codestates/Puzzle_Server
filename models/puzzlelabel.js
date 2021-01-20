'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class puzzleLabel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      puzzleLabel.belongsTo(models.puzzle, {
        foreignKey: 'puzzleId',
        onDelete: 'CASCADE',
      })
      puzzleLabel.belongsTo(models.label, {
        foreignKey: 'labelId',
        onDelete: 'CASCADE',
      })
    }
  };
  puzzleLabel.init({

  }, {
    sequelize,
    modelName: 'puzzleLabel',
  });
  return puzzleLabel;
};