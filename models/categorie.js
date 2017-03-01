'use strict';
module.exports = function(sequelize, DataTypes) {
  var categorie = sequelize.define('categorie', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.categorie.belongsToMany(models.project, { through: 'categoriesProjects' });
      }
    }
  });
  return categorie;
};
