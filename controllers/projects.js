var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');

// POST /projects - create a new project
router.post('/', function(req, res) {
  // change comma-separated list of categories into an array
  console.log("in the post path");
  console.log(req.body.category);
  var categories = [];
  if (req.body.category){
    categories = req.body.category.split(',');
  }
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    // handle data cleanup on categories
    if (categories.length > 0){
      // loop through array to process categories
      async.forEach(categories, function(category, callback){
        // this is the iterator
        db.category.findOrCreate({
          where: {name:category.trim()}
        }).spread(function(newCategory, wasCreated){
          // establish relationship between
          project.addCategory(newCategory).then(function(){
            callback();
          });
        });
      }, function(){
        res.redirect('/');
      });
    } else {
    // no categories
    res.redirect('/');
    }
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
    include: [db.category]
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
