var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  var categories = [];
  if(req.body.categores){
    categories = req.body.categories.split(',')
  }

  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  }).then(function(createdProject){
    if(categories.length > 0){
      async.forEach(categories, function(c,callback){
        db.category.findOrCreate({
          where: { name: c.trim()}
        }).spread(function(category, wasCreated){
          if(category){
            createdProject.addCategory(category);
          }
          callback(null);
        });
      }, function(){
        res.redirect('/projects/'+createdProject.id);
      });
    }else {
      res.redirect('/projects/'+createdProject.id)
    }
  }).catch(function(err){
    res.status(400).render('main/404');
    console.log(err);
  });
});


// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  db.category.findAll().then(function(categories){
      res.render('projects/new', {categories: categories});

  })
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
