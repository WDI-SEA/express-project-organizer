'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    models.category.belongsToMany(models.project, {through: "categoriesProjects"})
  };
  return category;
};