'use strict';
module.exports = (sequelize, DataTypes) => {
  var BOB = sequelize.define('BOB', {
    projectId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  BOB.associate = function(models) {
    // associations can be defined here
  };
  return BOB;
};