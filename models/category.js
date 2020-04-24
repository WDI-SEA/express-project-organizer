'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    categoryName: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    models.category.belongsToMany(models.project, {
      through: models.CategoriesProjects,
      onDelete: 'CASCADE'
    })
  };
  return category;
};