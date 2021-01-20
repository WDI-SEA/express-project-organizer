// const db = require('./models')

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoriesProjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.project.belongsTo(models.category, {through: categoriesProjects})
      // models.category.belongsToMany(models.project, {through: categoriesProjects})
    }
  };
  categoriesProjects.init({
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'categoriesProjects',
  });
  return categoriesProjects;
};