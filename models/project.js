'use strict';
module.exports = function(sequelize, DataTypes) {
    var project = sequelize.define('project', {
        name: DataTypes.STRING,
        githubLink: {
            type: DataTypes.TEXT,
            validate: {
                isUrl: true
            }
        },
        deployedLink: {
            type: DataTypes.TEXT,
            validate: {
                isUrl: true
            }
        },
        description: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                project.belongsTo(models.categoryProjects);
            }
        }
    });
    return project;
};
