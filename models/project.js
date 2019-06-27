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
    models.project.hasMany(models.categories, {}) // not sure if I need through: something in the yellow curlies...
  }

  return project
}
