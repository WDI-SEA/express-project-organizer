'use strict';
module.exports = (sequelize, DataTypes) => {
  var projectsCategories = sequelize.define('projectsCategories', {
    projectId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  projectsCategories.associate = function(models) {
    // associations can be defined here
  };
  return projectsCategories;
};