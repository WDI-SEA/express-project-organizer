'use strict';
module.exports = (sequelize, DataTypes) => {
  var categoriesProjects = sequelize.define('categoriesProjects', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  categoriesProjects.associate = function(models) {
    // associations can be defined here
  };
  return categoriesProjects;
};