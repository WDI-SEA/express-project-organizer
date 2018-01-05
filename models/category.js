'use strict';
module.exports = (sequelize, DataTypes) => {
  var category = sequelize.define('category', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.category.belongsToMany(models.project, {through: models.categoryProject})
      }
    }
  });
  return category;
};