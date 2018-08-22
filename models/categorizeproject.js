'use strict';
module.exports = (sequelize, DataTypes) => {
  var categorizeProject = sequelize.define('categorizeProject', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  categorizeProject.associate = function(models) {
    // associations can be defined here
  };
  return categorizeProject;
};