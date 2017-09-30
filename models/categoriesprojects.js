'use strict';
module.exports = (sequelize, DataTypes) => {
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