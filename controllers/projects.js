var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project
    .create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployedLink: req.body.deployedLink,
      description: req.body.description,
    })
    .then(function(project) {
      let enteredCategory = req.body.category.toLowerCase();
      db.category
        .findOrCreate({
          where: {
            category: enteredCategory,
          },
        })
        .spread(function(category, created) {
          db.categoryProject
            .create({
              projectId: project.id,
              categoryId: category.id,
            })
            .then(() => {
              res.redirect('/');
            });
        });
    })
    .catch(function(error) {
      res.status(400).render('main/404');
    });
});

// GET /projects/new - display form for creating a new project

router.get('/new', function(req, res) {
  db.category.findAll().then(function(categories) {
    res.render('projects/new', { categories });
  });
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project
    .find({
      where: { id: req.params.id },
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
