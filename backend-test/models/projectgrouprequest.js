'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectGroupRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectGroupRequest.belongsTo(models.Group, { foreignKey: 'groupId', as: 'Group', onDelete: 'cascade' })
    }
  };
  ProjectGroupRequest.init({
    groupId: DataTypes.INTEGER,
    progress: DataTypes.STRING,
    feedback: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjectGroupRequest',
  });
  return ProjectGroupRequest;
};