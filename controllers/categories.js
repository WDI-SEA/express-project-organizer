var express = require('express');
var db = require('../models');
var router = express.Router();

// Route to our Categories page, listing all Categories

router.get('/', function(req, res) {
  db.categorie.findAll()
  .then(function(categories) {
    res.render('categories/categories', { categories: categories });
  })
  .catch(function(error) {
    res.status(404).render('main/404');
  });
});

// Route to a specific Category page, listing all Projects tagged with that Category

router.get('/:name', function(req, res) {
  db.categorie.find({
    where: { id: req.params.name }
  }).then(function(categorie) {
    categorie.getProjects().then(function(projects) {
      res.render('categories/show', {
      projects: projects,
      categorie: categorie
      });
    });
  });
});

module.exports = router;
