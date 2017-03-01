var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res){
  db.category.findAll().then(function(categories){
    res.render('categories/categories', { categories: categories });
  });
});

router.get('/:id', function(req, res){
  console.log('hit id route');

  db.category.find({
    where: {id: req.params.id}
  }).then(function(category) {
    category.getProjects().then(function(projects) {
      res.render('categories/projects', { projects: projects });
    });
  });
});

module.exports = router;