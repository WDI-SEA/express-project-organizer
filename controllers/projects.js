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
    })
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

//show all the categories that exist
router.get('/category', function(req, res){
  db.category.findAll().then(function(categories){
    console.log("categories ---------- ",  categories)
    res.render("projects/category", {categories: categories});
  });
});

//show a specific category and all the projects with that category
router.get('/category/:id', function(req, res){
  db.category.findOne({where: {id:req.params.id}, include: [db.project]}).then(function(projects){
    res.render("projects/categoryDetail", {projects: projects});
  });
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

















