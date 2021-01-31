'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      label.belongsToMany(models.puzzle, {
        onDelete: 'CASCADE',
        through: "puzzleLabel",
      })

      label.belongsTo(models.project, {
        foreignKey: {
          allowNull: false,
        },
      })
    }
  };
  label.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    color: DataTypes.STRING,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'label',
  });
  return label;
};