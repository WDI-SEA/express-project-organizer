var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /categories - display all categories
router.get('/', function(req, res) {
  db.category.findAll()
  .then(function(categories) {
    res.render('categories/show', {categories: categories});
  })
  .catch(function(error) {
          res.status(400).render('main/404');
        });
});

// GET /category/:id - display a specific category
router.get('/:id', function(req, res) {
  db.category.findOne({
    where: {id:req.params.id},
    include: [db.project]
  }).then(function(category) {
    res.render('categories/:id', {category : category});
  });
});

// GET /categories/new - display form for creating a new category
router.get('/new', function(req, res) {
  res.render('categories/new');
});

module.exports = router;


