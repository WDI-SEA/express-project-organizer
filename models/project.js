'use strict';
module.exports = (sequelize, DataTypes) => {
  var project = sequelize.define('project', {
    name: DataTypes.STRING,
    githubLink: DataTypes.TEXT,
    deployedLink: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {});
  project.associate = function(models) {
    // associations can be defined here
  };
  return project;
};