var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');
var bodyParser = require('body-parser');

// POST /projects - create a new project
router.post('/', function(req, res) {
  var categories = [];
  if(req.body.categories) {
    categories = req.body.categories.split(',');
  }

  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    if (categories.length > 0) {
      async.forEach(categories, function(category, callback) {
        db.category.findOrCreate({
          where: { name: category.trim()}
        }).spread(function(newCategory, wasCreated) {
          project.addCategory(newCategory).then(function() {
            callback();
          })
        })
      }, function() {
        res.redirect('/projects/' + project.id);
      });
    } else {
      res.redirect('/projects/' + project.id);
    }
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

// PUT /projects/:id - update a project
router.put('/:id', function(req, res) {
  db.project.update({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description,
    categories: req.body.categories
  }, {
    where: { id: req.params.id }
  }).then(function(data) {
    res.send('Success');
  });
});

// GET /projects/:id/edit - return a form to edit a specific project
router.get('/:id/edit', function(req, res) {
  db.project.find({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then(function(project) {
    if (!project) throw Error();
    res.render('projects/edit', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// DELETE /projects/:id - delete a project with a given id
router.delete('/:id', function(req, res) {
  console.log(req.params.id);
  db.project.findOne({
    where: { id: req.params.id },
    include: [db.category]
  }).then(function(project) {
    async.forEach(project.categories, function(category, callback) {
      project.removeCategory(category);
      callback();
    }, function() {
      db.project.destroy({
        where: { id: req.params.id }
      }).then(function(deletedTag) {
        res.send('All good');
      });
    });
  });
});

module.exports = router;
