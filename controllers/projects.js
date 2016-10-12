var express = require('express');
var db = require('../models');
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
    if(categories.length > 0) {
      for(var i = 0; i < categories.length; i++){
        db.category.findOrCreate({
          where: { name: categories[i] }
        }).spread(function(category, wasCreated){
          if(category){
            project.addCategory(category);
          }
        });//end spread
      }//end loop
    }
    res.redirect('/');
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
