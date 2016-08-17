'use strict';
module.exports = function(sequelize, DataTypes) {
  var catagory = sequelize.define('catagory', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return catagory;
};