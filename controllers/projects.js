var express = require('express');
var async = require('async');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project

router.post('/', function(req, res) {
  var categories = [];
  if(req.body.categories){
    categories = req.body.categories.split(',');
    console.log(categories);
  }
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  }).then(function(createdProject){
    if(categories.length > 0){
      async.forEach(categories,function(c,callback){
        db.category.findOrCreate({
          where: {content: c.trim()}
        }).spread(function(category,wasCreated){
          if(category){
            createdProject.addCategory(category);
          }
          callback(null);
        });
      }, function(){
        res.redirect('/');
      });
    }else{
      res.redirect('/');
    }
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
  db.project.findOne({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then(function(project) {
    if (!project) throw Error();
    res.render('projects/show', { result: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
