'use strict';
module.exports = (sequelize, DataTypes) => {
  var categoryProject = sequelize.define('categoryProject', {
    projectId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return categoryProject;
};