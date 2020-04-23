'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoriesProjects = sequelize.define('categoriesProjects', {
    projectId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  categoriesProjects.associate = function(models) {
    // associations can be defined here
  };
  return categoriesProjects;
};