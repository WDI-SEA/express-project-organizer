var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /projects/new - display form for creating a new project
router.get('/new', function (req, res) {
  res.render('projects/new');
});

// POST /projects - create a new project with a category
router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    db.category.findOrCreate({
      where: {name: req.body.categoryId}
    }).spread(function(category, created) {
      project.addCategory(category).then(function(category) {
        console.log(category + ' added to ' + project);
        res.redirect('/');        
      });
    });
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /projects/:id - display a specific project and its category(ies)
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id },
    include: [db.category]
  }).then(function(project) {
    if (!project) throw Error();
    res.render('projects/show', { project: project });
  }).catch(function(error) {
    console.log(error);
    res.status(400).render('main/404');
  });
});

// GET /projects/:id/edit - display form for editing a project

// PUT /projects/:id - updates a project

module.exports = router;
