'use strict';
module.exports = function(sequelize, DataTypes) {
  var create = sequelize.define('create', {
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    favoritId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return create;
};