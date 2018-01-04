'use strict';
module.exports = (sequelize, DataTypes) => {
  var categoriesProjects = sequelize.define('categoriesProjects', {
    categoriesId: DataTypes.INTEGER,
    projectsId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return categoriesProjects;
};
