'use strict';
module.exports = function(sequelize, DataTypes) {
  var categories_projects = sequelize.define('categories_projects', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return categories_projects;
};
