var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description,
  })
  .then(function(project) {
       res.redirect('/');
  })
  .catch(function(error) {
    console.log(error);
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
    console.log(project);
    db.category.findAll({})
    .then(function(categories){
      res.render('projects/show', { project: project, categories: categories});
     });
  })
  .catch(function(error) {
    console.log(error);
    res.status(400).render('main/404');
  });
});

//add category to project
router.put('/:pid/categories/:cid', function(req,res){
  console.log(req.params);
  db.project.find({
      where: {id: req.params.pid}
  }).then(function(project) {
      db.category.find({
        where: {id: req.params.cid}
      }).then(function(category){
        project.addCategory(category);
      });
  });
});

module.exports = router;

