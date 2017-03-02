var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  var categories = [];
  if(req.body.categories){
    categories = req.body.categories.split(",");
  }

  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    if(categories.length > 0){
      async.forEachSeries(categories, function(c, callback){
        db.category.findOrCreate({
          where: {name: c.trim()}
        }).spread(function(newCat, wasCreated){
          if(newCat){
            project.addCategory(newCat);
          }
          callback(null);
        });
      }, function(){
        res.redirect('/projects/' + project.id);
      });
    }
    else {
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

router.delete("/:id", function(req, res){
  db.project.findOne({
    where: {id: req.params.id},
    include: [db.category]
  }).then(function(project){
    async.forEachSeries(project.categories, function(c, cb){
      project.removeCategory(c);
      cb(null);
    }, function(){
      db.project.destroy({
        where: {id: req.params.id}
      }).then(function(del){
        res.send("worked");
      });
    });
  });
});



module.exports = router;
