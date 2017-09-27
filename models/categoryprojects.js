'use strict';
module.exports = (sequelize, DataTypes) => {
  var categoryProjects = sequelize.define('categoryProjects', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return categoryProjects;
};
