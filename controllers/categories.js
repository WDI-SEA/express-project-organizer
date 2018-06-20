var express = require('express');
var db = require('../models');
var router = express.Router();

 // GET /Categories - gets all Categories
router.get('/', function(req, res) {
  db.category.findAll().then(function(data) {
    res.render('categories/index', {categories: data});
  });
});

// GET / categories/:id - get a specific category
router.get('/:id', function(req, res) {
  db.category.findById(req.params.id).then(function(category) {
    category.getPosts().then(function(posts) {
      res.render('categories/show', {category: category, posts: posts});
    });
  });
});

// GET /Categories/new -returns the form for adding
router.get('/new', function(req, res) {
  res.render('categories/new');
});
router.post('/', function(req, res) {
  db.category.create({
    name: req.body.name
  }).then(function(category){
    console.log(category);
    res.redirect('/categories');
  })
});

module.exports = router;
