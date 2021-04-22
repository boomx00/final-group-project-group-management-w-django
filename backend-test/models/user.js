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
      User.hasOne(models.UserProfile, { foreignKey: 'userId', as: 'profile' })
      User.hasOne(models.Group, { foreignKey: 'ownerId', as: "ownedGroup" })
      User.hasOne(models.JoinGroupRequest, { foreignKey: 'userId' })
      User.belongsTo(models.Group, { foreignKey: 'groupId', as: 'Group' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    studentId: DataTypes.STRING,
    password: DataTypes.STRING,
    isStudent: DataTypes.BOOLEAN,
    isTeacher: DataTypes.BOOLEAN,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};