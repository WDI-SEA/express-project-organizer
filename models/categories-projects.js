'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories_projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  categories_projects.init({
    categoryID: DataTypes.INTEGER,
    projectID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'categories-projects',
  });
  return categories_projects;
};