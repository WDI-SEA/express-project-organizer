var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');

router.post('/', function(req, res){

  var categories = [];
  if (req.body.categories){ 
    categories = req.body.categories.split(',');
  }

  db.project.create(req.body).then(function(createdProject){
    if (categories.length > 0){
      async.forEach(categories, function(c, callback){
        db.category.findOrCreate({
          where: {name: c.trim()}
        }).spread(function(category, wasCreated){
          if(category){
            createdProject.addCategory(category); 
          }
          callback();
        })
      }, function(){
        res.redirect('projects/' + createdProject.id);
      });
    } else {
      res.redirect('projects/' + createdProject.id);
    }
  }).catch(function(err){
      res.status(400).render('main/404');
  });
});


// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  db.category.findAll().then(function(categories){
    res.render('projects/new', { categories: categories });
  })
});

// DELETE individual projects
router.delete('/:id', function(req, res){
  db.project.destroy({
    where: { id: req.params.id }
  }).then(function(deleted){
    res.send('We done did a delete');
  }).catch(function(err){
    res.status(400).render('main/404');
  });
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
