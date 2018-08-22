'use strict';
module.exports = (sequelize, DataTypes) => {
  var category = sequelize.define('category', {
    name: DataTypes.STING
  }, {});
  category.associate = function(models) {
    models.category.belongToMany(models:project, {through: 'BOB'});
  };
  return category;
};