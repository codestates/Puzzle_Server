'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class social extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      social.belongsTo(models.user, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: true,
        },
      })
    }
  };
  social.init({
    name: DataTypes.STRING,
    corporation: DataTypes.STRING,
    socialId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'social',
  });
  return social;
};