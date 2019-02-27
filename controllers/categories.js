var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /categories
router.get('/', function(req, res) {
  db.category.findAll()
    .then(function(categories) {
      res.render('categories/index', {categories})
    });
});

// GET /categories/:id
router.get('/:name', (req, res) => {
  db.category.find({
    where: {name: req.params.name}
  }).then(category => {
    category.getProjects().then(projects => {
      res.render('categories/show', {category: category, projects: projects});
    });
  });
});

module.exports = router;