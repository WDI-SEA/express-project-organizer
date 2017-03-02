'use strict';
module.exports = function(sequelize, DataTypes) {
  var categoriesProjects = sequelize.define('categoriesProjects', {
    projectId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return categoriesProjects;
};