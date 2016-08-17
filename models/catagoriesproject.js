'use strict';
module.exports = function(sequelize, DataTypes) {
  var catagoriesProject = sequelize.define('catagoriesProject', {
    catagoriesId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return catagoriesProject;
};