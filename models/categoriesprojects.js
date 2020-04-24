'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoriesProjects = sequelize.define('categoriesProjects', {
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
      onDelete: 'CASCADE'
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'project',
        key: 'id',
      },
      onDelete: 'CASCADE'
    }
  }, {});
  categoriesProjects.associate = function(models) {
    // associations can be defined here
    categoriesProjects.belongsTo(models.project)
    categoriesProjects.belongsTo(models.category)

  };
  return categoriesProjects;
};

