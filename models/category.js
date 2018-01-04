'use strict';
module.exports = (sequelize, DataTypes) => {
  var category = sequelize.define('category', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.category.belongsToMany(models.project, {through:models.categoryProject});
      }
    }
  });
  return category;
};