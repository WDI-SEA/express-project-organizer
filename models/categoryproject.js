'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoryProject = sequelize.define('categoryProject', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  categoryProject.associate = function(models) {
    // associations can be defined here
  };
  return categoryProject;
};