'use strict';
module.exports = function(sequelize, DataTypes) {
  var categoriesProjects = sequelize.define('categoriesProjects', {
    categorieId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return categoriesProjects;
};