'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sprint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sprint.belongsTo(models.Group, { onDelete: 'cascade' })
    }
  };
  Sprint.init({
    groupId: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    progress: DataTypes.STRING,
    summary: DataTypes.STRING,
    imageURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sprint',
  });
  return Sprint;
};