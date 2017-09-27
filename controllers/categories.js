var express = require('express');
var db = require('../models');
var router = express.Router();



// GET /category/new - display form for creating a new project
router.get('/', function(req, res) {
  db.category.findAll().then(function(categories){
    res.render('categories/show', { categories: categories });
  });
});

// GET /category/:id - display a specific project
router.get('/:id', function(req, res) {
  db.category.find({
    where: { id: req.params.id }
  })
    .then(function(category){
      category.getProjects().then(function(projects){
      res.render('categories/showproj', { projects: projects });
    })
    .catch(function(error) {
      res.status(400).render('main/404');
    });
  });
});

router.get('/:id/toproj', function(req, res) {
  res.redirect('/projects/' + req.params.id);
});

module.exports = router;
