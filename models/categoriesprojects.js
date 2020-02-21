'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoriesProjects = sequelize.define('categoriesProjects', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  categoriesProjects.associate = function(models) {
    // associations can be defined here
  };
  return categoriesProjects;
};