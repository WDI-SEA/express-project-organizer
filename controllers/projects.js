var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.findOrCreate({
    where: {
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployedLink: req.body.deployedLink,
      description: req.body.description
    }
  })
  .spread(function(project, created) {
    db.categorie.findOrCreate({
      where: { name: req.body.categorie }
    }).spread(function(categorie, created) {
      db.categoriesProjects.findOrCreate({
        where: { categorieId: categorie.id,
        projectId: project.id }
      });
    }).then(function() {
      res.redirect('/');
    });
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

// POST /projects/:id - delete a project

router.put('/:id', function(req, res) {
  db.project.destroy({
    where: { id: req.param.id }
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
