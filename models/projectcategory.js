'use strict';
module.exports = (sequelize, DataTypes) => {
  const projectCategory = sequelize.define('projectCategory', {
    projectId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  projectCategory.associate = function(models) {
    // associations can be defined here
  };
  return projectCategory;
};