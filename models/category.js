'use strict';
module.exports = (sequelize, DataTypes) => {
  var category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.category.belongsToMany(models.project, {through: 'categoriesProjects'});
        // associations can be defined here
      }
    }
  });
  return category;
};
