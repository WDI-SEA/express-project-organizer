var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  }).then(function(project) {
      db.category.findOrCreate({
      where: {name: req.body.categoryName}
  }).spread(function(category, created){

    project.addCategory(category).then(function(category){
      res.redirect('/');
    });
  });
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.findById(req.params.id).then(function(project){
    project.getCategories().then(function(categories){
      res.render('projects/show', {project:project, categories: categories})
    })
  })
  })


module.exports = router;
