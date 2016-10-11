'use strict';
module.exports = function(sequelize, DataTypes) {
  var catagories_project = sequelize.define('catagories_project', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return catagories_project;
};