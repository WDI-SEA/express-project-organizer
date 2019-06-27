'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {
    hook: {
      beforeCreate: function(cat, options, cb) {
        cat.name = cat.name.toLowerCase();
        cb(null, cat.name);
      }
    }
  });
  category.associate = function(models) {
    // associations can be defined here
    models.category.belongsToMany(models.project, {through: 'categoriesProjects'});
  };
  return category;
};