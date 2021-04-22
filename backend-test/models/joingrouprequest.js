'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JoinGroupRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JoinGroupRequest.belongsTo(models.User, { foreignKey: 'userId', as: 'applicant', onDelete: 'cascade' })
      JoinGroupRequest.belongsTo(models.Group, { foreignKey: 'groupId', as: 'joinRequest', onDelete: 'cascade' })
    }
  };
  JoinGroupRequest.init({
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    approved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'JoinGroupRequest',
  });
  return JoinGroupRequest;
};