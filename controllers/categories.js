var express = require('express');
var db = require('../models');
var router = express.Router();


//Route Categories, list all
router.get('/', function(req, res) {
  db.category.findAll()
  .then(function(categories) {
    res.render('categories/categories', { categories: categories });
  })
  .catch(function(error) {
    res.status(404).render('main/404');
  });
});

//Route to Category page
router.get('/:id', function(req, res) {
  db.category.find({
    where: { id: req.params.id }
  }).then(function(category) {
    category.getProjects().then(function(projects) {
      res.render('categories/show', {
      projects: projects,
      category: category
      });
    });
  });
});











module.exports = router;
