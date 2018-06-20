'use strict';
module.exports = (sequelize, DataTypes) => {
  var categoriesProjects = sequelize.define('categoriesProjects', {
    category_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER
  }, {});
  categoriesProjects.associate = function(models) {
    // associations can be defined here
  };
  return categoriesProjects;
};

// categoriesprojects.js
