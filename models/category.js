'use strict';
module.exports = function(sequelize, DataTypes) {
    var category = sequelize.define('category', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                models.category.belongsToMany(models.project, { through: models.categoriesProjects });
            }
        }
    });
    return category;
};
