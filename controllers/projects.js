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
  .then(function(project) {
    db.category.findOrCreate({
      where: {name: req.body.category}
    }).spread(function(cat, wasCreated){
      project.addCategory(cat);
      res.redirect('/');
    });
    }).catch(function(error) {
      res.status(400).render('main/404');
  });
});
// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
    res.render("projects/new");
});

//Show all categories that exist
router.get('/categories', function(req, res){
  db.category.findAll().then(function(category){
    res.render("./projects/categories", {category: category});
  });
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id }
  })
  .then(function(project) {
    if (!project) throw Error();
    res.render('./projects/show', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

//Show specific category and all projects with that category
router.get('/categories/:id', function(req, res){
  var id = req.params.id; 
  db.category.findOne({ where: {id: id}, include: [db.project] }).then(function(projects){
    res.render("./projects/category", { projects: projects });
  });
});

module.exports = router;
