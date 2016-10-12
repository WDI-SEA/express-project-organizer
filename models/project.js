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
        models.project.belongsToMany(models.category, {through: "categoriesProjects"}); //through specifies that article and tag have a many to many relationship through this third tabl "article tag" (specify name of join table)
      }
    }
  });
  return project;
};
