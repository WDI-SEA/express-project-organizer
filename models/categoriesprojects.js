'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoriesProjects = sequelize.define('CategoriesProjects', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  CategoriesProjects.associate = function(models) {
    // associations can be defined here
  };
  return CategoriesProjects;
};