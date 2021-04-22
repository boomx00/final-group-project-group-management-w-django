'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TagGroup.belongsTo(models.Group, { foreignKey: 'groupId' })
      TagGroup.belongsTo(models.Tag, { foreignKey: 'tagId' })
    }
  };
  TagGroup.init({
    groupId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TagGroup',
  });
  return TagGroup;
};