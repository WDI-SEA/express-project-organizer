'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    // associations can be defined here
    models.category.belongsToMany(models.project, { through: 'categoriesProjects' }); //space there because thats how they write their code
  };
  return category;
};