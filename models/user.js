'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Social, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })
      User.hasMany(models.userPermission, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })
      User.hasMany(models.userPuzzle, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })
      User.hasMany(models.comment, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })

    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    profileImg: DataTypes.BLOB,
    usercode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};