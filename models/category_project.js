'use strict';
module.exports = function(sequelize, DataTypes) {
  var category_project = sequelize.define('category_project', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return category_project;
};