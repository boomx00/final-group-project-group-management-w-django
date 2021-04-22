'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User, { foreignKey: 'userId', as: 'profile', onDelete: 'cascade' });
    }
  };
  UserProfile.init({
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    biograph: DataTypes.STRING,
    major: DataTypes.STRING,
    profileImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};