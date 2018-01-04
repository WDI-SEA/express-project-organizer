var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');


// POST /projects - create a new project
router.post('/', function(req, res) {
  var categories = [];

  if(req.body.categories){
    categories = req.body.categories.split(',');
  }

  
  db.project.create(req.body).then(function(createdProject){
    if(categories.length>0){
      async.forEach(categories, function(c, callback){
        // Add category to the category table
        db.category.findOrCreate({
          where: {category: c.trim()}
        }).spread(function(category, wasCreated){
          if(category){ 
            createdProject.addCategory(category);
            }
          callback();
        })
      }, function(){
         res.redirect('/projects/' + createdProject.id);
       });
    }
    else {
      res.redirect('/projects/' + createdProject.id);
    }
  }).catch(function(err) {
    console.log('error', err);
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
