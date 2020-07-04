'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    // associations can be defined here
    models.category.belongsToMany(models.project, {
      onDelete: 'CASCADE',
      through: 'categories_projects'
    })
  };
  return category;
};