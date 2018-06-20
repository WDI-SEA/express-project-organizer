var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /category - gets all categories
router.get('/', function(req, res) {
  db.category.findAll().then(function(data) {
  	res.render('categories/index', {categories: data});
  });
});

// GET /categories/id - finds projects related to the clicked category
router.get('/:id', function(req, res) {
	db.category.findById(req.params.id).then(function(category) {
    category.getProjects().then(function(projects) {
      res.render('categories/show', {category: category, projects: projects});
    });
	});
});

module.exports = router;