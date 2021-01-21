'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.social, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })
      user.hasMany(models.userPermission, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })
      user.hasMany(models.userPuzzle, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })
      user.hasMany(models.comment, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })

    }
  };
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    profileImg: DataTypes.BLOB,
    usercode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};