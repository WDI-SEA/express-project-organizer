'use strict';
module.exports = function(sequelize, DataTypes) {
  var categories_project = sequelize.define('categories_project', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });
  return categories_project;
};
