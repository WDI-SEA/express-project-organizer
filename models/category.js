'use strict';
module.exports = function(sequelize, DataTypes) {
    var category = sequelize.define('category', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                category.belongsTo(models.categoryProject);
            }
        }
    });
    return category;
};
