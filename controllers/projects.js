var express = require('express');
var async = require('async');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  var categories = [];
  if(req.body.categories){
    categories = req.body.categories.split(',');
  }

  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(createdProject) {
    if(categories.length > 0){
       //do category stuff
      //async forEach (array, work func, resolve func)
      async.forEach(categories, function(c, callback){
        //Add the category to the categories table
        // findOrCreate prevents duplicates
        db.category.findOrCreate({
          where: {name: c.trim()}
        }).spread(function(categories, wasCreated){
          if(categories){
          //This adds relationship in the join table
          //sequelize shortcut - .addTag - .add then name of model (camelCase)
          createdProject.addCategory(categories);
          }
          callback(null);
        })
      }, function(){
        //when all calls are resolved
        res.redirect('/projects/' + createdProject.id);
      });

    }
    else {
      // redirect to project that was just created
      res.redirect('/projects/' + createdProject.id);
    }

  }).catch(function(error) {
    console.log('error', error);
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
