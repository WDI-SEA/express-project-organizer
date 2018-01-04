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

  db.project.create(req.body) //CREATE closed
  .then(function(createdProject){ //Opens promise
    if(categories.length > 0){
      async.forEach(categories, function(c, callback){
        //Add cat to category table
        db.category.findOrCreate({
          where: {name: c.trim()}
        }).spread(function(category, wasCreated){
          if(category){
            //Adds relationship to join table
            createdProject.addCategory(category);
          }
          //Calling this function
          callback(null);
        }) //closes Spread, next Async
      }, function(){
        //When calls resolved ->
        res.redirect('/projects/' + createdProject.id);
      });
    } else {
        res.redirect('/projects/' + createdProject.id);
      }
  }).catch(function(error){
    res.status(400).render('main/404');
  }); //Close catch
}); //Closes POST

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
