'use strict';
module.exports = (sequelize, DataTypes) => {
  const catergoriesProjects = sequelize.define('catergoriesProjects', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  catergoriesProjects.associate = function(models) {
    // associations can be defined here
  };
  return catergoriesProjects;
};