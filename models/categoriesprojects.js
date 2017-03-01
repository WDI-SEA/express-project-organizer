'use strict';
module.exports = function(sequelize, DataTypes) {
  var categoriesProjects = sequelize.define('categoriesProjects', {
    category_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return categoriesProjects;
};