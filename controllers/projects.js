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
    }).spread(function(category, created) {
      project.addCategory(category).then(function(category) {
        //
      });
    });
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

router.get('/categories', function(req, res) {
  db.category.findAll().then(function(categories) {
    res.render('projects/categories', {categories: categories})
  });
})

router.get('/categories/:id', function(req, res) {
  db.category.find({
    where: {id: req.params.id},
    include: [db.project]
  })
  .then(function(category) {
    category.getProjects().then(function(projects) {
      res.render('projects/showall', {projects: projects});
    })
  }).catch(function(error) {
    res.status(400).render('main/404');
  })
})

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
