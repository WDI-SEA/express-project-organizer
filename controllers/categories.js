var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /categories - display all categories
router.get('/', function(req, res) {
  db.category.findAll()
    .then(function(data) {
      console.log(data)
      res.render('categories/index', {
        categories: data
      });
    })
    .catch(function(error) {
      res.status(400).render('main/404');
    });
});


// GET /categories/:id - display a specific category and its projects
router.get('/:id', function(req, res) {
  db.category.findById(req.params.id)
    .then(function(category) {
      category.getProjects().then(function(projects) {
        res.render('categories/show', {
          category: category,
          projects: projects
        });
        console.log('projects are' + projects);
      });
    });
});


module.exports = router;
