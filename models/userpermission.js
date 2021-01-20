'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userPermission.belongsTo(models.user, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
      userPermission.belongsTo(models.project, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
      })
    }
  };
  userPermission.init({

  }, {
    sequelize,
    modelName: 'userPermission',
  });
  return userPermission;
};