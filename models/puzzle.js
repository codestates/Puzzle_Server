'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class puzzle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      puzzle.hasMany(models.userPuzzle, {
        onDelete: 'CASCADE',//한쪽을 지우면 연결된 곳도 지워진다. 
        foreignKey: {
          allowNull: false
        }
      })
      puzzle.hasMany(models.comment, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })
      puzzle.belongsTo(models.project, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })
      puzzle.belongsToMany(models.label, {
        onDelete: 'CASCADE',
        through: "puzzleLabel",
        // foreignKey: 'puzzleId'
      })
    }
  };
  puzzle.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    isFinish: DataTypes.BOOLEAN,
    projectId: DataTypes.STRING,
    particle: DataTypes.INTEGER,
    progress: DataTypes.INTEGER,
    puzzleImg: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'puzzle',
  });
  return puzzle;
};