var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
// add the new
router.post('/', function(req, res) {
  db.project.findOrCreate({
    where: {
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployedLink: req.body.deployedLink,
      description: req.body.description,
      // categoryName: req.body.categoryName
      }      // the 1st categoryName is referenceing the table column. The 2nd is referencing the form field
  })
  .spread(function(project, created) {
    db.category.findOrCreate({
      where: {
        name: req.body.categoryName
      }
    }).spread(function(category, created) {
      project.addCategory(category);
    }).then(function(project) {
    // db.project.createCategory({name: req.body.categoryName})
    res.redirect('/');
    })
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  })
});

// GET /projects/new - display form for creating a new project
// Add a new field called category name
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
