var express = require('express');
var db = require('../models');
var router = express.Router();



//GET /categories - gets all the categories
router.get('/', function(req, res) {
    db.category.findAll().then(function(data) {
      res.render('categories/index', {categories: data});
  });
});

router.get('/:id', function(req, res) {
  db.category.findById(req.params.id).then(function(category) {
    category.getProjects().then(function(projects) {
      res.render('categories/show', {category: category, projects: projects});
    });
  });
});

//GET /categories/new - returns the for for adding.
router.get('/new', function(req, res) {
  res.render('categories/new')
});

//POST /categories/index - posts the categories to the index page
router.post('/', function(req, res) {
  db.category.create({
    name: req.body.name
  }).then(function(category) {
      console.log(category);
      res.redirect('/categories');
  });
});












module.exports = router;
