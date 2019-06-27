'use strict';
module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    name: DataTypes.STRING,
    githubLink: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true
      }
    },
    deployLink: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true
      }
    },
    description: DataTypes.TEXT
  }, {})

  project.associate = function(models) {
    // associations can be defined here
    models.project.belongsToMany(models.category, { through: 'categoriesProjects' }); //space there because thats how they write their code
  }

  return project
}
