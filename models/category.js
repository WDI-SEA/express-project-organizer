'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    'category',
    {
      category: DataTypes.STRING,
    },
    {}
  );
  category.associate = function(models) {
    // associations can be defined here
    models.category.belongsToMany(models.project, {
      through: 'categoryProject',
    });
  };
  return category;
};
