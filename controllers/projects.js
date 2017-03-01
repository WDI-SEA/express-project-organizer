var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();


// POST /projects - create a new project
router.post('/', function(req, res) {
  console.log(req.body);
  var categories = [];
  if(req.body.category){
    categories =  req.body.category.split(",");
  }

  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    //add category to db
    if(categories.length > 0){
      async.forEachSeries(categories, function(category, callback){
        db.category.findOrCreate({
          where: {name: category.trim()},
        }).spread(function(newCategory, wasCreated){
          if(newCategory){
            project.addCategory(newCategory);
          }
          callback(null);
        });
      }, function(){
        res.redirect('/');
      });//end of async
    } else {
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

router.delete('/:id', function(req, res){
  db.project.destroy({
    where: {id: req.params.id}
  }).then(function(){
    res.send({message: 'successful deletion'});
  });
});

router.put('/:id', function(req, res){
  console.log("you are updating something!");
  res.send({message: 'successful update'});
});

router.get('/:id/edit', function(req, res){
  var project = db.project.find({
    where: {id: req.params.id},
    include: [db.category]
  }).then(function(project){
    res.render('projects/edit', {project: project});
  });
});

module.exports = router;
