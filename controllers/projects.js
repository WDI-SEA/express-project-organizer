var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require ('async');

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  }).then(function(newProject) {
    var categories = [];
    if (req.body.category){
      categories = req.body.category.split(',');
    }
    if (categories.length > 0){
      async.forEachSeries(categories, function(category, callback) {
        db.category.findOrCreate({
          where: {name: category.tirm()}
        }).spread(function(category, created) {
          if(category){
            createdCategory.addCategory(category)
          }
          newProject.addCategory(category);
          callback();
        })
      }).then(function(createProject) {
        res.redirect('/');
      }).catch(function(error) {
        res.status(400).render('main/404');
      });
    };
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id }
  })
  .then(function(project) {
    if (!project) throw Error();
    res.render('projects/show', { project: project,});
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
