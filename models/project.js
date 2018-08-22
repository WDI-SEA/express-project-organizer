'use strict';
module.exports = (sequelize, DataTypes) => {
  var project = sequelize.define('project', {
    name: DataTypes.STRING,
    githubLink: DataTypes.STRING,
    deployedLink: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  project.associate = function(models) {
    models.project.belongsToMany(models.category, {through: 'categoriesProjects'})
  };
  return project;
};