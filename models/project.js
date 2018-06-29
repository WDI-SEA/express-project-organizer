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
    models.project.belongsToMany(models.category, {through: "categoriesProjects", onDelete: 'CASCADE'});
  };
  return project;
};