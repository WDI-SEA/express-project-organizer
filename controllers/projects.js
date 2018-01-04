var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');

// POST /projects - create a new project
router.post('/', function(req, res) {

  var categories = [];
  if(req.body.categories){
    req.body.categories.split(',');
  }

  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
      if(categories.length > 0){
      //add categories to database
        async.forEach(categories, function(c, callback){
          //add the category to the category table
          db.category.findOrCreate({
            where: {name: c.trim()}
          }).spread(function(category, wasCreated){
            //Add the relationship to the join table
            if(category){
              project.addCategory(category);
            }
          });
          callback(null);
        }, function(){
          res.redirect('/projects/' + project.id);
        })
      } else {
        res.redirect('/projects/' + project.id);
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
    where: { id: req.params.id }
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
