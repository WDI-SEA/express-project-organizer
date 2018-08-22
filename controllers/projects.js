var express = require('express');
var async = require('async');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.create(req.body).then(function(createdProject) {
    if(!req.body.categories) {
      res.redirect('/projects/' + createdProject.id);
    }
    else {
      var categories = req.body.categories.split(',');
      categories = categories.filter(function(category) { return /\S/.test(category); });
      categories.forEach(function(item, index, arr) {
        arr[index] = item.trim();
      });
      async.forEach(categories, function(c, callback) {
        db.category.findOrCreate({
          where: { name: c }
        }).spread(function(cat, wasCreated) {
          if(cat) {
            createdProject.addCategory(cat);
          }
          callback(null);
        })
      },
      function() {
        res.redirect('/projects/' + createdProject.id);
      });
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

module.exports = router;
