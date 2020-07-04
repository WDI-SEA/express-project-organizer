'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories_projects = sequelize.define('categories_projects', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  categories_projects.associate = function(models) {
    // associations can be defined here
  };
  return categories_projects;
};