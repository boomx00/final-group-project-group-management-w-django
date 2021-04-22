'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(models.User, { foreignKey: 'ownerId', as: 'groupOwner' })
      Group.hasMany(models.User, { foreignKey: 'groupId', as: 'Members' })
      Group.hasMany(models.Sprint, { onDelete: 'cascade' })
      Group.hasMany(models.JoinGroupRequest, { foreignKey: 'groupId', as: 'joinRequest' })
      Group.hasOne(models.projectGroupRequest, { onDelete: 'cascade' })
      Group.belongsToMany(models.Tag, { through: 'TagGroups', onDelete: 'cascade' })
    }
  };
  Group.init({
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    topic: DataTypes.STRING,
    description: DataTypes.STRING,
    requirements: DataTypes.STRING,
    projectApproved: DataTypes.STRING,
    showOnHome: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};