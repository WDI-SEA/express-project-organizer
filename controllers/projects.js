var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {

  // console.log('test')
  // console.log('req',req.body)
  var categories = [];
  if (req.body.category) {
    categories = req.body.category.split(',');
  }
  // console.log('categories',categories)

  db.project.create(req.body)
  .then(function(createdProject) {
    // console.log('createdProject', createdProject)
    if(categories.length > 0) {
      // console.log('inside',categories)
      async.forEach(categories, function(c, callback) {
        // console.log('single',c)
        db.category.findOrCreate({
          where: {name: c.trim()}
        }).spread(function(name, wasCreated) {
          if(name){
            createdProject.addCategory(name)
          }
            callback();
          });
      }, function() {
        res.redirect('/projects/' + createdProject.id);
      });
    }
    else {
      res.redirect('/projects/' + createdProject.id);
    }
  })
  .catch(function(error) {
    // console.log('error', error);
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
    console.log(project);
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});


module.exports = router;
