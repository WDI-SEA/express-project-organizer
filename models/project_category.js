'use strict';
module.exports = (sequelize, DataTypes) => {
  var project_category = sequelize.define('project_category', {
    projectId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return project_category;
};