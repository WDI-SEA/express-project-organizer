var async = require('async');
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
  })
  .then(function(project) {
    var cats = [];
    if(req.body.categories) {cats = req.body.categories.split(','); }

    cats.forEach(function(c){
      db.category.findOrCreate({
        where: {name: c.toLowerCase().trim() } // takes input lowercase without spaces
      }).spread(function(foundCategory, wasCreated){
        project.addCategory(foundCategory); 

      }).catch();
    });
   
    res.redirect('/');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id },
    include: [db.category] //makes sure category gets included here 
  })
  .then(function(project) {
    if (!project) throw Error();
    res.render('projects/show', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
