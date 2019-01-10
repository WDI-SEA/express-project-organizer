'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoryProject = sequelize.define('categoryProject', {
    projectId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  categoryProject.associate = function(models) {
    // associations can be defined here
  };
  return categoryProject;
};