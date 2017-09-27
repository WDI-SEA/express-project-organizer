'use strict';
module.exports = (sequelize, DataTypes) => {
  var join = sequelize.define('join', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return join;
};
