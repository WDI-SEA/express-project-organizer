'use strict';
module.exports = function(sequelize, DataTypes) {
  var categoriesprojects = sequelize.define('categoriesprojects', {
    projectId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return categoriesprojects;
};