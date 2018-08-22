var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(createdProject) {
    var cat = [];
      if(req.body.categories){
        cat = req.body.categories.split(',');
      }
      if(cat.length > 0){
        //loop through each tag, create if needed, add relation to join table
        async.forEach(cat, function(t, done){
          //this code runs for each individual tag we need to add
          db.category.findOrCreate({
            where: {name: t.trim()}
          }).spread(function(newCat, wasCreated){
            createdProject.addTag(newCat).then(function(){
              done();//tells async, this iteration is all finished
            })
          });
        }, function(){
          //this code runs when everything is done
          res.redirect('/projects/' + createdProject.id);
        });
      }
      else {
        res.redirect('/projects/' + createdProject.id);
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
